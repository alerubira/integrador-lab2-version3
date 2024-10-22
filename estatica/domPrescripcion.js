let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
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
let idProfecional=document.getElementById('id_profecional');
console.log(idProfecional.value)
let fechaActual = new Date(fechaActualInput.value); // Capturando y convirtiendo a Date
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
formularioPrescripcion.addEventListener('submit', function(event) {
    event.preventDefault(); // Previene el envío del formulario
    //falta fecha de caducidad
    prescripcion.idProfecional=idProfecional.value;
    prescripcion.fechaA=fechaActual;
    prescripcion.idPaciente=paciente.idPaciente;
    prescripcion.plan=paciente.idObraSocialPlan;
    prescripcion.diagnostico=diagnostico.value;
    prescripcion.medicamentos=medicamentosPrescripcion;
    prescripcion.prestaciones=prestacionesPrescripcion;
    console.log(prescripcion);
  });

 
  
  
  
 