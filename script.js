document.addEventListener('DOMContentLoaded', function () {
    // URL de la API de Google Sheets
    const sheetURL = 'https://sheets.googleapis.com/v4/spreadsheets/1rt6M2VdhDCsNOuzkIKLrVve2vT9-4eBBMivNtwZiea8/values/Hoja%201?key=AIzaSyAzAR4zmdDxnp3QFTr0KVt0TwBwv7DHMHw';

    // Función principal para cargar y mostrar los datos
    fetch(sheetURL)
        .then(response => {
            // Verifica si la respuesta es válida
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Debug: Imprimir el JSON en la consola
            console.log('Datos JSON cargados:', data);

            // Verificar si hay filas en los datos
            const rows = data.values;
            if (!rows || rows.length < 2) {
                console.error('No se encontraron datos en la hoja.');
                return;
            }

            // Limpiar y obtener el contenedor de proyectos
            const projectContainer = document.getElementById('projects-container');
            projectContainer.innerHTML = ''; // Limpia el contenedor para evitar duplicados

            // Iterar sobre las filas de datos (omitimos la primera fila: encabezados)
            rows.slice(1).forEach(row => {
                console.log('Procesando fila:', row); // Debug para verificar cada fila

                // Crear el elemento HTML para el proyecto
                const projectElement = document.createElement('div');
                projectElement.className = 'project';
                projectElement.innerHTML = `
                    <h3>${row[0]}</h3> <!-- Título -->
                    <p>${row[1]}</p> <!-- Descripción -->
                    <a href="${row[2]}" target="_blank">Repositorio</a> <!-- Repositorio -->
                    <div class="images">
                        ${row[3]?.split(',')
                            .map(img => `<img src="${img.trim()}" alt="${row[0]}" />`)
                            .join('')} <!-- Imágenes -->
                    </div>
                    <p><strong>Enfoque:</strong> ${row[4]}</p> <!-- Enfoque -->
                `;

                // Agregar el proyecto al contenedor
                projectContainer.appendChild(projectElement);
            });
        })
        .catch(error => {
            // Manejo de errores
            console.error('Error al cargar los datos:', error);
        });
});



