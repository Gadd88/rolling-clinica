


// const inputTurno = document.querySelector("idPaciente");
// inputTurno.addEventListener('keypress',(event)=>{
//     if(event.keyCode == 13){
//         pacientes.push(inputTurno.value);
//         inputTurno.value ='';
//         llenaTabla();
//     }
// });


const idPaciente = document.getElementById('inputNombre').value;
const nombre = document.getElementById('inputNombre').value;
const fechaHora = document.getElementById('inputNombre').value;

import listaPacientes from '../prueba/turnosPrueba.json' assert {type: 'json'};

window.addEventListener('DOMContentLoaded', ()=>{
    localStorage.setItem('pacientes',JSON.stringify(listaPacientes))
})


function leerData(){
        let listaPacientes;

        if (localStorage.getItem('listaPacientes')== null){
            listaPacientes = [];
        } else {
            listaPacientes = JSON.parse(localStorage.getItem('listaPacientes'))
        }

        let cuerpo = "";

        listaPacientes.forEach(paciente,index => {
            
            cuerpo += "<tr>"
            cuerpo += "<td>"+listaPacientes.ID+"</td>";
            cuerpo += "<td>"+listaPacientes.nombre+"</td>";
            cuerpo += "<td>"+listaPacientes.fechaHora+"</td>";
            cuerpo += '<td><button onclick="deleteData('+ index +')" class="btn btn-danger">Eliminar</button></td>';
            cuerpo += "</tr>"
            
        });

        document.querySelector('#tablaTurnos').innerHTML = cuerpo;
    }

    function agregarPaciente (){
       leerData();
       listaPacientes.push([
        ID = ID,
        nombre = nombre,
        fechaHora = fechaHora
       ]);

       localStorage.setItem('listaPacientes', JSON.stringify(listaPacientes))

       document.getElementById('ID').value="";
       document.getElementById('nombre').value="";
       document.getElementById('fechaHora').value="";
    }




// let pacientes = storage.obtener('pacientes');
// llenaTabla();


// function llenaTabla(){
//     let cuerpo ="";
//     for( var i = 0; i < pacientes.length ; i++){
//         let btnEliminar='<button data-indice="'+i+'" class="btn btn-danger btnEl">Eliminar</button>';
//         cuerpo += "<tr><td>"+listaPacientes.idPaciente+"</td><td>"+listaPacientes.nombrePaciente+"</td><td>"+listaPacientes.fechaHora+"</td><td>"+btnEliminar+"</td></tr>";
//     }
//     document.querySelector("#datos").innerHTML = cuerpo;
// };

// function btnEliminar(){
//     document.querySelectorAll(".btnEl");
//     btnEliminar.forEach(elem => elem.addEventListener('click',event =>{
//         let indice = event.target.getAttribute('data-indice');
//         eliminar(indice);
//     }));
// }

// function eliminar(indice){
//     pacientes.splice(indice,1);
//     llenaTabla();
// }