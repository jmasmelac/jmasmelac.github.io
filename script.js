document.addEventListener('DOMContentLoaded', function () {
    const sheetURL = 'https://sheets.googleapis.com/v4/spreadsheets/1rt6M2VdhDCsNOuzkIKLrVve2vT9-4eBBMivNtwZiea8/values/Hoja%201?key=AIzaSyAzAR4zmdDxnp3QFTr0KVt0TwBwv7DHMHw';

    fetch(sheetURL)
        .then(response => response.text()) // Obtener los datos como texto
        .then(data => {
            // Parsear el HTML
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const rows = doc.querySelectorAll('table tbody tr');
            
            const projects = [];
            rows.forEach(row => {
                const cells = row.querySelectorAll('td');
                if (cells.length > 0) {
                    projects.push({
                        titulo: cells[0].innerText,
                        descripcion: cells[1].innerText,
                        repositorio: cells[2].innerText,
                        imagenes: cells[3].innerText.split(','), // Imágenes separadas por comas
                        enfoque: cells[4].innerText
                    });
                }
            });

            // Mostrar los datos en la página
            console.log('Datos extraídos:', projects);

            const projectContainer = document.getElementById('project-list');
            projects.forEach(project => {
                const projectElement = document.createElement('div');
                projectElement.innerHTML = `
                    <h3>${project.titulo}</h3>
                    <p>${project.descripcion}</p>
                    <a href="${project.repositorio}" target="_blank">Repositorio</a>
                    <div>${project.imagenes.map(img => `<img src="${img.trim()}" alt="${project.titulo}" />`).join('')}</div>
                    <p><strong>Enfoque:</strong> ${project.enfoque}</p>
                `;
                projectContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});


