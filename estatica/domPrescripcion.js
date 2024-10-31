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
let formularioPrescripcion=document.getElementById('formularioPrescripcion');
let fechaActualInput = document.getElementById('fechaActual');
let divPrescripcionesA=document.getElementById('divPrescripcionesA');

/*let fechaACompleta = new Date(fechaActualInput.value); // Capturando y convirtiendo a Date
let fechaActual = new Date(fechaACompleta.getFullYear(),fechaACompleta.getMonth()+1,fechaACompleta.getDate());
*/
//
let fechaActual=fechaActualInput.value;
let idProfecional=document.getElementById('id_profecional');
let fechaVInput=document.getElementById('fechaV');

//console.log(idProfecional.value)

let obraSocialPlan;//para la prescripcion
let obrass;
let sexo;
let prescripcion={};
let medicamento={};
let medicamentosPrescripcion=[];//para la prescripcion
let administracion={};
let administraciones;
let medicamentoCompleto={};//para guardar en medicamentos
pagina="Prescripcion";
inputSexoP=document.getElementById('sexoP');
let genericos;
let prestacionesPrescripcion=[];//para la prscripcion
let prestacion={};
let prestacionesTodas;
let lados;
let lado={};  
let bandera;  
   /*     async function fech2(input, endpoint) {
            try {
                console.log(`input en fech: ${input}`);
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                    body: JSON.stringify(input)
                    
                    
                });
        
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del fetch: ${response.status} ${response.statusText}`);
                }
        
                const text = await response.text();
                console.log('Raw response text:', text);
        
                if (!text) {
                    throw new Error('La respuesta del servidor está vacía');
                }
        
                let data;
                try {
                    data = JSON.parse(text);
                } catch (jsonError) {
                    throw new Error(`Error parseando JSON: ${jsonError.message}`);
                }
        
                console.log('Success cliente:', data); // Maneja la respuesta del servidor aquí
                return data;
            } catch (error) {
                console.error('Error en fech:', error.message); // Maneja los errores aquí
                throw error; // Re-lanzar el error para que pueda ser capturado en el bloque catch
            }
        }  */
            
 
function convertirFechaISOaFechaLocal(fechaISO) {
    const fecha = new Date(fechaISO);
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2); // Añade ceros a la izquierda
    const day = ('0' + fecha.getDate()).slice(-2); // Añade ceros a la izquierda
    return `${year}-${month}-${day}`;
}
  
selectTipo.addEventListener("change", function() {
        fOcultar();
         if(selectTipo.value==="prestacion"){
            divPrestacion.style.display="block";
         }else if(selectTipo.value==="medicamento"){
            divMedicamento.style.display="block";
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
    /*let fechaV = new Date(fechaVInput.value); 
    prescripcion.fechaVC = new Date(fechaV.getFullYear(),fechaV.getMonth()+1,fechaV.getDate());
    */
   prescripcion.fechaVC=fechaVInput.value;
    if(!validar(!prescripcion.idProfecional,pagina,'La prescripcion necesita un profecional')){bandera=false}
    console.log(bandera)
    if(!validar(!prescripcion.fechaA,pagina,'La prescripcion nesecita la fecha actual')){bandera=false}
    if(!validar(!prescripcion.idPaciente,pagina,'La Prescripcion deve tener un Paciente')){bandera=false}
    if(!validar(!prescripcion.idPlanObraSocial,pagina,'La Prescripcion deve tener una obra social con su plan')){bandera=false}
    if(!validar(!prescripcion.diagnostico,pagina,'La Prescripcion deve tener un diagnostico')){bandera=false}
    if(!validar(!prescripcion.fechaVC,pagina,'La Prescripcion deve tener una fecha de vencimiento')){bandera=false}
    if(!validar(prescripcion.prestaciones.length<1&&prescripcion.medicamentos.length<1,pagina,'La Prescripcion debe tene al menos un medicamento o una prestacion')){bandera=false}
    if(bandera){
        aux=await fechProtegidoPost('/generarPrescripcion',prescripcion);
        
        if(aux.success){
            
            limpiarCampos(limpiarP);
            fOcultar();
            eliminarHijos(divMedicamentoPrestacion);
            obraSocialSelec.value='j';
            planSelec.value='h';
        }
    }
   
  });
async function traerPrescripciones(event){
    event.preventDefault;
    eliminarHijos(divPrescripcionesA);
    bandera=true;
    let medicoPaciente={};
    console.log(paciente);
    medicoPaciente.idProfecional=parseInt(idProfecional.value);
    medicoPaciente.idPaciente=paciente.idPaciente;
    
if(!Number.isInteger(medicoPaciente.idProfecional) || !Number.isInteger(medicoPaciente.idPaciente)) {
    alerta( pagina, 'No se puede traer Prescripciones porque falta el Medico o el Paciente o no son números enteros');
    bandera = false;
}
if (bandera){
        aux=await fechProtegidoPost('/traerPrescripciones',medicoPaciente);
        console.log(aux.prescripciones);
    for(let pre of aux.prescripciones){
        //crear un div(class divPrscripcion) para cada prescripcion al final agregar el div a divPrescripcionesA
      //crear p y colocar los datos de la Prescripcion,agregar al didPre 
        let divPre=document.createElement('div');
        divPre.classList.add('divAuxiliar');
        let h6=document.createElement('h6'); //corregir fecha
        h6.textContent=`Prescripcion numero : ${pre.id_prescripcion}// Fecha :${pre.fecha_prescripcion}// fecha de vencimiento :${pre.vigencia_prescripcion}`
        divPre.appendChild(h6);
        for(let med of pre.medicamentos){
//crear un div(class divMed)
//crear p ,cargarlr los datos,agregarlo a divMed
//agregar divMed a divPre
        }
        for(let pr of pre.prestaciones){
//crear div(class divPr)
//crear p,input.oculto(id_prestacion_prescripcion), cargar datos
//crear buton que capture pr seleccionada y observacion para el update

        }
        divPrescripcionesA.appendChild(divPre);
    }    
    }  
    
}
   

 
  
  
  
 