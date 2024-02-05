const inputNombre = document.getElementById("inputNombre");
const inputDni = document.getElementById("inputDni");
const inputMotivo = document.getElementById("inputMotivo");
const inputFecha = document.getElementById("inputFecha");
const inputHora = document.getElementById("inputHora");
const inputEspecialidad = document.getElementById("inputEspecialidad");
const btnAgendar = document.getElementById("btnAgendar");
const errorText = document.getElementById("errorText");

const consultaApi = async () => {
  const response = await fetch("http://localhost:3000/turnos");
  const result = await response.json();
  const data = result;
  localStorage.setItem("turnos", JSON.stringify(data));
};

let turnosPaciente = [];

const agregarTurno = () => {
  if (
    inputNombre.value == "" ||
    inputFecha.value == "" ||
    inputDni.value == "" ||
    inputMotivo.value == "" ||
    inputEspecialidad.value == "" ||
    inputHora.value == ""
  ) {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "Todos los campos deben rellenarse",
      showConfirmButton: false,
      timer: 1000,
    });
    return;
  }
  const turno = {
    id: crypto.randomUUID().slice(0, 4),
    paciente: inputNombre.value,
    paciente_dni: inputDni.value,
    especialidad: inputEspecialidad.value,
    motivo_consulta: inputMotivo.value,
    fechaTurno: inputFecha.value,
    horaTurno: inputHora.value,
  };
  turnosPaciente.push(turno);
  fetch("http://localhost:3000/turnos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(turno),
  });
  Swal.fire({
    position: "center",
    icon: "success",
    title: "Turno Agendado",
    showConfirmButton: false,
    timer: 1000,
  });
  localStorage.setItem("turnosPaciente", JSON.stringify(turnosPaciente));
};

btnAgendar.addEventListener("click", (e) => {
  e.preventDefault();
  agregarTurno();
  mostrarTurnos();
});

const mostrarTurnos = () => {
  const promesaDatos = new Promise((resolve) => {
    resolve(consultaApi());
  });
  promesaDatos.then(() => {
    let turnosAgendados = JSON.parse(localStorage.getItem("turnos"));
    let pacienteData = JSON.parse(sessionStorage.getItem("usuario"));
    let turnosPaciente = turnosAgendados.filter(
      (turno) =>
        turno.paciente_dni ==
        (pacienteData.length > 0
          ? pacienteData[0].paciente_dni
          : pacienteData.paciente_dni)
    );
    const listaTurnos = document.getElementById("listaTurnos");
    listaTurnos.innerHTML = "";
    if (turnosPaciente.length < 1)
      return (listaTurnos.innerHTML = "<p>No hay turnos agendados</p>");
    turnosPaciente.forEach((turno) => {
      const { especialidad, fechaTurno, horaTurno, id } = turno;
      listaTurnos.innerHTML += `<li class="card" id=${id}>
                <div class="card-body card-body-turnos">
                    <p class="card-title">Turno ID: <strong>${id}</strong> </p>
                    <p class="card-title">Especialidad: ${especialidad}</p>
                    <p class="card-text text-body-secondary">Fecha: ${new Date(
                      fechaTurno
                    ).toLocaleDateString(
                      "es"
                    )} | Hora: ${horaTurno.toLocaleString()} </p>
                    <button class="btn btn-outline-danger eliminarTurno">Eliminar</button>
                </div>
            </li>`;
      const btnEliminar = document.querySelectorAll(".eliminarTurno");
      if (btnEliminar) {
        btnEliminar.forEach((btnEliminar) =>
          btnEliminar.addEventListener("click", () => {
            fetch(`http://localhost:3000/turnos/${id}`, {
              method: "DELETE",
            }).then(() => {
              mostrarTurnos();
            });
          })
        );
      }
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  mostrarTurnos();
});
