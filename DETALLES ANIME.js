window.addEventListener('DOMContentLoaded', () => {
    // Obtener el parámetro id de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const animeId = urlParams.get('id');

    if (animeId) {
        // Cargar el archivo JSON
        fetch('LOS ANIMES.json')
            .then(response => response.json())
            .then(data => {
                // Buscar el anime con el id especificado
                const selectedAnime = data.find(anime => anime.id === animeId);

                if (selectedAnime) {
                    // Actualizar los detalles del anime en la página
                    document.getElementById('animeTitle').innerText = selectedAnime.title;
                    document.getElementById('animeImage').src = selectedAnime.image;
                    document.getElementById('animeDescription').innerText = selectedAnime.description;

                    // Cargar los episodios
                    const episodeList = document.getElementById('episodeList');
                    episodeList.innerHTML = '';

                    selectedAnime.episodes.forEach(episode => {
                        const listItem = document.createElement('li');
                        const link = document.createElement('a');
                        link.href = '#';
                        link.innerText = episode.title;

                        link.addEventListener('click', function() {
                            document.getElementById('videoFrame').src = episode.url;
                        });

                        listItem.appendChild(link);
                        episodeList.appendChild(listItem);
                    });
                } else {
                    console.error('Anime no encontrado');
                    window.location.href = 'index.html'; // Redirigir si no se encuentra el anime
                }
            })
            .catch(error => console.error('Error cargando el JSON:', error));
    } else {
        console.error('No se encontró el id en la URL');
        window.location.href = 'index.html'; // Redirigir si no hay id en la URL
    }
});