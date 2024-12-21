// Agregar evento al input de búsqueda
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
    // Usamos fetch para cargar el archivo JSON
    fetch('LOS ANIMES.json')
    .then(response => response.json())  // Convertimos la respuesta a JSON
    .then(data => {
        let resultsDiv = document.getElementById('search-results');
        resultsDiv.innerHTML = ''; // Limpiar resultados anteriores

        let matches = 0; // Para contar cuántos resultados coinciden

        data.forEach(anime => {
            let title = anime.title.toLowerCase();

            // Si el título del anime coincide con el texto ingresado
            if (title.includes(query)) {
                let resultItem = document.createElement('div');
                resultItem.classList.add('result-item');

                // Crea el contenido del resultado
                resultItem.innerHTML = `
                    <img src="${anime.image}" alt="${anime.title}">
                    <span>${anime.title}</span>
                `;

                // Asigna el evento para navegar al hacer clic
                resultItem.addEventListener('click', function() {
                    navigateToAnime(anime.title, anime.image, anime.description, anime.episodes);
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
    })
    .catch(error => {
        console.error('Error al cargar el contenido del JSON:', error);
    });
}

// Función de navegación para actualizar la información del anime seleccionado
function navigateToAnime(title, image, description, episodes) {
    // Actualizamos el contenido del anime seleccionado
    document.getElementById('animeTitle').innerText = title;
    document.getElementById('animeImage').src = image;
    document.getElementById('animeDescription').innerText = description;

    // Limpiar y agregar episodios al listado
    let episodeList = document.getElementById('episodeList');
    episodeList.innerHTML = ''; // Limpiar episodios anteriores

    // Limpiar el iframe para que no se quede el video del anterior anime
    document.getElementById('videoFrame').src = '';

    episodes.forEach((episode, index) => {
        let listItem = document.createElement('li');
        let link = document.createElement('a');
        link.href = '#'; // Eliminar el comportamiento de abrir en nueva página
        link.innerText = episode.title;

        // Evento para actualizar el iframe con el episodio seleccionado
        link.addEventListener('click', function() {
            document.getElementById('videoFrame').src = episode.url; // Cargar el video en el iframe
        });

        listItem.appendChild(link);
        episodeList.appendChild(listItem);

        // Cargar automáticamente el primer episodio al seleccionar un anime
        if (index === 0) {
            document.getElementById('videoFrame').src = episode.url; // Cargar el primer episodio en el iframe
        }
    });

    // Si quieres ocultar los resultados de búsqueda después de seleccionar uno
    document.getElementById('search-results').style.display = 'none';
}
