// ============================================================
// MICROSERVICIO: PRODUCTOS (Puerto 3001)
// Gestiona el catálogo de productos
// ============================================================

const express = require('express');
const app = express();
app.use(express.json());

// Base de datos simulada
const productos = [
    { id: 1, nombre: 'Laptop HP Pavilion', precio: 15999, stock: 10 },
    { id: 2, nombre: 'Mouse Logitech G203', precio: 450, stock: 50 },
    { id: 3, nombre: 'Teclado Mecánico Redragon', precio: 890, stock: 30 },
];
let siguienteId = 4;

// Obtener todos
app.get('/productos', (req, res) => {
    res.json({ exito: true, productos });
});

// Obtener por ID
app.get('/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === parseInt(req.params.id));
    if (!producto) return res.json({ exito: false, mensaje: 'Producto no encontrado' });
    res.json({ exito: true, producto });
});

// Crear
app.post('/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;
    const nuevo = { id: siguienteId++, nombre, precio: parseFloat(precio), stock: parseInt(stock) };
    productos.push(nuevo);
    res.json({ exito: true, mensaje: 'Producto creado', producto: nuevo });
});

app.listen(3001, () => {
    console.log('📦 Microservicio PRODUCTOS en http://localhost:3001');
});
