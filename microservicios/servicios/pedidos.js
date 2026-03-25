// ============================================================
// MICROSERVICIO: PEDIDOS (Puerto 3003)
// Gestiona pedidos. Consulta a Productos y Usuarios.
// ============================================================

const express = require('express');
const app = express();
app.use(express.json());

// Base de datos simulada
const pedidos = [];
let siguienteId = 1;

// Obtener todos los pedidos
app.get('/pedidos', (req, res) => {
    res.json({ exito: true, pedidos });
});

// Crear pedido (recibe usuarioId y productoId, consulta a los otros microservicios)
app.post('/pedidos', async (req, res) => {
    const { usuarioId, productoId, cantidad } = req.body;

    try {
        // Consultar al microservicio de Usuarios
        const resUsuario = await fetch(`http://localhost:3002/usuarios/${usuarioId}`);
        const dataUsuario = await resUsuario.json();
        if (!dataUsuario.exito) return res.json({ exito: false, mensaje: 'Usuario no encontrado' });

        // Consultar al microservicio de Productos
        const resProducto = await fetch(`http://localhost:3001/productos/${productoId}`);
        const dataProducto = await resProducto.json();
        if (!dataProducto.exito) return res.json({ exito: false, mensaje: 'Producto no encontrado' });

        const total = dataProducto.producto.precio * parseInt(cantidad);

        const pedido = {
            id: siguienteId++,
            usuario: dataUsuario.usuario.nombre,
            producto: dataProducto.producto.nombre,
            cantidad: parseInt(cantidad),
            total,
            fecha: new Date().toLocaleString('es-MX')
        };

        pedidos.push(pedido);
        res.json({ exito: true, mensaje: 'Pedido creado', pedido });
    } catch (error) {
        res.json({ exito: false, mensaje: 'Error al comunicarse con otros microservicios' });
    }
});

app.listen(3003, () => {
    console.log('🛒 Microservicio PEDIDOS en http://localhost:3003');
});
