// Inicializar
verificarEstado();
cargarProductos();
cargarUsuarios();
cargarPedidos();

// ========== ESTADO ==========

async function verificarEstado() {
    const div = document.getElementById('estado');
    div.innerHTML = '<span style="color:#999">Verificando...</span>';
    try {
        const res = await fetch('/api/estado');
        const data = await res.json();
        div.innerHTML = Object.entries(data.estado).map(([nombre, estado]) => `
            <div class="estado-item ${estado}">
                <span class="estado-dot"></span>
                <strong>${nombre}</strong>
                <small>:${nombre === 'productos' ? '3001' : nombre === 'usuarios' ? '3002' : '3003'}</small>
                <span class="estado-texto">${estado}</span>
            </div>
        `).join('');
    } catch {
        div.innerHTML = '<span style="color:#ef4444">Error al verificar estado</span>';
    }
}

// ========== PRODUCTOS ==========

async function cargarProductos() {
    try {
        const res = await fetch('/api/productos');
        const data = await res.json();
        const tbody = document.getElementById('tabla-productos');
        if (!data.exito || data.productos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="vacio">No hay productos</td></tr>';
            return;
        }
        tbody.innerHTML = data.productos.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.nombre}</td>
                <td>$${p.precio.toLocaleString('es-MX')}</td>
                <td>${p.stock}</td>
            </tr>
        `).join('');
        // Actualizar select de pedidos
        const select = document.getElementById('ped-producto');
        select.innerHTML = data.productos.map(p => `<option value="${p.id}">${p.nombre} - $${p.precio}</option>`).join('');
    } catch {
        document.getElementById('tabla-productos').innerHTML = '<tr><td colspan="4" class="vacio">Microservicio no disponible</td></tr>';
    }
}

document.getElementById('form-producto').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: document.getElementById('prod-nombre').value,
            precio: document.getElementById('prod-precio').value,
            stock: document.getElementById('prod-stock').value
        })
    });
    const data = await res.json();
    mostrarMensaje(data.mensaje, data.exito);
    e.target.reset();
    cargarProductos();
});

// ========== USUARIOS ==========

async function cargarUsuarios() {
    try {
        const res = await fetch('/api/usuarios');
        const data = await res.json();
        const tbody = document.getElementById('tabla-usuarios');
        if (!data.exito || data.usuarios.length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="vacio">No hay usuarios</td></tr>';
            return;
        }
        tbody.innerHTML = data.usuarios.map(u => `
            <tr>
                <td>${u.id}</td>
                <td>${u.nombre}</td>
                <td>${u.email}</td>
            </tr>
        `).join('');
        // Actualizar select de pedidos
        const select = document.getElementById('ped-usuario');
        select.innerHTML = data.usuarios.map(u => `<option value="${u.id}">${u.nombre}</option>`).join('');
    } catch {
        document.getElementById('tabla-usuarios').innerHTML = '<tr><td colspan="3" class="vacio">Microservicio no disponible</td></tr>';
    }
}

document.getElementById('form-usuario').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nombre: document.getElementById('usr-nombre').value,
            email: document.getElementById('usr-email').value
        })
    });
    const data = await res.json();
    mostrarMensaje(data.mensaje, data.exito);
    e.target.reset();
    cargarUsuarios();
});

// ========== PEDIDOS ==========

async function cargarPedidos() {
    try {
        const res = await fetch('/api/pedidos');
        const data = await res.json();
        const tbody = document.getElementById('tabla-pedidos');
        if (!data.exito || data.pedidos.length === 0) {
            tbody.innerHTML = '<tr><td colspan="6" class="vacio">No hay pedidos</td></tr>';
            return;
        }
        tbody.innerHTML = data.pedidos.map(p => `
            <tr>
                <td>${p.id}</td>
                <td>${p.usuario}</td>
                <td>${p.producto}</td>
                <td>${p.cantidad}</td>
                <td>$${p.total.toLocaleString('es-MX')}</td>
                <td>${p.fecha}</td>
            </tr>
        `).join('');
    } catch {
        document.getElementById('tabla-pedidos').innerHTML = '<tr><td colspan="6" class="vacio">Microservicio no disponible</td></tr>';
    }
}

document.getElementById('form-pedido').addEventListener('submit', async (e) => {
    e.preventDefault();
    const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuarioId: document.getElementById('ped-usuario').value,
            productoId: document.getElementById('ped-producto').value,
            cantidad: document.getElementById('ped-cantidad').value
        })
    });
    const data = await res.json();
    mostrarMensaje(data.mensaje, data.exito);
    cargarPedidos();
});

// ========== TABS ==========

function cambiarTab(tab) {
    document.querySelectorAll('.panel').forEach(p => p.style.display = 'none');
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.getElementById(`panel-${tab}`).style.display = 'block';
    event.target.classList.add('active');

    if (tab === 'pedidos') { cargarProductos(); cargarUsuarios(); cargarPedidos(); }
}

// ========== MENSAJE ==========

function mostrarMensaje(texto, exito) {
    const div = document.getElementById('mensaje');
    div.className = exito ? 'exito' : 'error';
    div.textContent = texto;
    div.style.position = 'fixed';
    div.style.bottom = '20px';
    div.style.right = '20px';
    setTimeout(() => { div.className = ''; div.textContent = ''; }, 3000);
}
