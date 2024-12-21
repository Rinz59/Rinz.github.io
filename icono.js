document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon img');

    let isExpanded = false;

    menuIcon.addEventListener('click', function() {
        // Solo aplicar la animación en dispositivos móviles
        if (window.innerWidth <= 768) {
            isExpanded = !isExpanded;
            menuIcon.classList.toggle('expanded', isExpanded);
        }
    });
});
