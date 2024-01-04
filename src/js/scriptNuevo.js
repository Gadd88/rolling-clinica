import listaPacientes from '../prueba/turnosPrueba.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');

const cargarTabla = () => {
    listaPacientes.forEach((item) => {
    const fila = document.createElement('tr');
    const celdas = `
      <th>${item.ID}</th>
      <td>${item.nombrePaciente}</td>
      <td>${item.fechaHora}</td>
    `;
    fila.innerHTML = celdas;
    cuerpoTabla.appendChild(fila); 
  });
};

cargarTabla();