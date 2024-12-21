// Agregar evento al input de búsqueda
document.getElementById('search').addEventListener('input', function () {
    let query = this.value.toLowerCase();

    // Mostrar los resultados solo si el texto es mayor a 2 caracteres
    if (query.length > 2) {
        fetchResults(query);
    } else {
        document.getElementById('search-results').style.display = 'none'; // Ocultar si no hay suficiente texto
    }
});

// Función para buscar resultados
function fetchResults(query) {
    // Usamos fetch para cargar el archivo JSON
    fetch('LOS ANIMES.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Convertimos la respuesta a JSON
        })
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

                    // Asigna el evento para navegar al hacer clic, pasando el objeto anime completo
                    resultItem.addEventListener('click', function () {
                        navigateToAnime(anime); // Pasar el objeto anime completo
                    });

                    resultsDiv.appendChild(resultItem);
                    matches++;
                }
            });

            // Mostrar u ocultar resultados
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

// Función de navegación para redirigir a REPETICION.html
function navigateToAnime(anime) {
    // Asegúrate de que anime.episodes[0] existe
    if (anime.episodes.length > 0) {
        const episodeUrl = anime.episodes[0].url; // Obtener la URL del primer episodio
        window.location.href = `REPETICION.html?id=${anime.id}&firstEpisode=${encodeURIComponent(episodeUrl)}`; // Pasar el id y la URL del primer episodio
    } else {
        console.error('No hay episodios disponibles para este anime');
    }
}

// Cargar automáticamente el primer episodio en REPETICION.html
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const firstEpisodeUrl = params.get('firstEpisode');

    // Cargar la URL del primer episodio en el iframe
    if (firstEpisodeUrl) {
        document.getElementById('videoFrame').src = firstEpisodeUrl; // Cargar el primer episodio
    }

    // Opcional: Cargar más información del anime si se desea
    const animeId = params.get('id');
    fetch('LOS ANIMES.json')
        .then(response => response.json())
        .then(data => {
            const animeData = data.find(anime => anime.id === animeId);
            if (animeData) {
                document.getElementById('animeTitle').innerText = animeData.title;
                document.getElementById('animeImage').src = animeData.image;
            }
        })
        .catch(error => console.error('Error al cargar el contenido del JSON:', error));
});
