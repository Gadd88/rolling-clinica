const turnosStorage = JSON.parse(localStorage.getItem('turnos'))

const mostrarTurnos = () => {
    const listaTurnosDoctor = document.getElementById('listaTurnosDoctor');
    listaTurnosDoctor.innerHTML = ''
    if(turnosStorage.length<1 || turnosStorage == null) return listaTurnosDoctor.innerHTML = '<h3>No hay turnos agendados</h3>' 
    turnosStorage.forEach(turno => {
        const { paciente, sintomas, fecha, id } = turno
        listaTurnosDoctor.innerHTML +=
        `<li class="card" style="width: 18rem;" id=${id}>
            <div class="card-body">
                <h5 class="card-title">${paciente}</h5>
                <h6 class="card-subtitle mb-2 text-body-secondary">Fecha: ${fecha.toLocaleString()} </h6>
                <p class="card-text"> ${sintomas} </p>
                <div class="card-footer d-flex align-items-center justify-content-between mt-4">
                    <button class="btn btn-outline-danger eliminarTurno">Eliminar</button>
                    <button class="btn btn-outline-info editarTurno">Editar</button>
                </div>
                
            </div>
        </li>`
    })
}

document.addEventListener('DOMContentLoaded', () => {
    mostrarTurnos();
})