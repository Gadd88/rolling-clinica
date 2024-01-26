//VARIABLES Y CONSTANTES
const modalLogin = document.getElementById('modal-login');
const btnLogin = document.querySelectorAll('.btn-login');
const btnCloseLogin = document.getElementById('btn-close-login');
const formLogin = document.getElementById('form-login');
const btnLoginIngresar = document.getElementById('btn-login-ingresar');
const btnRegLogSection = document.querySelectorAll('.btn-reg-log');
let userLogged = false;
const paciente = {
    usuario: 'paciente',
    password: 'paciente',
}
const doctor = {
    usuario: 'doctor',
    password: 'doctor',
}
//FUNCIONES
btnLogin.forEach(boton => {
    boton.addEventListener('click', () => {
        modalLogin.showModal();
})})
btnCloseLogin.addEventListener('click', () =>{
    modalLogin.close();
})

btnLoginIngresar.addEventListener('click', (e) =>{
    e.preventDefault();
    const form = new FormData(formLogin, btnLoginIngresar);
    const inputUsuario = form.get('usuario')
    const inputPassword = form.get('password')
    let usuarioLoggeado = {
        usuario: inputUsuario,
        password: inputPassword
    }
    modalLogin.close()
    //podemos comparar pasando los objetos a string con JSON.stringify o con lodash usando _.isEqual(usuarioLoggeado, paciente)
    if(JSON.stringify(usuarioLoggeado) === JSON.stringify(paciente)){
        userLogged = true
        alert(`Bienvenido ${paciente.usuario}`)
        btnRegLogSection.forEach(section => section.innerHTML = `
        <h4 class="text-dark">Bienvenido ${usuarioLoggeado.usuario}</h4>
        <div id="btn-salir" class="btn btn-salir btn-danger p-1">
        </div>
        `)
        const btnSalir = document.querySelectorAll('.btn-salir');
        btnSalir.forEach(btnSalir => btnSalir.addEventListener('click', () =>{
            userLogged = false
            setTimeout(() => {location.assign('../../index.html')},500)
        }))
    }else if(JSON.stringify(usuarioLoggeado) === JSON.stringify(doctor)){
        userLogged = true
        alert('Bienvenido Doctor')
        setTimeout(() => {location.assign('../../index.html')},500)
    }else{
        alert('Usuario o password incorrectos, intente de nuevo')
        return
    }
});