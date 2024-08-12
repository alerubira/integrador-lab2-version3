
     
 
  console.log('dom medicos'); 
pagina="Medico";
//const Focultar = require('./domFunsiones.js');
let formularioProfecionalCrear=document.getElementById('formularioProfecionalCrear');
let dniProfecional=document.getElementById('dniProfecional');
let nombreProfecional=document.getElementById('nombreProfecional');
let apellidoProfecional=document.getElementById('apellidoProfecional');
let profecionDL=document.getElementById('profecion2');
let especialidadDL=document.getElementById('especialidad');
let idProfecion=document.getElementById('idProfecion');
let idEspecialidad=document.getElementById('idEspecialidad');
let inputProfecion=document.getElementById('profecionProfecional');
let inputEspecialidad=document.getElementById('especialidadProfecional');
let inputDomicilio=document.getElementById('domicilioProfecional');
let inputRefeps=document.getElementById('refepsProfecional');
let inputMatricula=document.getElementById('matriculaProfecional');
let inputClave=document.getElementById('claveProvisoria');
let inputUsuario=document.getElementById('usuarioProvisorio');
let inputNivel=document.getElementById('nivelAutorizacion');
let inputPalabraClave=document.getElementById('palabraClave');
let divBuscarMedico=document.getElementById('divBuscarMedico');
let divModificarMedico=document.getElementById('divModificarMedico');
let cuerpo=document.getElementById('cuerpo');
let divNuevoDomicilio=document.getElementById('divNuevoDomicilio');
let divNuevaEspecialidad=document.getElementById('divNuevaEspecialidad');
let especialidadNuevas=document.getElementById('especialidadNuevas');
let divEstado=document.getElementById('divEstado');
let botonEstado=document.getElementById('botonEstado');
let profeciones;
let especialidades;
let bandera;
let banderaAux;
let medicos=[];
let medico = [];
let pMedico=document.getElementById('pMedico');
/*// Limpia el almacenamiento local
localStorage.clear();

// Limpia el almacenamiento de la sesión
sessionStorage.clear();*/

(async function(){
 /*    // Limpia el almacenamiento local
localStorage.clear();

// Limpia el almacenamiento de la sesión
sessionStorage.clear();*/

     
profeciones=await fechProtegido("/profeciones");
profecionDL.innerHTML = ''; // Limpiar opciones existentes
if(profeciones.error){
     alerta(pagina,'Hubo un inconveniente al buscar profeciones');
}else{
     for(let p of profeciones.data){
          //console.log("--");
          let op=document.createElement('option');
          op.textContent=p.nombre_profecion;
          op.value=p.nombre_profecion;
          profecionDL.appendChild(op);
         }

}
especialidades=await fechProtegido("/especialidades");
especialidadDL.innerHTML = ''; // Limpiar opciones existentes
if(especialidades.error){
     alerta(pagina,'Hubo un inconveniente al buscar profeciones');
}else{
     llenarDl(especialidadDL ,especialidades.data)
     
}

//console.log(especialidades);
})();

 document.getElementById('crudMedico').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     
     //console.log(limpiar);
     let selectedValue = this.value;
     fOcultar();
     // Realiza una acción en base a la selección
     switch(selectedValue) {
          case 'crearMedico':
               console.log(selectedValue);
               
               // Acción para inscribir un médico
               let divCMedico = document.getElementById('divCrearMedico');
               mostrar(divCMedico);
          
               break;
          
          case 'buscarMedico':
              fOcultar();
              
               medicos=await fechProtegido('/traertodosMedicos');
              
               if(medicos.error){
                    alerta(pagina,`Hubo un inconveniente al buscar medicos: ${medicos.error.message}`);
                    console.log(medicos.error.message);
               }else{
               console.log(medicos.data);
                mostrar(divBuscarMedico);
                for(let m of medicos.data){
                    let tr=document.createElement('tr');
                    cuerpo.appendChild(tr);
                    agregarTdCuerpo(m.idPersona,tr);
                    agregarTdCuerpo(m.idMedico,tr);
                    agregarTdCuerpo(m.dni,tr);
                    agregarTdCuerpo(m.apellido,tr);
                    agregarTdCuerpo(m.nombre,tr);
                    agregarTdCuerpo(m.idProfecion,tr);
                    agregarTdCuerpo(m.profesion,tr);
                    agregarTdCuerpo(m.idEspecialidad,tr);
                    agregarTdCuerpo(m.especialidad,tr);
                    agregarTdCuerpo(m.domicilio,tr);
                    agregarTdCuerpo(m.matriculaProfesional,tr);
                    agregarTdCuerpo(m.idRefeps,tr);
                    if(m.estadoPersona){
                         agregarTdCuerpo('Activo',tr);
                    }else{
                         agregarTdCuerpo('Inactivo',tr);
                    }
                    let btn=document.createElement('button');
                              btn.textContent = 'Seleccionar';
                              btn.className = 'boton';
                              // Asignar la acción al botón
                              btn.addEventListener('click', seleccionarMedico);
                             // Añadir el botón a la celda
                             let td=document.createElement('td');
                             td.appendChild(btn);
                             tr.appendChild(td);
                              
                               }
                  }
                break;
          default:
               console.log('Selección no válida');
               alerta(pagina,('Seleccion no valida'));
     }
     
});
function seleccionarMedico(event){
fOcultar();
mostrar(divModificarMedico);
 // Obtener el botón que se hizo clic
 let btn = event.target;

 // Encontrar la fila (<tr>) que contiene el botón
 let fila = btn.closest('tr');

 // Obtener todas las celdas (<td>) dentro de esa fila
 let celdas = fila.getElementsByTagName('td');

 // Recorrer las celdas y obtener los valores
 medico=[];
 for (let i = 0; i < celdas.length; i++) {
     medico.push(celdas[i].textContent);
 }
 //pMedico.textContent="";
pMedico.textContent=medico;
 // Hacer algo con los valores, por ejemplo, mostrarlos en consola
 //console.log(valores);
}
document.getElementById('modificarMedico').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     
     //console.log(limpiar);
     let selectedValue = this.value;
     fOcultar2();
     // Realiza una acción en base a la selección
     switch(selectedValue) {
          case 'estadoMedico':
               pMedico.textContent=medico;
               //agregar placeholder al botonEstado,previa verificacion del estado,volver al inicio los select
               mostrar(divEstado);
          
               break;
          case 'direccionMedico':
               
               pMedico.textContent=medico;
               mostrar(divNuevoDomicilio);
               break
          case 'especialidadMedico':
               llenarDl(especialidadNuevas,especialidades.data);
               pMedico.textContent=medico;
               mostrar(divNuevaEspecialidad);
               break; 
               default:
                    console.log('Selección no válida');
                    alerta(pagina,('Seleccion no valida'));         
     }       
     })    
function cambiarEstado(){

}             
function agregarTdCuerpo(elemento,cuerpo){
     let td=document.createElement('td');
     td.textContent=elemento;
     cuerpo.appendChild(td);
}
function modificarEspecilaidad(){

}
formularioProfecionalCrear.addEventListener('submit',async function(event) {
     event.preventDefault(); // Previene el envío del formulario
     bandera=true;
    //modificar hacer solicitud fech post con login,capturar la respuesta
     let dniValue = dniProfecional.value;
     let nombreValue=nombreProfecional.value;
     let apellidoValue=apellidoProfecional.value;
     let profecionValue=inputProfecion.value;
     let especialidadValue=inputEspecialidad.value;
     let domicilioValue=inputDomicilio.value;
     let matriculaValue=inputMatricula.value ;
     let refepsValue=inputRefeps.value;
     let claveValue=inputClave.value ;
     let usuarioValue=inputUsuario.value ;
     let nivelValue=inputNivel.value ;
     let palabraClaveValue=inputPalabraClave.value;
      //console.log(profecionValue);
      //console.log(especialidadValue);
     // Validar que el campo tenga entre 7 y 8 dígitos
    banderaAux= validar(dniValue.length < 7 || dniValue.length > 8 || !/^\d+$/.test(dniValue),pagina,"El dni solo acepta 7 u 8 numeros",event)
    if(!banderaAux){bandera=false};
    banderaAux= validar(nombreValue.length<1||nombreValue.length>28||!/^[a-zA-Z]+$/.test(nombreValue),pagina,"El nombre es obligatorio,debe contener menos de 30 letras unicamente",event)
    if(!banderaAux){bandera=false};
    banderaAux= validar(apellidoValue.length<1||apellidoValue.length>28||!/^[a-zA-Z]+$/.test(apellidoValue),pagina,"El apellido es obligatorio,debe contener menos de 30 letras unicamente",event)
    if(!banderaAux){bandera=false};
    // let condicion= profeciones.some(objeto => objeto.nombre_profecion === profecionValue);
     let objetoEncontrado = await profeciones.find(objeto => objeto.nombre_profecion === profecionValue);
     banderaAux= validar(!objetoEncontrado,pagina,'La profecion no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          idProfecion.value=await objetoEncontrado.id_profecion;
     }
    
     //condicion=especialidades.some(objeto=>objeto.nombre_especialidad===especialidadValue);
      objetoEncontrado =await especialidades.find(objet => objet.nombre_especialidad === especialidadValue);

      banderaAux=  validar(!objetoEncontrado,pagina,'La especialidad no corresponde',event);
      if(!banderaAux){bandera=false};
      if(objetoEncontrado){
          idEspecialidad.value=await objetoEncontrado.id_especialidad;
     }
     
     banderaAux=  validar( domicilioValue.length<1||domicilioValue.length>30,pagina,'El domicilio es obligatorio y no debe exeder los 25 caracteres',event);
     if(!banderaAux){bandera=false};
     banderaAux= validar(refepsValue.length < 1 || refepsValue.length > 30 || !/^\d+$/.test(refepsValue),pagina,'El REFEPS solo hacepya numeros y no debe superar los 30 caracteres',event);
     if(!banderaAux){bandera=false};
     banderaAux= validar(matriculaValue.length < 1 || matriculaValue.length > 30 || !/^\d+$/.test(matriculaValue),pagina,'La matrcula solo hacepta numeros y no debe superar los 30 caracteres',event);
     if(!banderaAux){bandera=false}; 
     banderaAux= validar(usuarioValue.length<1||usuarioValue.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
     if(!banderaAux){bandera=false};
     //let cla=/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,}).*$/;
     banderaAux= validar(claveValue.length<1||!cla.test(claveValue),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
     if(!banderaAux){bandera=false}; 
     banderaAux= validar(nivelValue!=1&&nivelValue!=2&&nivelValue!=3 ,pagina,'El nivel seleccionado no es valido',event)
     if(!banderaAux){bandera=false};
     banderaAux= validar(palabraClaveValue.length<1||palabraClaveValue.length>35,pagina,'La palabra clave es obligatoria y no debe superar los 35 caracteres',event);
     if(!banderaAux){bandera=false};
     if(bandera){
          const token = localStorage.getItem('token');
    
    try {
      const response = await fetch('/crearMedico', {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Este encabezado es necesario para enviar JSON
        },
        body:JSON.stringify({dniProfecional:dniValue,nombreProfecional:nombreValue,apellidoProfecional:apellidoValue
          ,idProfecion:idProfecion.value,idEspecialidad:idEspecialidad.value,domicilioProfecional:domicilioValue
          ,refepsProfecional:refepsValue,matriculaProfecional:matriculaValue,usuarioProvisorio:usuarioValue
          ,claveProvisoria:claveValue,palabraClave:palabraClaveValue,nivelAutorizacion:nivelValue
        })
        
      });
      
      if (response.ok) {
        const responseBody = await response.json();
        cartelExito(pagina,'El medico fue crgado con exito');
        console.log(responseBody);
        limpiarCampos(limpiar);
        fOcultar();
       // return responseBody;
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        alerta(pagina,`Hubo un inconveniente al cargar el medico: ${errorData.message}`);
      }
    } catch (error) {
     alerta(pagina,`Error al acceder para crear Medico: ${error.message}`);
      console.error('Error al acceder al endpoint protegido:', error.message);
    }
     }
});
