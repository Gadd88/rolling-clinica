
let pacientes = [];

const inputTurno = document.querySelector("idPaciente");
inputTurno.addEventListener('keypress',(event)=>{
    if(event.keyCode == 13){
        pacientes.push(inputTurno.value);
        inputTurno.value ='';
        llenaTabla();
    }
});

function llenaTabla(){
    let body ="";
    for( var i = 0; i < pacientes.length ; i++){
        let btnEliminar='<button data-indice="'+i+'" class="btn btn-danger btnEl">Eliminar</button>';
        body += "<tr><td>"+(i+1)+"</td><td>"+pacientes[i]+"</td><td>"+pacientes.fecha[i]+"</td><td>"+btnEliminar+"</td></tr>";
    }
    document.querySelector("#datos").innerHTML = body;
};

function btnEliminar(){
    document.querySelectorAll(".btnEl");
    btnEliminar.forEach(elem => elem.addEventListener('click',event =>{
        let indice = event.target.getAttribute('data-indice');
        eliminar(indice);
    }));
}

function eliminar(indice){
    pacientes.splice(indice,1);
    llenaTabla();
}