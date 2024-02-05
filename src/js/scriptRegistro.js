
  const formularioRegistro = document.getElementById('registration-form');
  // Los datos del formulario
  // let password = document.getElementById('form-password');
  // let confirmarPassword = document.getElementById('confirm-password');
  // let nombreCompleto = document.getElementById('full-name');
  // let correoElectronico = document.getElementById('email');
  // let dni = document.getElementById('dni');
  // let domicilio = document.getElementById('address');
  // let codigoPostal = document.getElementById('postal-code');
  // let telefono = document.getElementById('phone');
  const btnSubmit = document.getElementById('btn-submit')
  let listaUsuarios = []
  
  formularioRegistro.addEventListener('submit', function(evento){
    evento.preventDefault();
    const formData = new FormData(formularioRegistro, btnSubmit);
    const tipoUsuario = document.querySelector('input[name="userType"]:checked');
    const nombre = formData.get('full-name')
    const email = formData.get('email')
    const pass = formData.get('form-password')
    const confirmPass = formData.get('confirm-password')
    const dni = formData.get('dni')
    const domicilio = formData.get('address')
    const codPostal = formData.get('cod-postal')
    const telefono = formData.get('telefono')
    if(nombre.length<0 || email.length<0 || dni.length<0 || tipoUsuario.length<0 || domicilio.length<0 || codPostal.length<0 || telefono.length<0 || pass.length<0 || confirmPass.length<0){
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Todos los campos son requeridos',
        timer: 1000,
        showConfirmButton: false
      })
      return
    }else if(pass !== confirmPass){
      Swal.fire({
        position: 'center',
        title: 'Las contraseñas deben coincidir',
        timer: 1000,
        showConfirmButton: false,
        icon: 'error'
      })
      return
    } 
    // Crea un objeto de usuario
    const datosUsuario = {
      usuario: nombre,
      paciente_dni: dni,
      password: pass
    };
    listaUsuarios.push(datosUsuario);
    // Guarda los datos en el almacenamiento local
    localStorage.setItem('usuariosRegistrados', JSON.stringify(listaUsuarios))
    sessionStorage.setItem('usuario', JSON.stringify(datosUsuario));
    // Redireccion de la pagina
    if(tipoUsuario == 'medico'){
      location.assign('../paginas/medicos.html')
    }else{
      location.assign('../../index.html');
      return
    }
  });

// boton reset
document.getElementById('btn-form-reset').addEventListener('click', function(evento) {
  evento.preventDefault();
  Swal.fire({
    icon: 'warning',
    title: 'Seguro que deseas reiniciar el formulario?',
    position: 'center',
    showConfirmButton: true,
    showCancelButton: true,
  }).then(result => {
    if(result.isConfirmed){
      nombreCompleto = ''
      dni = ''
      password = ''
      confirmarPassword = ''
      correoElectronico = ''
      tipoUsuario = ''
      domicilio = ''
      codigoPostal = ''
      telefono = ''
    }else{
      return
    }
  })
});