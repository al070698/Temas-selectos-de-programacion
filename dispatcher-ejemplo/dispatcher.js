// =============================================
// dispatcher.js - Patrón Dispatcher View
//
// Este módulo decide qué VISTA mostrar según
// la ruta que el usuario pide en el navegador.
//
// Ahora cada ruta tiene su propio archivo CSS.
// =============================================

const express = require('express');
const router = express.Router();

// -----------------------------------------
// Mapa de rutas → vistas
//
// Cada ruta tiene:
//   - vista: nombre del archivo .ejs
//   - titulo: título para la página
//   - css: archivo CSS específico de esa vista
//   - datos: información extra para la vista
// -----------------------------------------
const rutas = {
    '/': {
        vista: 'inicio',
        titulo: 'Página de Inicio',
        css: '/css/inicio.css',
        datos: { mensaje: 'Bienvenido a nuestra tienda' }
    },
    '/productos': {
        vista: 'productos',
        titulo: 'Nuestros Productos',
        css: '/css/productos.css',
        datos: {
            productos: [
                { id: 1, nombre: 'Laptop HP',       precio: 15000 },
                { id: 2, nombre: 'Mouse Logitech',   precio: 450 },
                { id: 3, nombre: 'Teclado Mecánico',  precio: 1200 },
                { id: 4, nombre: 'Monitor Samsung',   precio: 5500 },
            ]
        }
    },
    '/contacto': {
        vista: 'contacto',
        titulo: 'Contáctanos',
        css: '/css/contacto.css',
        datos: {
            email: 'tienda@ejemplo.com',
            telefono: '999-123-4567'
        }
    }
};

// -----------------------------------------
// Función Dispatcher (el corazón del patrón)
// -----------------------------------------
function despachar(req, res) {
    const ruta = req.path;

    console.log(`[Dispatcher] Petición recibida: ${ruta}`);

    const destino = rutas[ruta];

    if (destino) {
        console.log(`[Dispatcher] Despachando a → ${destino.vista}.ejs (CSS: ${destino.css})`);
        res.render(destino.vista, {
            titulo: destino.titulo,
            css: destino.css,
            datos: destino.datos
        });
    } else {
        console.log(`[Dispatcher] Ruta NO encontrada: ${ruta}`);
        res.status(404).render('404', {
            titulo: 'Página no encontrada',
            css: '/css/404.css'
        });
    }
}

router.get('*', despachar);

module.exports = router;
