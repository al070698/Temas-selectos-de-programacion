// ============================================================
// API GATEWAY (Puerto 3000)
// Punto de entrada único. Redirige peticiones al microservicio correcto.
// ============================================================

const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mapa de microservicios
const SERVICIOS = {
    productos: 'http://localhost:3001',
    usuarios: 'http://localhost:3002',
    pedidos: 'http://localhost:3003'
};

// Estado de los microservicios
app.get('/api/estado', async (req, res) => {
    const estado = {};
    for (const [nombre, url] of Object.entries(SERVICIOS)) {
        try {
            const r = await fetch(`${url}/${nombre}`);
            estado[nombre] = r.ok ? 'activo' : 'error';
        } catch {
            estado[nombre] = 'inactivo';
        }
    }
    res.json({ exito: true, estado });
});

// ========== PROXY A PRODUCTOS ==========

app.get('/api/productos', async (req, res) => {
    try {
        const r = await fetch(`${SERVICIOS.productos}/productos`);
        const data = await r.json();
        res.json(data);
    } catch {
        res.json({ exito: false, mensaje: 'Microservicio Productos no disponible' });
    }
});

app.post('/api/productos', async (req, res) => {
    try {
        const r = await fetch(`${SERVICIOS.productos}/productos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await r.json();
        res.json(data);
    } catch {
        res.json({ exito: false, mensaje: 'Microservicio Productos no disponible' });
    }
});

// ========== PROXY A USUARIOS ==========

app.get('/api/usuarios', async (req, res) => {
    try {
        const r = await fetch(`${SERVICIOS.usuarios}/usuarios`);
        const data = await r.json();
        res.json(data);
    } catch {
        res.json({ exito: false, mensaje: 'Microservicio Usuarios no disponible' });
    }
});

app.post('/api/usuarios', async (req, res) => {
    try {
        const r = await fetch(`${SERVICIOS.usuarios}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await r.json();
        res.json(data);
    } catch {
        res.json({ exito: false, mensaje: 'Microservicio Usuarios no disponible' });
    }
});

// ========== PROXY A PEDIDOS ==========

app.get('/api/pedidos', async (req, res) => {
    try {
        const r = await fetch(`${SERVICIOS.pedidos}/pedidos`);
        const data = await r.json();
        res.json(data);
    } catch {
        res.json({ exito: false, mensaje: 'Microservicio Pedidos no disponible' });
    }
});

app.post('/api/pedidos', async (req, res) => {
    try {
        const r = await fetch(`${SERVICIOS.pedidos}/pedidos`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body)
        });
        const data = await r.json();
        res.json(data);
    } catch {
        res.json({ exito: false, mensaje: 'Microservicio Pedidos no disponible' });
    }
});

app.listen(3000, () => {
    console.log('');
    console.log('🌐 API GATEWAY en http://localhost:3000');
    console.log('');
    console.log('Microservicios:');
    console.log('  📦 Productos → http://localhost:3001');
    console.log('  👤 Usuarios  → http://localhost:3002');
    console.log('  🛒 Pedidos   → http://localhost:3003');
    console.log('');
});
