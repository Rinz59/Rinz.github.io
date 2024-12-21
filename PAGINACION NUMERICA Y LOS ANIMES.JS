document.addEventListener('DOMContentLoaded', function () {
  // Selecciona el contenedor donde se mostrará el contenido
  const container = document.querySelector('.container');
  const pagesContainer = document.querySelector('.pages');
  const prevPageBtn = document.getElementById('prevPage');
  const nextPageBtn = document.getElementById('nextPage');

  let animes = []; // Variable para almacenar los animes del JSON
  const itemsPerPage = 12; // Número de animes por página
  let currentPage = 1; // Página actual

  // Función para crear los elementos de los animes
  function createAnimeElement(anime) {
      const animeDiv = document.createElement('div');
      animeDiv.classList.add('box');

      const animeImage = document.createElement('img');
      animeImage.src = anime.image;
      animeImage.alt = anime.title;

      const animeTitle = document.createElement('p');
      animeTitle.textContent = anime.title;

      animeDiv.appendChild(animeImage);
      animeDiv.appendChild(animeTitle);

      // Añade un evento click para redirigir a la página de detalles del anime
      animeDiv.addEventListener('click', function () {
          // Asegúrate de que anime.episodes[0] existe
          if (anime.episodes && anime.episodes.length > 0) {
              const firstEpisodeUrl = anime.episodes[0].url; // Obtener la URL del primer episodio
              window.location.href = `REPETICION.html?id=${anime.id}&firstEpisode=${encodeURIComponent(firstEpisodeUrl)}`; // Pasar el id y la URL del primer episodio
          } else {
              console.error('No hay episodios disponibles para este anime');
          }
      });

      container.appendChild(animeDiv);
  }

  // Función para mostrar los animes en la página actual
  function renderGallery() {
      container.innerHTML = ''; // Limpiar el contenedor
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, animes.length);

      for (let i = startIndex; i < endIndex; i++) {
          createAnimeElement(animes[i]);
      }
  }

  // Función para renderizar la paginación
  function renderPagination() {
      const totalPages = Math.ceil(animes.length / itemsPerPage);

      // Calcular el rango de páginas a mostrar
      const visiblePages = 5; // Número de páginas visibles
      let startPage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
      let endPage = Math.min(totalPages, startPage + visiblePages - 1);

      // Ajustar el rango si está cerca de los bordes
      if (endPage - startPage < visiblePages - 1) {
          startPage = Math.max(1, endPage - visiblePages + 1);
      }

      // Renderizar botones de paginación
      pagesContainer.innerHTML = '';

      for (let i = startPage; i <= endPage; i++) {
          const pageLink = document.createElement('a');
          pageLink.href = '#';
          pageLink.textContent = i;
          pageLink.setAttribute('data-page', i); // Agregar el número de página como atributo de datos

          if (i === currentPage) {
              pageLink.classList.add('active');
          }

          const listItem = document.createElement('li');
          listItem.appendChild(pageLink);
          pagesContainer.appendChild(listItem);
      }
  }

  // Manejar el evento de clic en la paginación
  pagesContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
          currentPage = parseInt(event.target.getAttribute('data-page'));
          renderGallery();
          renderPagination();
          event.preventDefault(); // Evitar el comportamiento predeterminado del enlace
      }
  });

  // Cargar el archivo JSON
  fetch('LOS ANIMES.json')
      .then(response => response.json())
      .then(data => {
          animes = data; // Guardar los animes del JSON
          renderGallery(); // Mostrar los animes de la primera página
          renderPagination(); // Crear la paginación
      })
      .catch(error => console.error('Error cargando el JSON:', error));

  // Eventos para botones de anterior y siguiente
  prevPageBtn.addEventListener('click', () => {
      if (currentPage > 1) {
          currentPage--;
          renderGallery();
          renderPagination();
      }
  });

  nextPageBtn.addEventListener('click', () => {
      const totalPages = Math.ceil(animes.length / itemsPerPage);
      if (currentPage < totalPages) {
          currentPage++;
          renderGallery();
          renderPagination();
      }
  });
});