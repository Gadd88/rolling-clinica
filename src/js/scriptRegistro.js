document.addEventListener('DOMContentLoaded', function() {
  const formularioRegistro = document.getElementById('registration-form');

  formularioRegistro.addEventListener('submit', function(evento) {
    evento.preventDefault();

    // Validacion de contraseñas
    const contraseña = document.getElementById('password').value;
    const confirmarContraseña = document.getElementById('confirm-password').value;
    if (contraseña !== confirmarContraseña) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Los datos del formulario
    const nombreCompleto = document.getElementById('full-name').value;
    const correoElectronico = document.getElementById('email').value;
    const dni = document.getElementById('dni').value;
    const tipoUsuario = document.querySelector('input[name="userType"]:checked').value;
    const domicilio = document.getElementById('address').value;
    const codigoPostal = document.getElementById('postal-code').value;
    const telefono = document.getElementById('phone').value;

    // Crea un objeto de usuario
    const datosUsuario = {
      nombreCompleto,
      correoElectronico,
      dni,
      tipoUsuario,
      contraseña,
      domicilio,
      codigoPostal,
      telefono
    };

    // Guarda los datos en el almacenamiento local
    localStorage.setItem(tipoUsuario + dni, JSON.stringify(datosUsuario));

    // Redireccion de la pagina
    window.location.href = tipoUsuario === 'medico' ? 'medico.html' : 'paciente.html';
  });

  // boton reset
  botonReset.addEventListener('click', function(evento) {
    const confirmacion = confirm('¿Estás seguro de que deseas limpiar el formulario?');
    if (!confirmacion) {
      evento.preventDefault();
    }
  });
});