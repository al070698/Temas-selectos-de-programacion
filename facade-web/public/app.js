const precios = { 'Audífonos': 450, 'Teclado': 890, 'Mouse': 350 };

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const producto = document.getElementById('producto').value;
    const email = document.getElementById('email').value;
    const monto = precios[producto];

    // Una sola llamada a la Facade del servidor
    const res = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ producto, monto, email })
    });

    const data = await res.json();

    // Mostrar resultado
    const div = document.getElementById('resultado');
    div.className = data.exito ? 'exito' : 'error';
    div.textContent = data.mensaje;
});