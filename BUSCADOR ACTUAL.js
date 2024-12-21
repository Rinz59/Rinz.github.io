document.getElementById('search').addEventListener('input', function() {
    let query = this.value.toLowerCase();

    // Mostrar los resultados solo si el texto es mayor a 2 caracteres
    if (query.length > 2) {
        fetchResults(query);
    } else {
        document.getElementById('search-results').style.display = 'none';
    }
});

function fetchResults(query) {
    // Selecciona todos los elementos con la clase 'box'
    let boxes = document.querySelectorAll('.box');
    let resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

    let matches = 0; // Para contar cuántos resultados coinciden

    boxes.forEach(box => {
        let title = box.getAttribute('data-title').toLowerCase();

        // Si el título del anime coincide con el texto ingresado
        if (title.includes(query)) {
            let resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            // Crea el contenido del resultado
            resultItem.innerHTML = `
                <img src="${box.querySelector('img').src}" alt="${title}">
                <span>${box.getAttribute('data-title')}</span>
            `;

            resultItem.addEventListener('click', function() {
                box.click(); // Simula el click en la tarjeta correspondiente
            });

            resultsDiv.appendChild(resultItem);
            matches++;
        }
    });

    if (matches > 0) {
        resultsDiv.style.display = 'block'; // Muestra los resultados
    } else {
        resultsDiv.style.display = 'none'; // Oculta si no hay resultados
    }
}
