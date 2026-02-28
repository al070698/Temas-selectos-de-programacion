// ============================================================
// MICROSERVICIO: USUARIOS (Puerto 3002)
// Gestiona los usuarios registrados
// ============================================================

const express = require('express');
const app = express();
app.use(express.json());

// Base de datos simulada
const usuarios = [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@correo.com' },
    { id: 2, nombre: 'María López', email: 'maria@correo.com' },
    { id: 3, nombre: 'Carlos García', email: 'carlos@correo.com' },
];
let siguienteId = 4;

// Obtener todos
app.get('/usuarios', (req, res) => {
    res.json({ exito: true, usuarios });
});

// Obtener por ID
app.get('/usuarios/:id', (req, res) => {
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    if (!usuario) return res.json({ exito: false, mensaje: 'Usuario no encontrado' });
    res.json({ exito: true, usuario });
});

// Crear
app.post('/usuarios', (req, res) => {
    const { nombre, email } = req.body;
    const nuevo = { id: siguienteId++, nombre, email };
    usuarios.push(nuevo);
    res.json({ exito: true, mensaje: 'Usuario creado', usuario: nuevo });
});

app.listen(3002, () => {
    console.log('👤 Microservicio USUARIOS en http://localhost:3002');
});
