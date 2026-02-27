const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ========== SUBSISTEMAS ==========

class Inventario {
    verificarStock(producto) {
        return { disponible: true, cantidad: 10 };
    }
}

class Pagos {
    cobrar(monto) {
        return { exitoso: true, id: 'TXN-' + Date.now() };
    }
}

class Correo {
    enviar(email, producto) {
        return { enviado: true };
    }
}

// ========== FACADE ==========

class TiendaFacade {
    constructor() {
        this.inventario = new Inventario();
        this.pagos = new Pagos();
        this.correo = new Correo();
    }

    // Un solo método que coordina los 3 subsistemas
    hacerPedido(producto, monto, email) {
        const stock = this.inventario.verificarStock(producto);
        if (!stock.disponible) return { exito: false, mensaje: 'Sin stock' };

        const pago = this.pagos.cobrar(monto);
        if (!pago.exitoso) return { exito: false, mensaje: 'Pago rechazado' };

        this.correo.enviar(email, producto);

        return { exito: true, mensaje: 'Pedido completado', transaccion: pago.id };
    }
}

// ========== RUTA ==========

const tienda = new TiendaFacade();

app.post('/api/pedido', (req, res) => {
    const { producto, monto, email } = req.body;
    const resultado = tienda.hacerPedido(producto, monto, email);
    res.json(resultado);
});

app.listen(3000, () => console.log('Servidor en http://localhost:3000'));