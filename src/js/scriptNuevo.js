import listaPacientes from '../prueba/turnosPrueba.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');

// En esta seccion esta la funcion para cargar los turnos de la pagina que vienen de PACIENTES a una tabla. 

const cargarTabla = () => {
    listaPacientes.forEach((item) => {
    const fila = document.createElement('tr');
    const celdas = `
      <th>${item.ID}</th>
      <td>${item.nombrePaciente}</td>
      <td>${item.fechaHora}</td>
      <td> <div class="d-flex gap-2">
      <button class="btn btn-outline-warning"><i class="fa-solid fa-pen-to-square"></i></button>
      <button class="btn btn-outline-danger borrar"><i class="fa-solid fa-trash"></i></button>
      </div></td>
    `;
    fila.innerHTML = celdas;
    cuerpoTabla.appendChild(fila); 
  });
};

cargarTabla();

// En esta seccion esta la funcion para el boton eliminar cada turno seleccionado. 

// const borrarTurno = (ID)=> {
//     let index=listaPacientes.findIndex((item)=>. ID==ID)
//     let validar= confirm('Estas seguro que quieres eliminar este turno?')
//     if(validar){
//         listaPacientes.splice(index,1)
//     }
// }

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

//Aca tengo que agregar la logica para eliminar del localstorage


        } else if (result.isDenied) {
          Swal.fire('No eliminaste este turno!', '', 'info')
        }
      })

};
  
  document.querySelectorAll('.borrar').forEach(botonBorrar => {
    botonBorrar.addEventListener('click', borrarTurno);
  });