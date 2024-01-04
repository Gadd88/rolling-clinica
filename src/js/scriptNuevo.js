import listaPacientes from '../prueba/turnosPrueba.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');

const cargarTabla = () => {
    listaPacientes.forEach((item) => {
    const fila = document.createElement('tr');
    const celdas = `
      <th>${item.ID}</th>
      <td>${item.nombrePaciente}</td>
      <td>${item.fechaHora}</td>
      <td> <div class="d-flex gap-2">
      <button class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn btn-outline-danger"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    `;
    fila.innerHTML = celdas;
    cuerpoTabla.appendChild(fila); 
  });
};

cargarTabla();