/**
 * Manejo de navegación del sistema de pestañas
 */
function openTab(tabId) {
    // Ocultar todos los bloques de contenido de pestañas
    document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    
    // Quitar el estado activo a todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    
    // Mostrar la pestaña seleccionada y activar su respectivo botón
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

/**
 * Procesa y calcula las sumatorias de la ficha 8237 
 * y actualiza los totales consolidados de la pestaña semanal.
 */
function procesarCalculos() {
    const filas = document.querySelectorAll('.fila-dato');
    
    let granSumaPiezas = 0;
    let granSumaKilos = 0;

    filas.forEach(fila => {
        // Capturar valores numéricos de los turnos de la fila actual
        let p1 = parseFloat(fila.querySelector('.p1').value) || 0;
        let k1 = parseFloat(fila.querySelector('.k1').value) || 0;
        let p2 = parseFloat(fila.querySelector('.p2').value) || 0;
        let k2 = parseFloat(fila.querySelector('.k2').value) || 0;
        let p3 = parseFloat(fila.querySelector('.p3').value) || 0;
        let k3 = parseFloat(fila.querySelector('.k3').value) || 0;

        // Sumatorias horizontales aritméticas por día
        let totalPiezasDia = p1 + p2 + p3;
        let totalKilosDia = k1 + k2 + k3;

        // Escribir los totales automáticos en la misma fila (8237)
        fila.querySelector('.tot-p').value = totalPiezasDia;
        fila.querySelector('.tot-k').value = totalKilosDia.toFixed(2);

        // Acumulación vertical consolidada para la semana
        granSumaPiezas += totalPiezasDia;
        granSumaKilos += totalKilosDia;
    });

    // VINCULACIÓN DIRECTA A LA SEGUNDA PESTAÑA ("Semana del 27 de Mayo")
    // 1. Modificar los indicadores visuales (Tarjetas de resumen)
    document.getElementById('resumen-total-piezas').innerText = granSumaPiezas.toLocaleString('es-MX');
    document.getElementById('resumen-total-kilos').innerText = granSumaKilos.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

    // 2. Modificar las celdas finales de la tabla de resumen
    document.getElementById('tabla-resumen-piezas').innerText = granSumaPiezas.toLocaleString('es-MX');
    document.getElementById('tabla-resumen-kilos').innerText = granSumaKilos.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Escuchador global: Cuando el navegador cargue por completo, ejecuta la sumatoria inicial
window.onload = procesarCalculos;
