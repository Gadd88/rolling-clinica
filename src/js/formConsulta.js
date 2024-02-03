// Función para guardar la consulta en la base de datos
const guardarConsulta = (event) => {
  event.preventDefault();

  // Obtener los valores del formulario
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const mail = document.getElementById('mail').value;
  const consulta = document.getElementById('consulta').value;

  // Verificar si algún campo está vacío
  if(nombre.trim() === '' || telefono.trim() === '' || mail.trim() === '' || consulta.trim() === ''){
      Swal.fire({
        icon: "error",
        title: "Atención",
        text: "Todos los campos del formulario son obligatorios",
        timer: 1500
      }); 
    return
  }

  // Crear un objeto con la información de la consulta
  const nuevaConsulta = {
    nombre,
    telefono,
    mail,
    consulta
  };

  // Obtener las consultas almacenadas en localStorage o inicializar un array vacío
  const consultasGuardadas = JSON.parse(localStorage.getItem('consultas')) || [];

  // Agregar la nueva consulta al array
  consultasGuardadas.push(nuevaConsulta);

  // Guardar el array actualizado en localStorage
  localStorage.setItem('consultas', JSON.stringify(consultasGuardadas));

  // Limpiar el formulario después de guardar la consulta
  document.getElementById('nombre').value = '';
  document.getElementById('telefono').value = '';
  document.getElementById('mail').value = '';
  document.getElementById('consulta').value = '';
  
  Swal.fire({
      position: "center",
      icon: "success",
      title: "La consulta fue enviada con éxito",
      showConfirmButton: false,
      timer: 1500
  });
};

// document.getElementById('form').addEventListener('submit', guardarConsulta);