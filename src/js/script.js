const turnosStorage = JSON.parse(localStorage.getItem('listaPacientes'));

const mostrarTurnos = () => {
  const tablaTurnos = document.getElementById('tablaTurnos');
  tablaTurnos.innerHTML = '';

  if (turnosStorage.length < 1) {
    tablaTurnos.innerHTML = '<h3>No hay turnos agendados</h3>';
    return;
  }

  let cuerpo = '';
  turnosStorage.forEach((turno, index) => {
    const { nombrePaciente, fechaHora, ID } = turno;
    cuerpo += '<tr>';
    cuerpo += '<td>' + ID + '</td>';
    cuerpo += '<td>' + nombrePaciente + '</td>';
    cuerpo += '<td>' + fechaHora + '</td>';
    cuerpo +=
      '<td><button onclick="deleteData(' +
      index +
      ')" class="btn btn-danger">Eliminar</button></td>';
    cuerpo += '</tr>';
  });

  tablaTurnos.innerHTML = cuerpo;
};

document.addEventListener('DOMContentLoaded', () => {
  mostrarTurnos();
});