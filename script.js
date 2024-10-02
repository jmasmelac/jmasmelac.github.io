document.addEventListener('DOMContentLoaded', function () {
    const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSwEPBWZGG5G88xpmKAjc7Cn7x9sd6ByHRw4tJsJxiAXic1g9EJ50ZK3y4SVckWDQ0HSadaNbT6kNN0/pubhtml';

    fetch(sheetURL)
        .then(response => response.text())
        .then(data => {
            // Parsear la respuesta HTML para extraer los datos
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
                        imagenes: cells[3].innerText.split(','), // Si las imágenes están separadas por comas
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
                    <a href="${project.repositorio}">Repositorio</a>
                    <div>${project.imagenes.map(img => `<img src="${img.trim()}" alt="${project.titulo}" />`).join('')}</div>
                    <p><strong>Enfoque:</strong> ${project.enfoque}</p>
                `;
                projectContainer.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});

