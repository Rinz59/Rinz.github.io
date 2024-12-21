function navigateToAnime(anime) {
    localStorage.setItem('selectedAnime', JSON.stringify(anime));
    console.log('Datos guardados en localStorage:', JSON.stringify(anime)); // Esto te mostrará los datos guardados
    window.location.href = 'REPETICION.html';
}
