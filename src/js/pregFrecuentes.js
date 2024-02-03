//VARIABLES Y CONSTANTES
const modalLogin = document.getElementById('modal-login');
const btnLogin = document.querySelectorAll('.btn-login');
const btnCloseLogin = document.getElementById('btn-close-login');
const formLogin = document.getElementById('form-login');
const btnLoginIngresar = document.getElementById('btn-login-ingresar');
const btnRegLogSection = document.querySelectorAll('.btn-reg-log');
const usuarioSession = JSON.parse(sessionStorage.getItem('usuario'))

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

// const revisarLogin = () => {
//     const logged = JSON.parse(sessionStorage.getItem('usuario'))
//     if(!logged) return
//     console.log(logged)
// }
// if(userLogged == true){
//     revisarLogin()
// }

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
        // btnRegLogSection.forEach(section => section.innerHTML = `
        // <h4 class="text-dark">Bienvenido ${usuarioLoggeado.usuario}</h4>
        // <div id="btn-salir" class="btn btn-salir btn-danger p-1">
        // </div>
        // `)
        // const btnSalir = document.querySelectorAll('.btn-salir');
        // btnSalir.forEach(btnSalir => btnSalir.addEventListener('click', () =>{
        //     userLogged = false
        //     setTimeout(() => {location.assign('../../index.html')},500)
        // }))
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
    // if(JSON.stringify(usuarioLoggeado) === JSON.stringify(paciente)){
    //     alert(`Bienvenido ${paciente.usuario}`)
    //     btnRegLogSection.forEach(section => section.innerHTML = `
    //     <h4 class="text-dark">Bienvenido ${usuarioLoggeado.usuario}</h4>
    //     <div id="btn-salir" class="btn btn-salir btn-danger p-1">
    //     </div>
    //     `)
    //     const btnSalir = document.querySelectorAll('.btn-salir');
    //     btnSalir.forEach(btnSalir => btnSalir.addEventListener('click', () =>{
    //         userLogged = false
    //         setTimeout(() => {location.assign('../../index.html')},500)
    //     }))
    // }else if(JSON.stringify(usuarioLoggeado) === JSON.stringify(doctor)){
    //     userLogged = true
    //     alert('Bienvenido Doctor')
    //     setTimeout(() => {
    //         location.assign('../../index.html')
    //     },500)
    //     sessionStorage.setItem('usuario', JSON.stringify(usuarioLoggeado))
    // }else if(JSON.stringify(usuarioLoggeado) === JSON.stringify(admin)){
    //     userLogged = true
    //     alert('Bienvenido Administrador')
    //     setTimeout(() => {
    //        location.assign('../../src/paginas/admin.html') 
    //     }, 500);
    //     sessionStorage.setItem('usuario', JSON.stringify(usuarioLoggeado))
    // }else{
    //     alert('Usuario o password incorrectos, intente de nuevo')
    //     return
    // }
});


//PRUEBA//

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})