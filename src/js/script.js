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
    "id": "",
    "hora": hora.value,
    "fecha": fecha.value,
    "motivo": motivo.value,
    "medico": medico.value
  }
  turnosPaciente.push(turno)
  formTurnos.reset()
  cargarTurnos()
  console.log(turnosPaciente);
})

const cargarTurnos = () => {
  cuerpoTurnos.innerHTML=''
  turnosPaciente.forEach(turno => {
    const fila = document.createElement('tr')
    const celdas = `<th>${turno.fecha}</th>
    <td>${turno.hora}</td>
    <td>${turno.medico}</td>
    <td>${turno.motivo}</td>
    <td>
    <div class="d-flex gap-2">
    <button class="btn btn-outline-danger"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
    </div>
    </td>
    `

    fila.innerHTML = celdas
    cuerpoTurnos.appendChild(fila)
  })
}
