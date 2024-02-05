const formConsultas = document.getElementById('formConsultas')
const guardarConsulta = (event) => {
  event.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('mail').value;
  const consulta = document.getElementById('consulta').value;

  
  if(nombre.trim() === '' || telefono.trim() === '' || email.trim() === '' || consulta.trim() === ''){
      Swal.fire({
        icon: "error",
        title: "Atención",
        text: "Todos los campos del formulario son obligatorios",
        timer: 1500
      }); 
    return
  }
  
  const nuevaConsulta = {
    nombre,
    telefono,
    email,
    consulta
  };
  
  const consultasGuardadas = JSON.parse(localStorage.getItem('consultas')) || [];
  
  consultasGuardadas.push(nuevaConsulta);
  
  localStorage.setItem('consultas', JSON.stringify(consultasGuardadas));
  
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

formConsultas.addEventListener('submit', guardarConsulta);