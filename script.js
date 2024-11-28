document.addEventListener('DOMContentLoaded', function () {
    const sheetURL = 'https://sheets.googleapis.com/v4/spreadsheets/1rt6M2VdhDCsNOuzkIKLrVve2vT9-4eBBMivNtwZiea8/values/Hoja%201?key=AIzaSyAzAR4zmdDxnp3QFTr0KVt0TwBwv7DHMHw';
    const projectContainer = document.getElementById('projects-container');
    const filterSelect = document.getElementById('project-filter');

    let allProjects = []; // Variable para almacenar todos los proyectos

    // Cargar y mostrar proyectos desde Google Sheets
    fetch(sheetURL)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const rows = data.values;
            if (!rows || rows.length < 2) {
                console.error('No se encontraron datos en la hoja.');
                return;
            }

            // Procesar los datos y guardarlos en `allProjects`
            allProjects = rows.slice(1).map(row => ({
                titulo: row[0],
                descripcion: row[1],
                repositorio: row[2],
                imagenes: row[3]?.split(','),
                enfoque: row[4]
            }));

            // Mostrar todos los proyectos al inicio
            renderProjects(allProjects);
        })
        .catch(error => console.error('Error al cargar los datos:', error));

    // Función para mostrar los proyectos
    function renderProjects(projects) {
        projectContainer.innerHTML = ''; // Limpiar el contenedor
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.className = 'project';
            projectElement.innerHTML = `
                <h3>${project.titulo}</h3>
                <p>${project.descripcion}</p>
                <a href="${project.repositorio}" target="_blank">Repositorio</a>
                <div class="images">
                    ${project.imagenes
                        ?.map(img => `<img src="${img.trim()}" alt="${project.titulo}" />`)
                        .join('')}
                </div>
                <p><strong>Enfoque:</strong> ${project.enfoque}</p>
            `;
            projectContainer.appendChild(projectElement);
        });
    }

    // Filtrar proyectos según el enfoque seleccionado
    filterSelect.addEventListener('change', () => {
        const selectedEnfoque = filterSelect.value;
        const filteredProjects =
            selectedEnfoque === 'Todos'
                ? allProjects
                : allProjects.filter(project => project.enfoque === selectedEnfoque);
        renderProjects(filteredProjects);
    });
});

// Selecciona todos los enlaces del nav que apunten a un ID
function smoothScroll(targetPosition) {
    const startPosition = window.pageYOffset; // Posición inicial
    const distance = targetPosition - startPosition; // Distancia a recorrer
    const duration = 1200; // Duración del scroll en milisegundos (ajustada a 1.2s)
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);

        window.scrollTo(0, run);

        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) { // Función de suavizado (easeInOutQuad)
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

// Escucha los clics en los enlaces del nav
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href'); // Obtiene el ID del destino
        const targetElement = document.querySelector(targetId); // Selecciona el destino

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight; // Altura del encabezado
            const marginOffset = 10; // Margen adicional
            const targetPosition = targetElement.offsetTop - headerHeight - marginOffset;

            smoothScroll(targetPosition); // Llama a la función de scroll suave
        }
    });
});





