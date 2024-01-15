import listaTurnos from './turnos.json' assert { type: 'json'}

const formTurnos = document.getElementById('formTurnos')

const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')
const medico = document.getElementById('medico')
const motivo = document.getElementById('motivo')
const cuerpoTurnos = document.getElementById('cuerpoTurnos')

// Evento que crea un objeto llamado turno, y lo carga en un JSON mediante el formulario.

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
  localStorage.setItem('turnos', JSON.stringify(listaTurnos))
  cargarTurnos()
})

// Función que carga los turnos que se van creando mediante el formulario.

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
        <button onclick="borrarTurno('${turno.id}')" class="btn btn-outline-danger">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
    </td>
    `

    fila.innerHTML = celdas
    cuerpoTurnos.appendChild(fila)
  })
}

// Función que elimina los turnos del DOM y del local storage.

window.borrarTurno = (id) => {

  let index = listaTurnos.findIndex((turno) => turno.id == id)
  let validar = confirm(`¿Está seguro/a que desea cancelar su turno del día?`)

  if (validar) {
    listaTurnos.splice(index, 1)
    localStorage.setItem('turnos', JSON.stringify(listaTurnos))
    cargarTurnos()
  }
}

// Función que carga los turnos del local storage.

const cargaDeTurnos = () => {
  const baseDeDatos = JSON.parse(localStorage.getItem('turnos'))

  if (!baseDeDatos) {
    localStorage.setItem('turnos', JSON.stringify(listaTurnos))
  } else {
    cuerpoTurnos.innerHTML = ''
    JSON.parse(localStorage.getItem('turnos')).forEach(turno => {
      const fila = document.createElement('tr')
      const celdas = `<th>${turno.fecha}</th>
    <td>${turno.hora}</td>
    <td>${turno.medico}</td>
    <td>${turno.motivo}</td>
    <td>
      <div class="d-flex gap-2">
        <button onclick="borrarTurno('${turno.id}')" class="btn btn-outline-danger">
          <i class="fa fa-trash-o" aria-hidden="true"></i>
        </button>
      </div>
    </td>
    `
      fila.innerHTML = celdas
      cuerpoTurnos.appendChild(fila)
    })
  }
}

// Función que se ejecuta al inicio.

cargaDeTurnos()
