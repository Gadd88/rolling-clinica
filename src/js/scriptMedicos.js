// import listaPrueba from './turnos.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');

const consultaApi = async () => {
  const response = await fetch('http://localhost:3000/turnos')
  const result = await response.json()
  const data = result
  localStorage.setItem('turnos', JSON.stringify(data))
}

let listaPacientes = JSON.parse(localStorage.getItem('turnos'))

document.addEventListener("DOMContentLoaded",function(){
  Swal.fire({
    position: "center",
    icon: "info",
    title: "Cargando Turnos",
    showConfirmButton: false,
    timer: 1000
  });
  //llamada a la api json-server
  consultaApi()
  //setTimeout para funciones asincronas
  setTimeout(() => {
    cargarTabla()
    //boton borrar
    document.querySelectorAll('.borrar').forEach(botonBorrar => {
      botonBorrar.addEventListener('click', borrarTurno);
    });
    //boton editar
    document.querySelectorAll('.editar').forEach(botonEditar => {
      botonEditar.addEventListener('click', (e) => {
        const turnoId = e.target.id
        const turno = listaPacientes.find(turno => turno.id === turnoId)
        mostrarFormularioModificar(turno)
      });
    })
  }, 1000)
  obtenerUserLogeado();
})

const cargarTabla = () => {
    consultaApi()
    cuerpoTabla.innerHTML = ''
    if(listaPacientes == null || listaPacientes.length < 1) return cuerpoTabla.innerHTML = `<h3 class="text-center m-auto">No hay pacientes agendados</h3>`
    listaPacientes.forEach( item => {
      const {id, paciente, fechaTurno, horaTurno} = item
      const fila = document.createElement('tr');
      fila.id = id
      const celdas = `
        <th>${id}</th>
        <td>${paciente}</td>
        <td>${fechaTurno.split('-').reverse().join('/')}</td>
        <td>${horaTurno}</td>
        <td> <div class="d-flex gap-2">
        <button class="btn btn-outline-warning editar" id=${id} data-bs-toggle="modal" data-bs-target="#editarTurno" ><i class="fa-solid fa-pen-to-square" id=${id}></i></button>
        <button class="btn btn-outline-danger borrar"><i class="fa-solid fa-trash"></i></button>
        </div></td>
      `;
      fila.innerHTML = celdas;
      cuerpoTabla.appendChild(fila); 
    });
};

// BOTON ELIMINAR ********************************* 
const borrarTurno = (event) => {
    // const filaTurno = event.target.closest('tr'); 
    cuerpoTabla.addEventListener('click', (e) => {
      const turnoId = e.target.closest('tr').id
      if(e.target.classList.contains('borrar') || e.target.parentElement.classList.contains('borrar')){
        Swal.fire({
            title: 'Estas seguro que quieres eliminar este turno?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Si',
            denyButtonText: 'No',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            },
          }).then( result => {
            if (result.isConfirmed) {
              // filaTurno.remove()
                  // let newItem = listaPacientes.filter(item => item.id != turnoId) 
                  // listaPacientes = newItem;
                  fetch(`http://localhost:3000/pacientes/${turnoId}`, {
                    method: 'DELETE',
                  }) 
                  Swal.fire('Eliminado', '', 'success')
                  cargarTabla();
            }else if (result.isDenied) {
              Swal.fire('No eliminaste este turno!', '', 'info')
            }
          })
      }
    })

};  

// BOTON EDITAR **********************************
const modalTitle = document.getElementById('modal-title')
const modalBody = document.getElementById('modal-body')
const mostrarFormularioModificar = (turno) => {
  //form para modificacion:
  const formEdicion = document.getElementById('form-edicion');
  formEdicion.innerHTML = `
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="motivoTurno">Motivo turno:</span>
          <input class="form-control" role='button' type="text" id="motivoTurno" value="${turno.motivo_consulta}" readonly>
      </div>
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="nuevo-fechaTurno">Fecha Turno:</span>
          <input class="form-control" type="date" id="nuevo-fechaTurno" value="${turno.fechaTurno}">
      </div>
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="nuevo-horaTurno">Hora Turno:</span>
          <input class="form-control" type="time" id="nuevo-horaTurno" value="${turno.horaTurno}">
      </div>
      `
  modalTitle.textContent = `Paciente: ${turno.paciente}`
  // funcion para guardar los cambios
  const guardarEdicion = document.getElementById('btn-guardar')
  const editarTurno = async () => {
    cuerpoTabla.innerHTML = ''
    // cambiamos los datos originales por los agregados en el form de arriba
    turno.fechaTurno = document.getElementById('nuevo-fechaTurno').value;
    turno.horaTurno = document.getElementById('nuevo-horaTurno').value;
    await fetch(`http://localhost:3000/pacientes/${turno.id}`, {
      method: 'PATCH',
      headers: new Headers({
          'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
          fechaTurno: turno.fechaTurno,
          horaTurno: turno.horaTurno,
        })
      })
    // Mostrar nuevamente listado de turnos
    cargarTabla()
  }
  guardarEdicion.addEventListener('click', ()=> {
    editarTurno()
    Swal.fire('Turno Editado', '', 'success')
  })
}
// Para obtener el nombre de usuario y usarlo arriba
const obtenerUserLogeado = () =>{
  const usuario = localStorage.getItem("nombreMedico")
  if (usuario){
      document.getElementById("spanUser").innerHTML = usuario;
  } else{
      return null;
  } 
}

