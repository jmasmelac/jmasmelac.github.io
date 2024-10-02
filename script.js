const sheetURL = 'https://docs.google.com/spreadsheets/d/1rt6M2VdhDCsNOuzkIKLrVve2vT9-4eBBMivNtwZiea8/export?format=csv';

// Función para cargar y parsear el CSV
fetch(sheetURL)
    .then(response => response.text())
    .then(csvData => {
        // Usar Papa Parse para convertir CSV a JSON
        const parsedData = Papa.parse(csvData, {
            header: true,   // Usar la primera fila como encabezado
            skipEmptyLines: true,  // Saltar las líneas vacías
        });

        const projects = parsedData.data;
        console.log(projects); // Ver los proyectos en la consola para verificar

        // Mostrar los proyectos en la página web
        const projectsContainer = document.getElementById('projects');
        projects.forEach(project => {
            const projectElement = document.createElement('div');
            projectElement.innerHTML = `
                <h3>${project['Nombre del Proyecto']}</h3>
                <p>${project['Descripción']}</p>
                <a href="${project['Enlace al Repositorio']}" target="_blank">Ver en GitHub</a>
            `;
            projectsContainer.appendChild(projectElement);
        });
    })
    .catch(error => console.error('Error al cargar el CSV:', error));