import listaPrueba from '../prueba/turnosPrueba.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');
let listaPacientes = listaPrueba

// En esta seccion esta la funcion para cargar los turnos de la pagina que vienen de PACIENTES a una tabla. 

const cargarTabla = (array) => {
    cargarTabla.innerHTML="";
    array.forEach(item => {
      const fila = document.createElement('tr');
      fila.id = crypto.randomUUID().slice(0,4)
      const celdas = `
        <th>${item.ID}</th>
        <td>${item.nombrePaciente}</td>
        <td>${item.fechaTurno}</td>
        <td>${item.horaTurno}</td>
        <td> <div class="d-flex gap-2">
        <button class="btn btn-outline-warning editar" data-bs-toggle="modal" data-bs-target="#editarTurno"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="btn btn-outline-danger borrar"><i class="fa-solid fa-trash"></i></button>
        </div></td>
      `;
      fila.innerHTML = celdas;
      cuerpoTabla.appendChild(fila); 
    });
};
cargarTabla(listaPacientes)

// En esta seccion esta la funcion para el boton eliminar cada turno seleccionado. 
const borrarTurno = (event) => {
    const filaTurno = event.target.closest('tr'); 
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
      }).then((result) => {
        if (result.isConfirmed) {
          filaTurno.remove()
          Swal.fire('Eliminado', '', 'success')
          cuerpoTabla.addEventListener('click', (e) => {
            if(e.target.classList.contains('borrar') || e.target.parentElement.classList.contains('borrar')){
                const turnoId = e.target.closest('th').value
                let newItem = listaPacientes.filter(item => item.ID != turnoId) 
                listaPacientes = newItem; 
                cargarTabla(listaPacientes);
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


// BOTON EDITAR **********************************
const editarTurno = (event) => {
  const filaTurno = event.target.closest('tr')
  filaTurno.addEventListener('click', (e) => {
    if(e.target.classList.contains('editar') || e.target.parentElement.classList.contains('editar')){
      const filaId = e.target.closest('tr').cells[0].textContent;
      const turnoSeleccionado = listaPacientes.filter( turno => turno.ID == filaId )[0];
      mostrarFormularioModificar(turnoSeleccionado.nombrePaciente)
    }
  })
}
document.querySelectorAll('.editar').forEach(botonEditar => {
  botonEditar.addEventListener('click', editarTurno);
})

const modalTitle = document.getElementById('modal-title')
const mostrarFormularioModificar = (nombre) => {
  //buscamos el producto que queremos modificar usando el metodo find y el id
  const turno = listaPacientes.filter(turno => turno.nombrePaciente == nombre)[0];
  //form para modificacion:
  const formEdicion = document.getElementById('form-edicion');
  formEdicion.innerHTML = `
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="nuevo-fechaTurno">Fecha Turno:</span>
          <input class="form-control" type="date" id="nuevo-fechaTurno" value="${turno.fechaTurno}">
      </div>
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="nuevo-horaTurno">Hora Turno:</span>
          <input class="form-control" type="time" id="nuevo-horaTurno" value="${turno.horaTurno}">
      </div>
      `
  modalTitle.textContent = `Paciente: ${turno.nombrePaciente}`
  // funcion para guardar los cambios
  const guardarEdicion = document.getElementById('btn-guardar')
  const editarTurno = (turno) => {
    console.log(turno)
    // cambiamos los datos originales por los agregados en el form de arriba
    turno.fechaTurno = document.getElementById('nuevo-fechaTurno').value;
    turno.horaTurno = document.getElementById('nuevo-horaTurno').value;
    // Mostrar nuevamente listado de productos
  }
  guardarEdicion.addEventListener('click', ()=> {
    editarTurno(turno)      
    console.log(listaPacientes)
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
    obtenerUserLogeado();
})

