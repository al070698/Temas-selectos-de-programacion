// =============================================
// app.js - Punto de entrada del servidor
//
// Este archivo solo inicia el servidor y
// conecta el Dispatcher. NO decide a dónde
// ir, eso lo hace el Dispatcher.
// =============================================

const express = require('express');
const dispatcher = require('./dispatcher');

const app = express();
const PORT = 3000;

// Configurar EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views');

// Servir archivos estáticos (CSS, imágenes, etc.)
app.use(express.static('public'));

// ⭐ TODAS las peticiones pasan por el Dispatcher
app.use('/', dispatcher);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log('Rutas disponibles:');
    console.log('  http://localhost:3000/');
    console.log('  http://localhost:3000/productos');
    console.log('  http://localhost:3000/contacto');
});
