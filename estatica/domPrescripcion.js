let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let divRecetado=document.getElementById("divRecetado");
//let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
let divPacientes=document.getElementById('divPacientes');
let selectSexo=document.getElementById("selectSexo");
let diagnostico=document.getElementById('diagnostico');
let pacientes=[];
let profecional = document.getElementById('app').dataset.profesional;
let paciente={};//para la prescripcion
let obraSocialSelec=document.getElementById('obraSP');
let planSelec=document.getElementById('plan');
let divMedicamentoPrestacion=document.getElementById('divMedicamentoPrestacion');
let marca=document.getElementById('marcaMedicamento')
const selectElement = document.getElementById('tipo');
let inputAdministracion = document.getElementById('administracion_medicamento');
let inputDuracion=document.getElementById('duracion_administracion');
let formularioPrescripcion=document.getElementById('formularioPrescripcion');
let fechaActualInput = document.getElementById('fechaActual');
let divPrescripcionesA=document.getElementById('divPrescripcionesA');
let divFinal=document.getElementById('divFinal');
let fechaActual=fechaActualInput.value;
let idProfecional=document.getElementById('id_profecional');
let fechaVInput=document.getElementById('fechaV');
let divMedPres=document.getElementById('divMedPres');
let divMedPres1=document.getElementById('divMedPres1');
let divPrescripcionNumero=document.getElementById('divPrescripcionNumero');
let obraSocialPlan;//para la prescripcion
let obrass;
let sexo;
let prescripcion={};
let medicamento={};
let medicamentosPrescripcion=[];//para la prescripcion
let administracion={};
let duracionAdministracion={};
let administraciones;
let medicamentoCompleto={};//para guardar en medicamentos
pagina="Prescripcion";
let inputSexoP=document.getElementById('sexoP');
let genericos;
let prestacionesPrescripcion=[];//para la prscripcion
let prestacion={};
let prestacionesTodas;
let lados;
let lado={};  
let bandera;  
  
function convertirFechaISOaFechaLocal(fechaISO,date) {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade ceros a la izquierda
    const day = ('0' + fecha.getDate()).slice(-2); // Añade ceros a la izquierda
    if(date){return `${day}/${month}/${year}`;}else{return `${year}-${month}-${day}`}
}
  
selectTipo.addEventListener("change", function() {
        fOcultar();
        limpiarCampos(limpiarM);
        limpiarCampos(limpiarPr);
         if(selectTipo.value==="prestacion"){
            divPrestacion.style.display="block";
            divMedPres1.style.display="block";
         }else if(selectTipo.value==="medicamento"){
            divMedicamento.style.display="block";
            divMedPres.style.display="block";
         }
    });
// Bloquear todos los elementos dentro del div #divPaciente
function bloquearDiv(bloquear) {
    let input = bloquear.querySelectorAll('input, select');
    input.forEach(element => {
        element.disabled = true;
    });
}
formularioPrescripcion.addEventListener('submit',async  function(event) {
    event.preventDefault(); // Previene el envío del formulario
    bandera=true;
    prescripcion.idProfecional=parseInt(idProfecional.value);
    prescripcion.fechaA=fechaActual;
    prescripcion.idPaciente=paciente.idPaciente;
    prescripcion.idPlanObraSocial=paciente.idPlanObraSocial;
    prescripcion.diagnostico=diagnostico.value;
    prescripcion.medicamentos=medicamentosPrescripcion;
    prescripcion.prestaciones=prestacionesPrescripcion;
    prescripcion.fechaVC=fechaVInput.value;
    if(!validar(!prescripcion.idProfecional,pagina,'La prescripcion necesita un profecional')){bandera=false}
    if(!validar(!prescripcion.fechaA,pagina,'La prescripcion nesecita la fecha actual')){bandera=false}
    if(!validar(!prescripcion.idPaciente,pagina,'La Prescripcion deve tener un Paciente')){bandera=false}
    if(!validar(!prescripcion.idPlanObraSocial,pagina,'La Prescripcion deve tener una obra social con su plan')){bandera=false}
    if(!validar(!prescripcion.diagnostico,pagina,'La Prescripcion deve tener un diagnostico')){bandera=false}
    if(!validar(!prescripcion.fechaVC,pagina,'La Prescripcion deve tener una fecha de vencimiento')){bandera=false}
    if(!validar(prescripcion.prestaciones.length<1&&prescripcion.medicamentos.length<1,pagina,'La Prescripcion debe tene al menos un medicamento o una prestacion')){bandera=false}
    if(bandera){
        aux=await fechProtegidoPost('/generarPrescripcion',prescripcion);
        //console.log(aux);
        if(aux.success){
            divFinal.style.display='block';
             prestacionesPrescripcion=[];
            medicamentosPrescripcion=[];
            let h5=document.createElement('h5');
            h5.textContent=`Prescripcion Electronica numero : ${aux.prescripcionNumero}`;  
            divPrescripcionNumero.appendChild(h5);
        }
    }
   
  });

 
  
  
  
 