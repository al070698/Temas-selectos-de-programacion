// Cargar productos al iniciar
cargarProductos();

// Escuchar envío del formulario
document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('edit-id').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;

    let res;

    if (id) {
        // Actualizar producto existente
        res = await fetch(`/api/productos/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, cantidad })
        });
    } else {
        // Crear producto nuevo
        res = await fetch('/api/productos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, precio, cantidad })
        });
    }

    const data = await res.json();
    mostrarMensaje(data.mensaje, data.exito);

    // Limpiar formulario y recargar tabla
    cancelarEdicion();
    cargarProductos();
});

// Cancelar edición
document.getElementById('btn-cancelar').addEventListener('click', cancelarEdicion);

// Cargar todos los productos desde el DAO
async function cargarProductos() {
    const res = await fetch('/api/productos');
    const data = await res.json();

    const tbody = document.getElementById('tabla-productos');

    if (data.productos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center;color:#999;">No hay productos</td></tr>';
        return;
    }

    tbody.innerHTML = data.productos.map(p => `
        <tr>
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>$${p.precio.toLocaleString('es-MX')}</td>
            <td>${p.cantidad}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto(${p.id}, '${p.nombre.replace(/'/g, "\\'")}', ${p.precio}, ${p.cantidad})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${p.id})">Eliminar</button>
            </td>
        </tr>
    `).join('');
}

// Preparar formulario para editar
function editarProducto(id, nombre, precio, cantidad) {
    document.getElementById('edit-id').value = id;
    document.getElementById('nombre').value = nombre;
    document.getElementById('precio').value = precio;
    document.getElementById('cantidad').value = cantidad;
    document.getElementById('form-titulo').textContent = 'Editar Producto #' + id;
    document.getElementById('btn-submit').textContent = 'Actualizar';
    document.getElementById('btn-cancelar').style.display = 'inline-block';
}

// Eliminar un producto
async function eliminarProducto(id) {
    if (!confirm('¿Eliminar este producto?')) return;

    const res = await fetch(`/api/productos/${id}`, { method: 'DELETE' });
    const data = await res.json();
    mostrarMensaje(data.mensaje, data.exito);
    cargarProductos();
}

// Cancelar edición y limpiar formulario
function cancelarEdicion() {
    document.getElementById('edit-id').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('precio').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('form-titulo').textContent = 'Agregar Producto';
    document.getElementById('btn-submit').textContent = 'Agregar';
    document.getElementById('btn-cancelar').style.display = 'none';
}

// Mostrar mensaje de resultado
function mostrarMensaje(texto, exito) {
    const div = document.getElementById('mensaje');
    div.className = exito ? 'exito' : 'error';
    div.textContent = texto;
    setTimeout(() => { div.className = ''; div.textContent = ''; }, 3000);
}