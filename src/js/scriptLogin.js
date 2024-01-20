//VARIABLES Y CONSTANTES
const modalLogin = document.getElementById('modal-login');
const btnCloseLogin = document.getElementById('btn-close-login');
const formLogin = document.getElementById('form-login');
const btnLoginIngresar = document.getElementById('btn-login-ingresar');
const btnRegLogSection = document.querySelectorAll('.btn-reg-log');
const btnLogin = document.querySelectorAll('.btn-login')

const paciente = {
    usuario: 'paciente',
    password: 'paciente',
}
const doctor = {
    usuario: 'doctor',
    password: 'doctor',
}
//FUNCIONES
btnLogin.forEach(btn => {
    //tenemos 2 botones login, 1 en vista desktop y otro en vista mobile. Aplico forEach para dar funcionalidad a ambos botones
    btn.addEventListener('click', () =>{
        modalLogin.showModal();
    })
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
        btnRegLogSection.forEach(regLogSection => {
            regLogSection.innerHTML = `
            <h4 class="">Bienvenido ${usuarioLoggeado.usuario}</h4>
            <div class="btn btn-danger p-1 btn-salir">
            
            </div>
            `
            const btnSalir = document.querySelectorAll('.btn-salir');
            btnSalir.forEach(btnSalir => {
                btnSalir.addEventListener('click', () =>{
                location.reload();
                })
            })
        })
    }else{
        return
    }
    modalLogin.close()
})