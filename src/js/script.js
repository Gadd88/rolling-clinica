//VARIABLES Y CONSTANTES
const modalLogin = document.getElementById('modal-login');
const btnLogin = document.getElementById('btn-login');
const btnCloseLogin = document.getElementById('btn-close-login');
const formLogin = document.getElementById('form-login');
const btnLoginIngresar = document.getElementById('btn-login-ingresar');
const btnRegLogSection = document.getElementById('btn-reg-log');

const paciente = {
    usuario: 'paciente',
    password: 'paciente',
}
const doctor = {
    usuario: 'doctor',
    password: 'doctor',
}
//FUNCIONES
btnLogin.addEventListener('click', () =>{
    console.log('click')
    modalLogin.showModal();
})

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
    //podemos comparar pasando los objetos a string con JSON.stringify o con lodash usando _.isEqual(usuarioLoggeado, paciente)
    if(JSON.stringify(usuarioLoggeado) === JSON.stringify(paciente) || JSON.stringify(usuarioLoggeado) === JSON.stringify(doctor)){
        btnRegLogSection.innerHTML = `
        <h4 class="text-light">Bienvenido ${usuarioLoggeado.usuario}</h4>
        <div id="btn-salir" class="btn btn-danger p-1">
            <img src="../iconos/logout.svg" alt="logout">
        </div>
        `
        const btnSalir = document.getElementById('btn-salir');
        btnSalir.addEventListener('click', () =>{
           location.reload();
        })
    }else{
        return
    }
    modalLogin.close()

});