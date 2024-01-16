
//TRAE LOS DATOS DEL LOCALSTORAGE//

const mostrarDatosLocalStorage = () => {
const tablaCuerpo = document.getElementById('tablaConsultasBody');

  tablaCuerpo.innerHTML = ''; // Limpiar el contenido actual de la tabla //

  const consultasGuardadas = JSON.parse(localStorage.getItem('consultas')) || [];

  //Se agrega una fila a la tabla por cada consulta que ingresa //
  consultasGuardadas.forEach((consulta) => {
  const fila = tablaCuerpo.insertRow();

  Object.values(consulta).forEach((valor, index) => {
      const celda = fila.insertCell();

      if (index === 3) { 

        // Botón para mostrar la consulta en SweetAlert//

        const btnMostrarConsulta = document.createElement('button');
        btnMostrarConsulta.className = 'btn btn-primary btn-sm';
        const iconoMostrarConsulta = document.createElement('img');
        iconoMostrarConsulta.src = "../src/iconos/eye.svg";
        iconoMostrarConsulta.style.filter = 'brightness(0) invert(1)';
        btnMostrarConsulta.addEventListener('click', () => {
          mostrarConsultaSweetAlert(consulta);
        });
        btnMostrarConsulta.appendChild(iconoMostrarConsulta);

        // Insertar el botón en la celda
        celda.appendChild(btnMostrarConsulta);
      } else if (index !== 4) { 
        celda.textContent = valor;
      }
    });
  });
};

// Muestra una alerta de SweetAlert con el contenido de la consulta y opciones para responder o eliminar//
const mostrarConsultaSweetAlert = (consulta) => {
  Swal.fire({
    title: "Consulta del usuario",
    text: consulta.consulta,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Responder',
    cancelButtonText: 'Eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      responderConsultaSweetAlert(consulta);
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      eliminarConsultaSweetAlert(consulta);
    }
  });
};
 //Responder consulta //
const responderConsultaSweetAlert = (consulta) => {
  Swal.fire({
    title: "Responder la consulta",
    input: 'textarea',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: 'Enviar',
    cancelButtonText: 'Cancelar',
    showLoaderOnConfirm: true,
    preConfirm: (respuesta) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          if (respuesta && respuesta.trim() !== '') {
            resolve();
          } else {
            Swal.showValidationMessage('Debe ingresar una respuesta válida');
          }
        }, 100);
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "La respuesta ha sido enviada",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};

//Eliminar consulta //
const eliminarConsultaSweetAlert = (consulta) => {
  Swal.fire({
    title: '¿Estás seguro de eliminar la consulta?',
    text: "Esta acción no se puede deshacer",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar'
  }).then((result) => {
    if (result.isConfirmed) {
      borrarConsulta(consulta);
      mostrarDatosLocalStorage();
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "La consulta ha sido eliminada",
        showConfirmButton: false,
        timer: 1500
      });
    }
  });
};

//Obtiene las consultas almacenadas, se encuentra la consulta a eliminar y la elimina del array //
Actualiza el localStorage con la nueva lista de consultas
const borrarConsulta = (consulta) => {
  const consultasGuardadas = JSON.parse(localStorage.getItem('consultas')) || [];
  const indice = consultasGuardadas.findIndex((c) => c.nombre === consulta.nombre && c.telefono === consulta.telefono && c.mail === consulta.mail && c.consulta === consulta.consulta);
//Se actualiza el localStorage //
  if (indice !== -1) {
    consultasGuardadas.splice(indice, 1);
    localStorage.setItem('consultas', JSON.stringify(consultasGuardadas));
  }
};
mostrarDatosLocalStorage();
