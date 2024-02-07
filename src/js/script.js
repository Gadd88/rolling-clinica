const formTurnos = document.getElementById('formTurnos')

const fecha = document.getElementById('fecha')
const hora = document.getElementById('hora')
const medico = document.getElementById('medico')
const motivo = document.getElementById('motivo')
const tablaTurnos = document.getElementById('tablaTurnos')

let listaTurnos = []

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
  console.log(listaTurnos);
})

// Función que carga los turnos que se van creando mediante el formulario.

const cargarTurnos = () => {
  tablaTurnos.innerHTML = ''
  listaTurnos.forEach(turno => {
    const fila = document.createElement('tr')
    const celdas = `<th>${turno.id}</th>
    <td>${turno.hora}</td>
    <td>${turno.fecha.hora}</td>
    <td>${turno.motivo}</td>
    <td> <div class="d-flex gap-2">
      <button class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn btn-outline-danger borrar"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    `

    fila.innerHTML = celdas
    tablaTurnos.appendChild(fila)
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
      const celdas = `<th>${turno.id}</th>
    <td>${turno.fecha}</td>
    <td>${turno.hora}</td>
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
      tablaTurnos.appendChild(fila)
    })
  }
}

// Función que se ejecuta al inicio.

cargaDeTurnos()

// Boton para borrar turno

const borrarTurno = (event) => {
  const filaTurno = event.target.closest('tr'); 
  Swal.fire({
      title: 'Estas seguro que quieres eliminar este turno?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Si',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        cancelButton: 'order-1 right-gap',
        confirmButton: 'order-2',
        denyButton: 'order-3',
      },
    }).then((result) => {
      if (result.isConfirmed) {
          filaTurno.remove();
        Swal.fire('Eliminado', '', 'success')

        listaTurnos.addEventListener('click', (e) => {
          if(e.target.classList.contains('borrar') || e.target.parentElement.classList.contains('borrar')){
              const turnoId = e.target.closest('tr').ID
              let newItem = listaTurnos.filter(item => item.ID != turnoId) 
              listaTurnos = newItem; 
              cargaDeTurnos();
              
          }
      })
      


      } else if (result.isDenied) {
        Swal.fire('No eliminaste este turno!', '', 'info')
      }
    })

};

document.querySelectorAll('.borrar').forEach(botonBorrar => {
  botonBorrar.addEventListener('click', borrarTurno);
});
