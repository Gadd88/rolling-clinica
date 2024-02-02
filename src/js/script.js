const inputNombre = document.getElementById('inputNombre')
const inputDni = document.getElementById('inputDni')
const inputMotivo = document.getElementById('inputMotivo')
const inputFecha = document.getElementById('inputFecha')
const inputHora = document.getElementById('inputHora')
const btnAgendar = document.getElementById('btnAgendar')

//const inputs = document.querySelectorAll("input");

//for (const input of inputs) {
//  const valor = input.value;
//  if (valor !== "") {
//    localStorage.setItem(input.id, valor);
//  }
//}

const limpiar = () => {
    inputNombre.value = '';
    inputDni.value = '';
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
    limpiar()
    agregarStorage()
    mostrarTurnos()
})

const mostrarTurnos = () => {
    consultaApi()
    let turnos = JSON.parse(localStorage.getItem('turnos'))
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
