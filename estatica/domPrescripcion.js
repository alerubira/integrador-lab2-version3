let divMedicamento=document.getElementById("divMedicamento");
let divPrestacion=document.getElementById("divPrestacion");
let dirRecetado=document.getElementById("divRecetado");
//let ocultar=document.getElementsByClassName("ocultar");
let selectTipo=document.getElementById("tipo");
let divPacientes=document.getElementById('divPacientes');
let selectSexo=document.getElementById("selectSexo");
let pacientes=[];
let profecional = document.getElementById('app').dataset.profesional;
let paciente={};//para la prescripcion
let obraSocialSelec=document.getElementById('obraSP');
let planSelec=document.getElementById('plan');
let divMedicamentoPrestacion=document.getElementById('divMedicamentoPrestacion');
let marca=document.getElementById('marcaMedicamento')
const selectElement = document.getElementById('tipo');
let inputAdministracion = document.getElementById('administracion_medicamento');
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
//let genericoDL=document.getElementById('genericos');
/*(async function (){//corregir y armar endpoint a todos los autoejecutable
     genericos=await fech('*','/nombreGenerico');
  let nombreCompleto=new Set();
    //console.log(genericos);
    
    
    for(let medicamento of genericos){
        if (!nombreCompleto.has(medicamento.nombre_generico)) {
            // Si no está, añade el nombre al Set y crea la opción
            nombreCompleto.add(medicamento.nombre_generico);
            
            let option = document.createElement('option');
            option.value = medicamento.nombre_generico;
            option.textContent = medicamento.nombre_generico;
            genericoDL.appendChild(option);
        }
       }
       
    
})();*/
/*(async()=>{
    administraciones=await fech('*','/administraciones');
})();*/

/*(async ()=>{
lados=await fech('*','/lados');//armar bien con fech protegido , armar endpoin
})();*/

/*let medicamentMomentaneo;
let nombre;
let formaDL=document.getElementById('forma');
*/
/*function obtenerNombre() {
    
    // Obtener el valor del input
    nombre = document.getElementById("nombre_generico_medicamento");
   
   
     medicamentMomentaneo=genericos.filter(generico=>generico.nombre_generico===nombre.value);
     if(medicamentMomentaneo.length<1){
        alert('El medicameno seleccionado no es valido');
     }
    
    
    for(let form of medicamentMomentaneo){
        let option=document.createElement('option');
        option.value=form.nombre_forma;
        option.textContent=form.nombre_forma;
        formaDL.appendChild(option);
    }
  }*/
  /*let forma=document.getElementById('forma_farmaceutica_medicamento');
  let presDL=document.getElementById('presentacion');
  */
  /*function obtenerForma(){
    
     // console.log(forma);
     // console.log(medicamentMomentaneo);
      let presentaciones=medicamentMomentaneo.filter(pres=>pres.nombre_forma===forma.value);
      if(presentaciones.length<1){
        alert('La presentacion seleccionada no cooresponde al medicamento seleccionado');
      }
      console.log(presentaciones);
      
      for(let pres of presentaciones){
       let  option=document.createElement('option');
        option.value=pres.nombre_presentacion;
        option.textContent=pres.nombre_presentacion;
        presDL.appendChild(option);
      }
  }*/
 // let presentacion=document.getElementById('presentacion_medicamento');
  //let administracionDL=document.getElementById('administracion');
  /*function obtenerPresentacion(){
    //console.log(`en lafunsion`);
       //console.log(presentacion);
       medicamento=medicamentMomentaneo.find(med=>med.nombre_presentacion===presentacion.value);
       if(!medicamento){
        alert('La presentacion selecionada no corresponde al medicamento');
       }
       console.log(medicamento);
      // console.log(administraciones);
      
      for(let adm of administraciones){
        let option=document.createElement('option');
        option.value=adm.nombre_administracion_medicamento;
        option.textContent=adm.nombre_administracion_medicamento;
        administracionDL.appendChild(option);
      }
  }*/
  //let admin=document.getElementById('administracion_medicamento')
 /* async function obtenerAdministracion(){
      
       administracion=await administraciones.find(ad=>ad.nombre_administracion_medicamento===admin.value);
       if(!administracion){
        alert('La administracion del medicamento elegida no es aceptada');
       }
  }*/
  
  /*function agregarMedicamentoCompleto(){
    
   // console.log(administracion);
   const existe = objetoEnArreglo(medicamentMomentaneo, medicamentos);
   if(existe){
    alert('El medicamento ya se encuentra en la prescripcion');
   }else{
    medicamentoCompleto.id_nombre_generico=medicamento.id_nombre_generico;
    medicamentoCompleto.id_forma=medicamento.id_forma;
    medicamentoCompleto.id_presentacion=medicamento.id_presentacion;
    medicamentoCompleto.id_administracion_medicamento=administracion.id_administracion_medicamento;
    medicamentoCompleto.marca=marca.value;

    medicamentos.push(medicamentoCompleto);
    medicamentoCompleto={};
    medicamentMomentaneo=[];
    let p=document.createElement('p');
    p.textContent=`${medicamento.nombre_generico}-${medicamento.nombre_forma}-${medicamento.nombre_presentacion}-${administracion.nombre_administracion_medicamento}-${marca.value}`;
    divMedicamentoPrestacion.appendChild(p); 
    limpiarCampos(nombre,forma,presentacion,admin,marca);
   /* eliminarHijos(formaDL);
    eliminarHijos( genericoDL);
    eliminarHijos(administracionDL);
    eliminarHijos( presDL);*/
   /* formaDL.innerHTML="";
    genericoDL.innerHTML="";*/
   /* administracionDL.innerHTML="";
    presDL.innerHTML="";
    formaDL.innerHTML="";
    const selectElement = document.getElementById('tipo');
    
    // Restablecemos el valor a la opción inicial
    selectElement.value = 'j'; // O el valor que corresponda a la opción inicial
    Focultar();
    console.log(medicamentos);
   }
  }*/
 /* function objetosSonIguales(obj1, obj2) {
    return Object.keys(obj1).length === Object.keys(obj2).length &&
           Object.keys(obj1).every(key => obj2.hasOwnProperty(key) && obj1[key] === obj2[key]);
}
function objetoEnArreglo(objeto, arreglo) {
    return arreglo.some(elemento => objetosSonIguales(objeto, elemento));
}*/