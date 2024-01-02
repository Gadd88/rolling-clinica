import listaPacientes from './pacientes.json' assert { type: 'json' }
const inputNombre = document.getElementById('inputNombre')
const inputDni = document.getElementById('inputDni')
const inputEspecialidad = document.getElementById('inputEspecialidad')
const inputSintomas = document.getElementById('inputSintomas')
const inputFecha = document.getElementById('inputFecha')
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
let turnos = []

const resetInputs = () => {
    inputNombre.value = '';
    inputDni.value = '';
    inputEspecialidad.value = '';
    inputFecha.value = '';
    inputSintomas.value = '';
}
const agregarStorage = () => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
}
const agregarTurno = () => {
    if(inputNombre.value == '' || inputFecha.value == '' || inputDni.value == '' || inputSintomas.value == '' || inputEspecialidad.value == ''){
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
        sintomas: inputSintomas.value,
        fecha: inputFecha.value
    }
    turnos.push(turno)
}

btnAgendar.addEventListener('click', (e) => {
    e.preventDefault()
    agregarTurno()
    resetInputs()
    agregarStorage()
    mostrarTurnos()
    console.log(turnos)
})

const mostrarTurnos = () => {
    const listaTurnos = document.getElementById('listaTurnos')
    listaTurnos.innerHTML = ''
    if(turnos.length<1) return listaTurnos.innerHTML = '<h3>No hay turnos agendados</h3>' 
    turnos.forEach(turno => {
        const { paciente, especialidad, fecha, id } = turno
        listaTurnos.innerHTML +=
        `<li class="card" style="width: 18rem;" id=${id}>
            <div class="card-body">
                <h5 class="card-title">${especialidad}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Fecha: ${fecha.toLocaleString()} </h6>
                <p class="card-text"> ${paciente} </p>
                <button class="btn btn-outline-danger eliminarTurno">Eliminar</button>
            </div>
        </li>`
    })
}

listaTurnos.addEventListener('click', (e) => {
    if(e.target.classList.contains('eliminarTurno') || e.target.parentElement.classList.contains('eliminarTurno')){
        const turnoId = e.target.closest('li').id
        console.log(turnoId)
        let newTurnos = turnos.filter(turno => turno.id != turnoId)
        turnos = newTurnos
        agregarStorage()
        mostrarTurnos()
    }
})