import listaTurnos from './turnos.json' assert { type : 'json'}

const formTurnos = document.getElementById('formTurnos')

const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')
const medico = document.getElementById('medico')
const motivo = document.getElementById('motivo')
const cuerpoTurnos = document.getElementById('cuerpoTurnos')

const turnosPaciente = []

formTurnos.addEventListener('submit', (e) => {
  e.preventDefault()
  const turno = {
    "id": crypto.randomUUID().slice(0, 4),
    "hora": hora.value,
    "fecha": fecha.value,
    "motivo": motivo.value,
    "medico": medico.value
  }
  listaTurnos.push(turno)
  formTurnos.reset()
  cargarTurnos()
  console.log(listaTurnos);
})

const cargarTurnos = () => {
  cuerpoTurnos.innerHTML = ''
  listaTurnos.forEach(turno => {
    const fila = document.createElement('tr')
    const celdas = `<th>${turno.fecha}</th>
    <td>${turno.hora}</td>
    <td>${turno.medico}</td>
    <td>${turno.motivo}</td>
    <td>
    <div class="d-flex gap-2">
    <button onclick="borrarTurno(${turno.id})" class="btn btn-outline-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
    </div>
    </td>
    `

    fila.innerHTML = celdas
    cuerpoTurnos.appendChild(fila)
  })
}

window.borrarTurno = (id) => {
  let index = listaTurnos.findIndex((turno) => turno.id == id)
  console.log(index);
}