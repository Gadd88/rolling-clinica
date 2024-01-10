// import listaPrueba from './turnos.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');
let listaPacientes = JSON.parse(localStorage.getItem('turnos'))

// En esta seccion esta la funcion para cargar los turnos de la pagina que vienen de PACIENTES a una tabla. 


const cargarTabla = () => {
    cargarTabla.innerHTML="";
    listaPacientes.forEach(item => {
      const fila = document.createElement('tr');
      fila.id = item.id/* crypto.randomUUID().slice(0,4) */
      const celdas = `
        <th>${item.id}</th>
        <td>${item.paciente}</td>
        <td>${item.fecha}</td>
        <td>${item.hora}</td>
        <td> <div class="d-flex gap-2">
        <button class="btn btn-outline-warning editar" id=${item.id} data-bs-toggle="modal" data-bs-target="#editarTurno" ><i class="fa-solid fa-pen-to-square" id=${item.id}></i></button>
        <button class="btn btn-outline-danger borrar"><i class="fa-solid fa-trash"></i></button>
        </div></td>
      `;
      fila.innerHTML = celdas;
      cuerpoTabla.appendChild(fila); 
    });
};
console.log(listaPacientes)
if(listaPacientes == null){
  cuerpoTabla.innerHTML = 
    `<h3 class="text-center m-auto">No hay pacientes agendados</h3>`
}else{
  cargarTabla()
}

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
                let newItem = listaPacientes.filter(item => item.id != turnoId) 
                listaPacientes = newItem; 
                cargarTabla();
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
      console.log(e.target.id)
      const turno = listaPacientes.find(turno => turno.id === e.target.id)
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
          <input class="form-control" role='button' type="text" id="motivoTurno" value="${turno.motivo}" readonly>
      </div>
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="nuevo-fechaTurno">Fecha Turno:</span>
          <input class="form-control" type="date" id="nuevo-fechaTurno" value="${turno.fecha}">
      </div>
      <div class="d-flex align-items-start gap-2 col-12 justify-content-between">
          <span class="input-group-text col-3" for="nuevo-horaTurno">Hora Turno:</span>
          <input class="form-control" type="time" id="nuevo-horaTurno" value="${turno.hora}">
      </div>
      `
  modalTitle.textContent = `Paciente: ${turno.paciente}`
  // funcion para guardar los cambios
  const guardarEdicion = document.getElementById('btn-guardar')
  const editarTurno = () => {
    cuerpoTabla.innerHTML = ''
    // cambiamos los datos originales por los agregados en el form de arriba
    turno.fecha = document.getElementById('nuevo-fechaTurno').value;
    turno.hora = document.getElementById('nuevo-horaTurno').value;
    // Mostrar nuevamente listado de productos
    localStorage.setItem('turnos', JSON.stringify(listaPacientes))
    cargarTabla()
    setTimeout(() => {
      location.reload()
    }, 1000);
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
    obtenerUserLogeado();
})

