const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== SERVICIOS ==========

class BaseDatos {
    constructor() {
        console.log('Creando servicio BaseDatos... (tarda)');
    }
    consultar(tabla) {
        return { resultado: `Datos de la tabla "${tabla}"`, registros: 25 };
    }
}

class Correo {
    constructor() {
        console.log('Creando servicio Correo... (tarda)');
    }
    enviar(destinatario, mensaje) {
        return { enviado: true, para: destinatario };
    }
}

class Notificaciones {
    constructor() {
        console.log('Creando servicio Notificaciones... (tarda)');
    }
    notificar(usuario, texto) {
        return { notificado: true, usuario: usuario };
    }
}

// ========== SERVICE LOCATOR ==========

class ServiceLocator {
    constructor() {
        this.cache = {};  // Aquí guarda los servicios ya creados
    }

    obtener(nombre) {
        // 1. Busca en caché
        if (this.cache[nombre]) {
            console.log(`"${nombre}" encontrado en caché (rápido)`);
            return this.cache[nombre];
        }

        // 2. Si no está, lo crea
        console.log(`"${nombre}" NO está en caché, creándolo...`);
        let servicio;

        if (nombre === 'BaseDatos') servicio = new BaseDatos();
        else if (nombre === 'Correo') servicio = new Correo();
        else if (nombre === 'Notificaciones') servicio = new Notificaciones();
        else return null;

        // 3. Lo guarda en caché para la próxima vez
        this.cache[nombre] = servicio;
        return servicio;
    }

    verCache() {
        return Object.keys(this.cache);
    }
}

// Instancia del Service Locator
const locator = new ServiceLocator();

// ========== RUTAS ==========

// Usar un servicio
app.post('/api/usar-servicio', (req, res) => {
    const { servicio, accion } = req.body;

    const srv = locator.obtener(servicio);
    if (!srv) return res.json({ exito: false, mensaje: 'Servicio no encontrado' });

    let resultado;
    if (servicio === 'BaseDatos') resultado = srv.consultar(accion);
    else if (servicio === 'Correo') resultado = srv.enviar(accion, 'Hola!');
    else if (servicio === 'Notificaciones') resultado = srv.notificar(accion, 'Nueva alerta');

    const enCache = locator.verCache();

    res.json({ exito: true, resultado, cache: enCache });
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));