import listaPacientes from './pacientes.json' assert { type: 'json' }
const inputNombre = document.getElementById('inputNombre')
const inputDni = document.getElementById('inputDni')
const inputEspecialidad = document.getElementById('inputEspecialidad')
const inputMotivo = document.getElementById('inputMotivo')
const inputFecha = document.getElementById('inputFecha')
const inputHora = document.getElementById('inputHora')
const btnAgendar = document.getElementById('btnAgendar')
const formTurno = document.getElementById('formTurno')
const turnosStorage = JSON.parse(localStorage.getItem('turnos'))
const errorText = document.getElementById('errorText')

// window.addEventListener('DOMContentLoaded', () => {
//     localStorage.setItem('pacientes', JSON.stringify(listaPacientes))
// })

// let pacientesStorage = JSON.parse(localStorage.getItem('pacientes'))
// console.log(pacientesStorage)

// let pacientesCardio = pacientesStorage.filter(paciente => paciente.especialidad.toLowerCase() == 'cardiologia')
// console.log(pacientesCardio) 
let turnos = [
    {
        id: 'aaa1',
        paciente: "Juan",
        fecha: "2022-10-15",
        especialidad: 'clinica general',
        motivo: 'sueño excesivo',
        hora: "10:30"
    },
    {
        id: 'aaa2',
        paciente: "María",
        fecha: "2022-10-16",
        especialidad: "ginecologia",
        motivo: 'control natal',
        hora: '09:30',
    },
]

const resetInputs = () => {
    inputNombre.value = '';
    inputDni.value = '';
    inputEspecialidad.value = '';
    inputFecha.value = '';
    inputHora.value = '';
    inputMotivo.value = '';
}
const agregarStorage = () => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
}
const agregarTurno = () => {
    if(inputNombre.value == '' || inputFecha.value == '' || inputDni.value == '' || inputMotivo.value == '' || inputEspecialidad.value == '' || inputHora.value == ''){
        errorText.classList.add('p-3','rounded-3')
        errorText.textContent = 'No pueden quedar campos vacios'
        setTimeout(() => {
            errorText.textContent = ''
            errorText.classList.remove('p-3', 'rounded-3')
        }, 2000)
        return
    }
    const turno = {
        id: crypto.randomUUID().slice(0,4),
        paciente: inputNombre.value,
        paciente_dni: inputDni.value,
        especialidad: inputEspecialidad.value,
        motivo: inputMotivo.value,
        fecha: inputFecha.value,
        hora: inputHora.value,
    }
    turnos.push(turno)
}

btnAgendar.addEventListener('click', (e) => {
    e.preventDefault()
    agregarTurno()
    resetInputs()
    agregarStorage()
    mostrarTurnos()
})

const mostrarTurnos = () => {
    const listaTurnos = document.getElementById('listaTurnos')
    listaTurnos.innerHTML = ''
    if(turnos.length<1) return listaTurnos.innerHTML = '<h3>No hay turnos agendados</h3>' 
    turnos.forEach(turno => {
        const { paciente, especialidad, fecha, hora, id } = turno
        listaTurnos.innerHTML +=
        `<li class="card" style="width: 18rem;" id=${id}>
            <div class="card-body">
                <h4 class="card-title">${especialidad}</h4>
                <h5 class="card-subtitle mb-2 text-body-secondary">Fecha: ${fecha.toLocaleString()} </h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Hora: ${hora.toLocaleString()} </h6>
                <p class="card-text"> ${paciente} </p>
                <button class="btn btn-outline-danger eliminarTurno">Eliminar</button>
            </div>
        </li>`
    })
}

listaTurnos.addEventListener('click', (e) => {
    if(e.target.classList.contains('eliminarTurno') || e.target.parentElement.classList.contains('eliminarTurno')){
        const turnoId = e.target.closest('li').id
        let newTurnos = turnos.filter(turno => turno.id != turnoId)
        turnos = newTurnos
        agregarStorage()
        mostrarTurnos()
    }
})

document.addEventListener('DOMContentLoaded', () => {
    localStorage.setItem('turnos', JSON.stringify(turnos))
    const turnosStorage = JSON.parse(localStorage.getItem('turnos'))
    if(!turnosStorage || turnosStorage.length < 1 || turnosStorage == null || turnosStorage == undefined){
        turnos = []
    } else {
        turnos = turnosStorage
    }
    mostrarTurnos()
})