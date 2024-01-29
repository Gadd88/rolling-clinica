import listaPacientes from './pacientes.json' assert { type: 'json' }
const inputNombre = document.getElementById('inputNombre')
const inputDni = document.getElementById('inputDni')
const inputEspecialidad = document.getElementById('inputEspecialidad')
const inputMotivo = document.getElementById('inputMotivo')
const inputFecha = document.getElementById('inputFecha')
const inputHora = document.getElementById('inputHora')
const btnAgendar = document.getElementById('btnAgendar')
const formTurno = document.getElementById('formTurno')
const errorText = document.getElementById('errorText')

// window.addEventListener('DOMContentLoaded', () => {
//     localStorage.setItem('pacientes', JSON.stringify(listaPacientes))
// })

// let pacientesStorage = JSON.parse(localStorage.getItem('pacientes'))
// console.log(pacientesStorage)

// let pacientesCardio = pacientesStorage.filter(paciente => paciente.especialidad.toLowerCase() == 'cardiologia')
// console.log(pacientesCardio) 


const consultaApi = async () => {
    try {
        let data;
        const response = await fetch('http://localhost:3000/pacientes')
        const result = await response.json()
        data = result
        localStorage.setItem('turnos', JSON.stringify(data))
        return data
    } catch (error) {
        console.log(error.message)
    }
}

//AGREGAR UN TURNO
const resetInputs = () => {
    inputNombre.value = '';
    inputDni.value = '';
    inputEspecialidad.value = '';
    inputFecha.value = '';
    inputHora.value = '';
    inputMotivo.value = '';
}
//AGREGAR A STORAGE SI NO SE USA API
const agregarStorage = () => {
    localStorage.setItem('turnos', JSON.stringify(turnos));
}

//AGREGAR TURNO AL ARRAY
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
    // let fechaElegida = new Date(`${inputFecha.value}`)
    // let horariosDisponibles = []
    // for(let hora = 9; hora < 19; i++){
    //     hora.setMinutes(hora.getMinutes() + 30);
    //     console.log(fechaElegida.getHours() + ":" + ("00" + fechaElegida.getMinutes()).slice(-2));
    // }

    const turno = {
        id: crypto.randomUUID().slice(0,4),
        paciente: inputNombre.value,
        paciente_dni: inputDni.value,
        especialidad: inputEspecialidad.value,
        motivo_consulta: inputMotivo.value,
        fechaTurno: inputFecha.value,
        horaTurno: inputHora.value,
    }
    
    fetch('http://localhost:3000/pacientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(turno)
    })
}
btnAgendar.addEventListener('click', (e) => {
    e.preventDefault()
    agregarTurno()
    resetInputs()
    // agregarStorage()
    mostrarTurnos()
})

//MOSTRAR LOS TURNOS EN PANTALLA
const mostrarTurnos = () => {
    consultaApi()
    let turnos = JSON.parse(localStorage.getItem('turnos'))
    // OPCION DE FECHA SIN new DATE ${fechaTurno.split('-').reverse().join('/')}
    const listaTurnos = document.getElementById('listaTurnos')
    listaTurnos.innerHTML = ''
    if(turnos.length<1) return listaTurnos.innerHTML = '<h3>No hay turnos agendados</h3>' 
    turnos.forEach(turno => {
        const { paciente, especialidad, fechaTurno, horaTurno, id } = turno
        listaTurnos.innerHTML +=
        `<li class="card" style="width: 18rem;" id=${id}>
            <div class="card-body">
                <p class="card-text">Turno ID: <strong>${id}</strong> </p>
                <h4 class="card-text"> ${paciente} </h4>
                <p class="card-title">Especialidad: ${especialidad}</p>
                <h5 class="card-subtitle mb-2 text-body-secondary">Fecha: ${new Date(fechaTurno).toLocaleDateString('es-AR')} </h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Hora: ${horaTurno.toLocaleString()} </h6>
                <br/>
                <button class="btn btn-outline-danger eliminarTurno">Eliminar</button>
            </div>
        </li>`
    })
}

//ELIMINAR UN TURNO A TRAVES DE FILTRADO
listaTurnos.addEventListener('click', (e) => {
    if(e.target.classList.contains('eliminarTurno') || e.target.parentElement.classList.contains('eliminarTurno')){
        const turnoId = e.target.closest('li').id
        // let newTurnos = turnos.filter(turno => turno.id != turnoId)
        // turnos = newTurnos
        fetch(`http://localhost:3000/pacientes/${turnoId}`, {
            method: 'DELETE',
        })
        // agregarStorage()
    }
    mostrarTurnos()
})

document.addEventListener('DOMContentLoaded', () => {
    // localStorage.setItem('turnos', JSON.stringify(turnos))
    // const turnosStorage = JSON.parse(localStorage.getItem('turnos'))
    // if(!turnosStorage || turnosStorage.length < 1 || turnosStorage == null || turnosStorage == undefined){
    //     turnos = []
    // } else {
    //     turnos = turnosStorage
    // }
    mostrarTurnos()
})