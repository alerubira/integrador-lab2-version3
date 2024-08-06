
     
 
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
let profeciones;
let especialidades;
/*// Limpia el almacenamiento local
localStorage.clear();

// Limpia el almacenamiento de la sesión
sessionStorage.clear();*/

(async function(){
 /*    // Limpia el almacenamiento local
localStorage.clear();

// Limpia el almacenamiento de la sesión
sessionStorage.clear();*/

     
profeciones=await fech("*","/profeciones");
console.log(profeciones);
profecionDL.innerHTML = ''; // Limpiar opciones existentes

for(let p of profeciones){
     //console.log("--");
     let op=document.createElement('option');
     op.textContent=p.nombre_profecion;
     op.value=p.nombre_profecion;
     profecionDL.appendChild(op);
}
especialidades=await fech("*","/especialidades");
especialidadDL.innerHTML = ''; // Limpiar opciones existentes
for(let e of especialidades){
     let op2=document.createElement('option');
     op2.textContent=e.nombre_especialidad;
     op2.value=e.nombre_especialidad;
     especialidadDL.appendChild(op2);
}
console.log(especialidades);
})();

 document.getElementById('crudMedico').addEventListener('change', function() {
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
               divCMedico.style.display = 'block';
               break;
          case 'modificarMedico':
                    //Focultar();
               // Acción para modificar datos de un médico
               console.log('Modificar datos de Médico');
               break;
          case 'bajaMedico':
              // Focultar();
               // Acción para dar de baja a un médico
               console.log('Dar de baja a un Médico');
               break;
          case 'buscarMedico':
              // Focultar();
               // Acción para buscar un médico existente
               console.log('Buscar un Médico existente');
               break;
          default:
               console.log('Selección no válida');
     }
     
});
formularioProfecionalCrear.addEventListener('submit',async function(event) {
    // event.preventDefault(); // Previene el envío del formulario
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
     validar(dniValue.length < 7 || dniValue.length > 8 || !/^\d+$/.test(dniValue),pagina,"El dni solo acepta 7 u 8 numeros",event)
     validar(nombreValue.length<1||nombreValue.length>28||!/^[a-zA-Z]+$/.test(nombreValue),pagina,"El nombre es obligatorio,debe contener menos de 30 letras unicamente",event)
     validar(apellidoValue.length<1||apellidoValue.length>28||!/^[a-zA-Z]+$/.test(apellidoValue),pagina,"El apellido es obligatorio,debe contener menos de 30 letras unicamente",event)
    // let condicion= profeciones.some(objeto => objeto.nombre_profecion === profecionValue);
     let objetoEncontrado = profeciones.find(objeto => objeto.nombre_profecion === profecionValue);
     validar(!objetoEncontrado,pagina,'La profecion no corresponde',event);
     if(objetoEncontrado){
          idProfecion.value=await objetoEncontrado.id_profecion;
     }
    
     //condicion=especialidades.some(objeto=>objeto.nombre_especialidad===especialidadValue);
      objetoEncontrado = especialidades.find(objet => objet.nombre_especialidad === especialidadValue);

     validar(!objetoEncontrado,pagina,'La especialidad no corresponde',event);
     if(objetoEncontrado){
          idEspecialidad.value=await objetoEncontrado.id_especialidad;
     }
     
     validar( domicilioValue.length<1||domicilioValue.length>30,pagina,'El domicilio es obligatorio y no debe exeder los 25 caracteres',event);
     validar(refepsValue.length < 1 || refepsValue.length > 30 || !/^\d+$/.test(refepsValue),pagina,'El REFEPS solo hacepya numeros y no debe superar los 30 caracteres',event);
     validar(matriculaValue.length < 1 || matriculaValue.length > 30 || !/^\d+$/.test(matriculaValue),pagina,'La matrcula solo hacepta numeros y no debe superar los 30 caracteres',event);
     validar(usuarioValue.length<1||usuarioValue.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
     let cla=/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,}).*$/;
     validar(claveValue.length<1||!cla.test(claveValue),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
     validar(nivelValue!=1&&nivelValue!=2&&nivelValue!=3 ,pagina,'El nivel seleccionado no es valido',event)
     validar(palabraClaveValue.length<1||palabraClaveValue.length>35,pagina,'La palabra clave es obligatoria y no debe superar los 35 caracteres',event);
   });
