// ============================================================
// PATRÓN DE DISEÑO: BUSINESS DELEGATE
// Aplicación Web con Node.js y Express
// Sistema de Tienda en Línea
// ============================================================

const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Servir archivos estáticos (CSS) desde la carpeta "public"
app.use(express.static(path.join(__dirname, "public")));

// -----------------------------------------------
// 1. SERVICIOS DE NEGOCIO (Business Services)
//    Son los que realmente hacen el trabajo.
//    En un sistema real, estos podrían estar en
//    servidores remotos o microservicios.
// -----------------------------------------------

class ServicioPedidos {
    procesar() {
        return {
            servicio: "Servicio de Pedidos",
            icono: "🛒",
            mensaje: "Pedido #1023 registrado exitosamente.",
            detalles: [
                "Cliente: Juan Pérez",
                "Producto: Laptop HP Pavilion",
                "Cantidad: 1",
                "Total: $15,999.00 MXN",
            ],
        };
    }
}

class ServicioInventario {
    procesar() {
        return {
            servicio: "Servicio de Inventario",
            icono: "📦",
            mensaje: "Stock verificado correctamente.",
            detalles: [
                "Producto: Laptop HP Pavilion",
                "Stock disponible: 150 unidades",
                "Almacén: Bodega Central",
                "Última actualización: Hoy",
            ],
        };
    }
}

class ServicioEnvios {
    procesar() {
        return {
            servicio: "Servicio de Envíos",
            icono: "🚚",
            mensaje: "Envío programado exitosamente.",
            detalles: [
                "Destino: Campeche, Camp.",
                "Método: Express 24hrs",
                "Fecha estimada: Mañana 9:00 AM",
                "Tracking: ENV-2025-0212",
            ],
        };
    }
}

// -----------------------------------------------
// 2. LOOKUP SERVICE (Servicio de Búsqueda)
//    Encuentra y devuelve el servicio correcto.
//    Es como un directorio de servicios.
// -----------------------------------------------

class LookupService {
    obtenerServicio(tipo) {
        const servicios = {
            pedidos: ServicioPedidos,
            inventario: ServicioInventario,
            envios: ServicioEnvios,
        };

        const Servicio = servicios[tipo.toLowerCase()];
        if (!Servicio) {
            return null;
        }
        return new Servicio();
    }

    listarServicios() {
        return ["pedidos", "inventario", "envios"];
    }
}

// -----------------------------------------------
// 3. BUSINESS DELEGATE (El intermediario)
//    El cliente (la página web) solo habla con él.
//    Él se encarga de buscar y ejecutar el servicio.
// -----------------------------------------------

class BusinessDelegate {
    constructor() {
        this.lookupService = new LookupService();
        this.log = [];
    }

    ejecutar(tipoServicio) {
        // Paso 1: Buscar el servicio con el Lookup Service
        const servicio = this.lookupService.obtenerServicio(tipoServicio);

        if (!servicio) {
            this.log.push(`❌ Servicio "${tipoServicio}" no encontrado`);
            return {
                exito: false,
                error: `El servicio "${tipoServicio}" no existe.`,
            };
        }

        // Paso 2: Ejecutar el servicio encontrado
        this.log.push(`✔ Servicio "${tipoServicio}" ejecutado correctamente`);
        const resultado = servicio.procesar();
        resultado.exito = true;

        return resultado;
    }

    obtenerLog() {
        return this.log;
    }
}

// Instancia global del Business Delegate
const businessDelegate = new BusinessDelegate();

// -----------------------------------------------
// FUNCIÓN AUXILIAR: Leer archivos HTML
// -----------------------------------------------

function leerHTML(archivo) {
    const ruta = path.join(__dirname, "views", archivo);
    return fs.readFileSync(ruta, "utf-8");
}

// Genera el HTML del log de operaciones
function generarLogHTML(log) {
    if (log.length === 0) return "";

    const entradas = log
        .map((entry, i) => `<div class="log-entry">[${i + 1}] ${entry}</div>`)
        .join("");

    return `
        <div class="log-section">
            <h3>📝 Registro de Operaciones del Business Delegate</h3>
            ${entradas}
        </div>
    `;
}

// -----------------------------------------------
// 4. RUTAS (Capa de Presentación / Cliente)
//    Solo conoce al BusinessDelegate
// -----------------------------------------------

// Página principal
app.get("/", (req, res) => {
    const log = businessDelegate.obtenerLog();

    let html = leerHTML("index.html");
    html = html.replace("<%LOG_SECTION%>", generarLogHTML(log));

    res.send(html);
});

// Ruta que procesa servicios a través del Business Delegate
app.get("/servicio/:tipo", (req, res) => {
    const tipo = req.params.tipo;

    // El CLIENTE solo llama al Business Delegate
    const resultado = businessDelegate.ejecutar(tipo);
    const log = businessDelegate.obtenerLog();

    let html = leerHTML("resultado.html");

    // Reemplazar los placeholders del HTML con datos reales
    html = html.replace(/<%TIPO%>/g, tipo);
    html = html.replace("<%TIPO_UPPER%>", tipo.toUpperCase());
    html = html.replace("<%LOG_SECTION%>", generarLogHTML(log));

    if (resultado.exito) {
        html = html.replace("<%ICONO_HEADER%>", resultado.icono);
        html = html.replace(
            "<%PASO3_TEXTO%>",
            `encontró: <strong>${resultado.servicio}</strong>.`
        );
        html = html.replace(
            "<%PASO4_TEXTO%>",
            `<strong>${resultado.servicio}</strong> procesó la solicitud y devolvió el resultado.`
        );

        const detallesHTML = resultado.detalles
            .map((d) => `<p>• ${d}</p>`)
            .join("");

        html = html.replace(
            "<%RESULTADO_CONTENIDO%>",
            `<div class="resultado-exito">
                <strong>✔ ${resultado.mensaje}</strong>
            </div>
            <div class="resultado-detalle">
                ${detallesHTML}
            </div>`
        );
    } else {
        html = html.replace("<%ICONO_HEADER%>", "❌");
        html = html.replace(
            "<%PASO3_TEXTO%>",
            `no encontró el servicio "${tipo}".`
        );
        html = html.replace(
            "<%PASO4_TEXTO%>",
            `<strong>Business Delegate</strong> devolvió un error al cliente.`
        );
        html = html.replace(
            "<%RESULTADO_CONTENIDO%>",
            `<div class="resultado-error">
                <strong>✖ ${resultado.error}</strong>
            </div>`
        );
    }

    res.send(html);
});

// -----------------------------------------------
// INICIAR SERVIDOR
// -----------------------------------------------
app.listen(PORT, () => {
    console.log("╔══════════════════════════════════════════════╗");
    console.log("║   Business Delegate - Servidor iniciado      ║");
    console.log(`║   http://localhost:${PORT}                       ║`);
    console.log("╚══════════════════════════════════════════════╝");
});
