const turnosStorage = JSON.parse(localStorage.getItem('listaPacientes'));

const mostrarTurnos = () => {
  const tablaTurnos = document.getElementById('tablaTurnos');
  tablaTurnos.innerHTML = '';

  if (turnosStorage.length < 1) {
    return tablaTurnos.innerHTML = '<h3>No hay turnos agendados</h3>';
  } else{

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
  document.querySelector('#tablaTurnos').innerHTML = cuerpo;
//   tablaTurnos.innerHTML = cuerpo;
};
document.onload = mostrarTurnos();


 document.addEventListener('DOMContentLoaded', () => {
   mostrarTurnos();
 
 });}

// document.querySelector('#tablaTurnos').innerHTML = cuerpo;