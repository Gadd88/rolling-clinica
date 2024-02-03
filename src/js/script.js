//VARIABLES Y CONSTANTES
const modalLogin = document.getElementById('modal-login');
const btnLogin = document.querySelectorAll('.btn-login');
const btnCloseLogin = document.getElementById('btn-close-login');
const formLogin = document.getElementById('form-login');
const btnLoginIngresar = document.getElementById('btn-login-ingresar');
const btnRegLogSection = document.querySelectorAll('.btn-reg-log');
const usuarioSession = JSON.parse(sessionStorage.getItem('usuario'))
const btnTurnos = document.querySelector('.btn-turnos');

let userLogged = false;
const paciente = {
    usuario: 'paciente',
    password: 'paciente',
}
const doctor = {
    usuario: 'doctor',
    password: 'doctor',
}
const admin = {
    usuario: 'admin',
    password: 'admin',
}
//FUNCIONES
btnLogin.forEach(boton => {
    boton.addEventListener('click', () => {
        modalLogin.showModal();
})})
btnCloseLogin.addEventListener('click', () =>{
    modalLogin.close();
})

if(btnTurnos){
    btnTurnos.addEventListener('click', () => {
        if(userLogged = true){
            if(usuarioSession.usuario == 'paciente'){
                location.assign('./src/paginas/solicitarTurno.html')
            }
        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Debe estar logueado para acceder",
                showConfirmButton: false,
                timer: 1000
            })
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    if(usuarioSession != null || usuarioSession != undefined){
        btnRegLogSection.forEach(section => section.innerHTML = `
            <h4 class="text-dark">Bienvenido ${usuarioSession.usuario}</h4>
            <div id="btn-salir" class="btn btn-salir btn-danger p-1">
            </div>
        `)
        const btnSalir = document.querySelectorAll('.btn-salir');
        btnSalir.forEach(btnSalir => btnSalir.addEventListener('click', () =>{
            userLogged = false
            sessionStorage.clear()
            setTimeout(() => {location.assign('../../index.html')},500)
        }))
    }
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
    if(JSON.stringify(usuarioLoggeado) === JSON.stringify(paciente) || JSON.stringify(usuarioLoggeado) === JSON.stringify(doctor) || JSON.stringify(usuarioLoggeado) === JSON.stringify(admin)){
        userLogged = true
        sessionStorage.setItem('usuario', JSON.stringify(usuarioLoggeado))
        Swal.fire({
            icon: "success",
            title: "Bienvenido",
            text: `${usuarioLoggeado.usuario}`,
            timer: 1500
        })
    }
    if(userLogged == true){
        if(usuarioLoggeado.usuario == 'admin'){
            setTimeout(() => {
                location.assign('../../src/paginas/admin.html')
            },1000)
            return
        }else if(usuarioLoggeado.usuario == 'doctor'){
            setTimeout(() => {
                location.assign('../../src/paginas/medicos.html')
            }, 1000)
            return
        }else{
            location.reload()
            return
        }
    }
});