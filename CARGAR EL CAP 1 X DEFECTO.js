   // Al cargar la página REPETICION.html
   document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('id');
    const firstEpisodeUrl = params.get('firstEpisode');

    // Cargar la URL del primer episodio en el iframe
    if (firstEpisodeUrl) {
        document.getElementById('videoFrame').src = firstEpisodeUrl; // Cargar el primer episodio
    }

    // Opcional: Cargar más información del anime
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