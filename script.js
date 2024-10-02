const sheetURL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSwEPBWZGG5G88xpmKAjc7Cn7x9sd6ByHRw4tJsJxiAXic1g9EJ50ZK3y4SVckWDQ0HSadaNbT6kNN0/export?format=csv';

fetch(sheetURL)
    .then(response => response.text())
    .then(csvData => {
        Papa.parse(csvData, {
            header: true, // Para que las columnas se lean como nombres de campos
            skipEmptyLines: true, // Para evitar líneas vacías
            complete: function(results) {
                console.log('Datos parseados:', results.data);
                const projects = results.data;
                const projectsContainer = document.getElementById('projects');
                
                // Limpiar contenido anterior
                projectsContainer.innerHTML = '';

                // Mostrar los proyectos
                projects.forEach(project => {
                    // Manejar las imágenes separadas por comas
                    const images = project['imagenes'].split(',').map(imageUrl => `<img src="${imageUrl.trim()}" alt="Imagen del proyecto" />`).join('');

                    const projectElement = document.createElement('div');
                    projectElement.innerHTML = `
                        <h3>${project['titulo']}</h3>
                        <p>${project['descripción']}</p>
                        <a href="${project['repositorio']}" target="_blank">Ver en GitHub</a>
                        <div>${images}</div>
                        <p><strong>Enfoque:</strong> ${project['enfoque']}</p>
                    `;
                    projectsContainer.appendChild(projectElement);
                });
            }
        });
    })
    .catch(error => console.error('Error al cargar el CSV:', error));
