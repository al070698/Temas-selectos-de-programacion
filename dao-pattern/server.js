// ============================================================
// PATRÓN DE DISEÑO: DATA ACCESS OBJECT (DAO)
// Aplicación Web con Node.js y Express
// Sistema de Gestión de Productos
// ============================================================

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== BASE DE DATOS SIMULADA ==========
// En un sistema real, esto sería MySQL, MongoDB, etc.

const baseDeDatos = [
    { id: 1, nombre: 'Laptop HP Pavilion', precio: 15999, cantidad: 10 },
    { id: 2, nombre: 'Mouse Logitech G203', precio: 450, cantidad: 50 },
    { id: 3, nombre: 'Teclado Mecánico Redragon', precio: 890, cantidad: 30 },
];

let siguienteId = 4;

// ========== DAO (Data Access Object) ==========
// Encapsula TODO el acceso a datos.
// El resto de la app NUNCA toca la base de datos directamente.

class ProductoDAO {
    obtenerTodos() {
        return [...baseDeDatos];
    }

    obtenerPorId(id) {
        return baseDeDatos.find(p => p.id === id) || null;
    }

    crear(producto) {
        const nuevo = {
            id: siguienteId++,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad
        };
        baseDeDatos.push(nuevo);
        return nuevo;
    }

    actualizar(id, datos) {
        const index = baseDeDatos.findIndex(p => p.id === id);
        if (index === -1) return null;

        baseDeDatos[index] = {
            ...baseDeDatos[index],
            nombre: datos.nombre || baseDeDatos[index].nombre,
            precio: datos.precio || baseDeDatos[index].precio,
            cantidad: datos.cantidad || baseDeDatos[index].cantidad
        };
        return baseDeDatos[index];
    }

    eliminar(id) {
        const index = baseDeDatos.findIndex(p => p.id === id);
        if (index === -1) return false;

        baseDeDatos.splice(index, 1);
        return true;
    }
}

// Instancia del DAO
const productoDAO = new ProductoDAO();

// ========== RUTAS (Solo hablan con el DAO) ==========

// Obtener todos los productos
app.get('/api/productos', (req, res) => {
    const productos = productoDAO.obtenerTodos();
    res.json({ exito: true, productos });
});

// Obtener un producto por ID
app.get('/api/productos/:id', (req, res) => {
    const producto = productoDAO.obtenerPorId(parseInt(req.params.id));
    if (!producto) return res.json({ exito: false, mensaje: 'Producto no encontrado' });
    res.json({ exito: true, producto });
});

// Crear un producto
app.post('/api/productos', (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    if (!nombre || !precio || !cantidad) {
        return res.json({ exito: false, mensaje: 'Faltan datos (nombre, precio, cantidad)' });
    }
    const nuevo = productoDAO.crear({ nombre, precio: parseFloat(precio), cantidad: parseInt(cantidad) });
    res.json({ exito: true, mensaje: 'Producto creado', producto: nuevo });
});

// Actualizar un producto
app.put('/api/productos/:id', (req, res) => {
    const { nombre, precio, cantidad } = req.body;
    const actualizado = productoDAO.actualizar(parseInt(req.params.id), {
        nombre,
        precio: precio ? parseFloat(precio) : undefined,
        cantidad: cantidad ? parseInt(cantidad) : undefined
    });
    if (!actualizado) return res.json({ exito: false, mensaje: 'Producto no encontrado' });
    res.json({ exito: true, mensaje: 'Producto actualizado', producto: actualizado });
});

// Eliminar un producto
app.delete('/api/productos/:id', (req, res) => {
    const eliminado = productoDAO.eliminar(parseInt(req.params.id));
    if (!eliminado) return res.json({ exito: false, mensaje: 'Producto no encontrado' });
    res.json({ exito: true, mensaje: 'Producto eliminado' });
});

// ========== INICIAR SERVIDOR ==========

app.listen(3000, () => {
    console.log('╔══════════════════════════════════════════╗');
    console.log('║   DAO Pattern - Servidor iniciado        ║');
    console.log('║   http://localhost:3000                   ║');
    console.log('╚══════════════════════════════════════════╝');
});