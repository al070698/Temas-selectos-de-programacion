let llamadas = {};  // Cuenta cuántas veces se pidió cada servicio

document.getElementById('formulario').addEventListener('submit', async (e) => {
    e.preventDefault();

    const servicio = document.getElementById('servicio').value;
    const accion = document.getElementById('accion').value;

    // Contar llamadas para saber si es nuevo o viene del caché
    if (!llamadas[servicio]) llamadas[servicio] = 0;
    llamadas[servicio]++;

    const res = await fetch('/api/usar-servicio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ servicio, accion })
    });

    const data = await res.json();

    // Mostrar resultado
    const div = document.getElementById('resultado');
    const esPrimeraVez = llamadas[servicio] === 1;

    if (esPrimeraVez) {
        div.className = 'nuevo';
        div.innerHTML = `🆕 <strong>${servicio}</strong> creado por primera vez<br>` +
            `Resultado: ${JSON.stringify(data.resultado)}`;
    } else {
        div.className = 'cache';
        div.innerHTML = `⚡ <strong>${servicio}</strong> obtenido del caché (rápido)<br>` +
            `Resultado: ${JSON.stringify(data.resultado)}`;
    }

    // Mostrar caché
    const cacheDiv = document.getElementById('cache');
    if (data.cache.length > 0) {
        cacheDiv.textContent = data.cache.join(', ');
    }
});