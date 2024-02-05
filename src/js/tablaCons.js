const mostrarDatosLocalStorage = () => {
    const tablaCuerpo = document.getElementById('tablaConsultasBody');
    tablaCuerpo.innerHTML = ''; // Limpiar el contenido actual de la tabla
  
    const consultasGuardadas = JSON.parse(localStorage.getItem('consultas')) || [];
  
    consultasGuardadas.forEach((consulta) => {
      const fila = tablaCuerpo.insertRow();
  
      Object.values(consulta).forEach((valor, index) => {
        if (index !== 4) {
          const celda = fila.insertCell();
  
          if (index === 3) {
            // Botón para mostrar la consulta en SweetAlert
            const btnMostrarConsulta = document.createElement('button');
            btnMostrarConsulta.className = 'btn btn-primary btn-sm';
            const iconoMostrarConsulta = document.createElement('img');
            iconoMostrarConsulta.src = "../iconos/eye.svg";
            iconoMostrarConsulta.style.filter = 'brightness(0) invert(1)';
            btnMostrarConsulta.addEventListener('click', () => mostrarConsultaSweetAlert(consulta));
  
            // Agregar el ícono al botón
            btnMostrarConsulta.appendChild(iconoMostrarConsulta);
  
            // Insertar el botón en la celda
            celda.appendChild(btnMostrarConsulta);
          } else {
            celda.textContent = valor;
          }
        }
      });
    });
  };
  
  const mostrarConsultaSweetAlert = (consulta) => {
    document.body.style.overflow = 'hidden'; // Desactivar el desplazamiento del cuerpo
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
        responderConsultaSweetAlert();
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        eliminarConsultaSweetAlert(consulta);
      }
    });
  };
  
  const responderConsultaSweetAlert = () => {
    Swal.fire({
      title: "Responder la consulta",
      input: 'textarea',
      inputAttributes: { autocapitalize: 'off' },
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
          position: "center",
          icon: "success",
          title: "La respuesta ha sido enviada",
          showConfirmButton: false,
          timer: 1500
        });
        document.body.style.overflow = 'auto'; // Volver a habilitar el desplazamiento del cuerpo
      }
    });
  };
  
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
        Swal.fire({
          position: "center",
          icon: "success",
          title: "La consulta ha sido eliminada",
          showConfirmButton: false,
          timer: 1500
        });
        document.body.style.overflow = 'auto'; // Volver a habilitar el desplazamiento del cuerpo
        mostrarDatosLocalStorage()
      }
    });
  };
  
  const borrarConsulta = (consulta) => {
    const consultasGuardadas = JSON.parse(localStorage.getItem('consultas')) || [];
    const indice = consultasGuardadas.findIndex((c) => (
      c.nombre === consulta.nombre && c.telefono === consulta.telefono &&
      c.mail === consulta.mail && c.consulta === consulta.consulta
    ));
  
   
    if(indice >= 0 && indice < consultasGuardadas.length) {
      // Borrar la consulta del array
      consultasGuardadas.splice(indice, 1);
      // Guardar el array actualizado en localStorage
      localStorage.setItem('consultas', JSON.stringify(consultasGuardadas));
      Swal.fire({
        position: "center",
        icon: "success",
        title: "La consulta fue eliminada",
        showConfirmButton: false,
        timer: 1000
      })
    }else{
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Índice no válido",
        showConfirmButton: false,
        timer: 1000
      });
    }
  };
  
  // Llamada inicial para mostrar los datos almacenados al cargar la página
  mostrarDatosLocalStorage();