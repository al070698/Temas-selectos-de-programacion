const express = require('express');
const app = express();
const puerto = 3000;

// ============================================
// FRONT CONTROLLER (Middleware - intercepta todo)
// ============================================
app.use((req, res, next) => {
    console.log('--- FRONT CONTROLLER ---');
    console.log('Fecha:', new Date().toLocaleString());
    console.log('Método:', req.method);
    console.log('Ruta solicitada:', req.path);
    console.log('Opción:', req.query.opcion || 'ninguna');
    console.log('------------------------');
    next();
});

// ============================================
// CONTROLADOR ÚNICO - Todo pasa por aquí
// ============================================
app.get('/', (req, res) => {
    const opcion = req.query.opcion;
    
    // Navegación común para todas las páginas
    const nav = `
        <nav>
            <a href="/?opcion=inicio">Inicio</a> |
            <a href="/?opcion=acerca">Acerca de</a> |
            <a href="/?opcion=contacto">Contacto</a> |
            <a href="/?opcion=servicios">Servicios</a>
        </nav>
    `;
    
    let contenido;
    
    switch (opcion) {
        case 'inicio':
            contenido = `<h1>Página de Inicio</h1>
                         <p>Bienvenido al ejemplo del patrón Front Controller</p>`;
            break;
            
        case 'acerca':
            contenido = `<h1>Acerca de Nosotros</h1>
                         <p>Somos una empresa de ejemplo para demostrar el patrón Front Controller</p>`;
            break;
            
        case 'contacto':
            contenido = `<h1>Contacto</h1>
                         <p>Email: contacto@ejemplo.com</p>
                         <p>Teléfono: 555-1234</p>`;
            break;
            
        case 'servicios':
            contenido = `<h1>Nuestros Servicios</h1>
                         <ul>
                             <li>Desarrollo Web</li>
                             <li>Aplicaciones Móviles</li>
                             <li>Consultoría IT</li>
                         </ul>`;
            break;
            
        default:
            contenido = `<h1>Página de Inicio</h1>
                         <p>Bienvenido al ejemplo del patrón Front Controller</p>`;
    }
    
    res.send(contenido + nav);
});

// ============================================
// 404 para cualquier otra ruta
// ============================================
app.use((req, res) => {
    res.status(404).send(`
        <h1>Error 404</h1>
        <p>La página que buscas no existe</p>
        <a href="/">Volver al inicio</a>
    `);
});

app.listen(puerto, () => {
    console.log('Servidor en: http://localhost:' + puerto);
});