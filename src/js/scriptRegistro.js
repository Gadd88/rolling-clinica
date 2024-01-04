document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registration-form');
  
    registrationForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      // Obtén el tipo de usuario seleccionado
      const userType = document.querySelector('input[name="userType"]:checked').value;
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
  
      // Crea un objeto de usuario
      const userData = {
        userType,
        name,
        email,
        password
      };
  
      // Guarda los datos en el almacenamiento local
      localStorage.setItem(userType, JSON.stringify(userData));
  
      // Redirige al usuario a su página correspondiente
      window.location.href = userType === 'doctor' ? 'doctor.html' : 'patient.html';
    });
  });