// import listaPrueba from './turnos.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');

// En esta seccion esta la funcion para cargar los turnos de la pagina que vienen de PACIENTES a una tabla. 
// const consultaApi = async () => {
//   const response = await fetch('http://localhost:3000/pacientes')
//   const result = await response.json()
//   const data = result
//   localStorage.setItem('turnos')
// }
const consultaApi = async () => {
  const response = await fetch('http://localhost:3000/pacientes')
  const result = await response.json()
  const data = result
  localStorage.setItem('turnos', JSON.stringify(data))
}

let listaPacientes = JSON.parse(localStorage.getItem('turnos'))

const cargarTabla = () => {
    cuerpoTabla.innerHTML = ''
    consultaApi()
    if(listaPacientes == null || listaPacientes.length < 1) return cuerpoTabla.innerHTML = `<h3 class="text-center m-auto">No hay pacientes agendados</h3>`
    listaPacientes.forEach( item => {
      const {id, paciente, fechaTurno, horaTurno} = item
      const fila = document.createElement('tr');
      fila.id = id/* crypto.randomUUID().slice(0,4) */
      const celdas = `
        <th>${id}</th>
        <td>${paciente}</td>
        <td>${new Date(fechaTurno).toLocaleDateString('es-AR')}</td>
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
cargarTabla()
// En esta seccion esta la funcion para el boton eliminar cada turno seleccionado. 
const borrarTurno = (event) => {
    // const filaTurno = event.target.closest('tr'); 
    cuerpoTabla.addEventListener('click', (e) => {
      const turnoId = e.target.closest('tr').id
      console.log(turnoId)
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
document.querySelectorAll('.borrar').forEach(botonBorrar => {
  botonBorrar.addEventListener('click', borrarTurno);
});


// BOTON EDITAR **********************************
// const editarTurno = (event) => {
//   // const filaTurno = event.target.closest('tr')
//   cuerpoTabla.addEventListener('click', editarClick)
// }
// const editarClick = (e) => {
  //     const turnoSeleccionado = listaPacientes.find(turno => turno.id == filaId);
  //     mostrarFormularioModificar(turnoSeleccionado.id)
  //   }
  // }
document.querySelectorAll('.editar').forEach(botonEditar => {
  botonEditar.addEventListener('click', (e) => {
    const turnoId = e.target.id
    const turno = listaPacientes.find(turno => turno.id === turnoId)
    mostrarFormularioModificar(turno)
    // if(e.target.classList.contains('editar') || e.target.parentElement.classList.contains('editar')){
    //   let filaId = e.target.closest('tr').id;
    //   console.log(filaId)
    //   const turnoSeleccionado = listaPacientes.find(turno => turno.id === filaId)
    //   mostrarFormularioModificar(turnoSeleccionado)
    // }  
  });
})

const modalTitle = document.getElementById('modal-title')
const modalBody = document.getElementById('modal-body')
const mostrarFormularioModificar = (turno) => {
  //buscamos el producto que queremos modificar usando el metodo find y el id
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
    // Mostrar nuevamente listado de productos
    // setTimeout(() => {
      //   location.reload()
      // }, 1000);
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
document.addEventListener("DOMContentLoaded",function(){
  consultaApi()
  obtenerUserLogeado();
})

