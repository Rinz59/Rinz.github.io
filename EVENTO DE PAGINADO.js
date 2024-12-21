// Modifica el manejador de eventos de clic para los enlaces de paginación
pageLink.addEventListener('click', (event) => {
    currentPage = i;
    renderGallery();
    renderPagination();
    event.preventDefault(); // Evita el comportamiento predeterminado del enlace
  });
  