import listaPacientes from '../prueba/turnosPrueba.json' assert { type: "json" };

const cuerpoTabla = document.querySelector('#tablaTurnos');

// En esta seccion esta la funcion para cargar los turnos de la pagina que vienen de PACIENTES a una tabla. 

const cargarTabla = () => {
    cargarTabla.innerHTML="";
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
console.log(listaPacientes)

// En esta seccion esta la funcion para el boton eliminar cada turno seleccionado. 

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

          listaPacientes.addEventListener('click', (e) => {
            if(e.target.classList.contains('borrar') || e.target.parentElement.classList.contains('borrar')){
                const turnoId = e.target.closest('tr').ID
                let newItem = listaPacientes.filter(item => item.ID != turnoId) 
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