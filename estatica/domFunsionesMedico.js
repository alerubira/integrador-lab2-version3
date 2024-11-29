function cambiarEstado(){
    //construir endpoin,hacer modificacion
    let m={};
    m.idMedico=medico.idMedico;
    if(medico.estadoMedico===1){
         m.estadoMedico=false;
    }else{
         m.estadoMedico=true;
    }
    fechProtegidoPost('/cambiarEstado',m);
    }             
                   
    async function modificarEspecialidad(){
    let nuevaEspecialidadValue=inputNuevaEspecialidad.value;
    
    let es=await especialidades.data.find(no=>no.nombre_especialidad===nuevaEspecialidadValue);
    if(es){
    let m={};
    m.idMedico=medico.idMedico;
    m.idEspecialidad=es.id_especialidad;
    fechProtegidoPost('/cambiarEspecialidad',m);
    }else{
         alerta(pagina,'La especialidad seleccionada no es valida');
    }
    
    }
    function modificarDireccion(){
    let nuevoDomicilioValue=inputNuevoDomicilio.value;
    let domiciliValido=  validar(nuevoDomicilioValue.length<1||nuevoDomicilioValue.length>30,pagina,'El domicilio es obligatorio y no debe exeder los 25 caracteres',event);
    if(domiciliValido){
    let md={};
    md.idMedico=medico.idMedico;
    md.domicilioProfecional=nuevoDomicilioValue;
    fechProtegidoPost('/cambiarDireccion',md);
    }   
    }
    function modificarDni(){
     let nuevoDniValue=inputNuevoDni.value;
     let dniValido=  validar(nuevoDniValue.length<1||nuevoDniValue.length>8,pagina,'El Dni es obligatorio y no debe exeder los 8 caracteres',event);
     if(dniValido){
     let mdni={};
     mdni.idPersona=medico.idPersona;
     mdni.dniNuevo=nuevoDniValue;
     fechProtegidoPost('/cambiarDni',mdni);//hacer endpoin sirve para modificar en prescripcion tambien
     }   
     }
function modificarNombre(){
     let nuevoNombreValue=inputNuevoNombre.value;
     let nombreValido=  validar(nuevoNombreValue.length<1||nuevoNombreValue.length>30,pagina,'El Nombre es obligatorio y no debe exeder los 25 caracteres',event);
     if(nombreValido){
     let mn={};
     mn.idPersona=medico.idPersona;
     mn.nombreNuevo=nuevoNombreValue;
     fechProtegidoPost('/cambiarNombre',mn);//hacer endpoin, sirve para modificar en prescripcion tambien
     }   
     }
function modificarApellido(){//modificar
     let nuevoApellidoValue=inputNuevoDomicilio.value;
     let apellidoValido=  validar(nuevoApellidoValue.length<1||nuevoApellidoValue.length>30,pagina,'El Apellido es obligatorio y no debe exeder los 25 caracteres',event);
     if(apellidoValido){
     let ma={};
     ma.idPersona=medico.idPersona;
     ma.nuevoApellido=nuevoApellidoValue;
     fechProtegidoPost('/cambiarApellido',ma);//hacer endpoin, sirve para modificar en prescripcion tambien
     }   
     }     
    async function seleccionarMedico(event){
        fOcultar();
        mostrar(divModificarMedico);
         // Obtener el botón que se hizo clic
         let btn = event.target;
        
         // Encontrar la fila (<tr>) que contiene el botón
         let fila = btn.closest('tr');
        
         // Obtener todas las celdas (<td>) dentro de esa fila
         let celdas = fila.getElementsByTagName('td');
        medico={};
         // Recorrer las celdas y obtener los valores
         
         medico=await medicos.data.find(med=>med.idMedico===parseInt(celdas[1].textContent));
         console.log(medico);
         eliminarHijos(cuerpo2);
         let tr2=document.createElement('tr');
                            cuerpo2.appendChild(tr2);
                            agregarTdCuerpo(medico.idPersona,tr2);
                            agregarTdCuerpo(medico.idMedico,tr2);
                            agregarTdCuerpo(medico.dni,tr2);
                            agregarTdCuerpo(medico.apellido,tr2);
                            agregarTdCuerpo(medico.nombre,tr2);
                            agregarTdCuerpo(medico.idProfecion,tr2);
                            agregarTdCuerpo(medico.profesion,tr2);
                            agregarTdCuerpo(medico.idEspecialidad,tr2);
                            agregarTdCuerpo(medico.especialidad,tr2);
                            agregarTdCuerpo(medico.domicilio,tr2);
                            agregarTdCuerpo(medico.matriculaProfesional,tr2);
                            agregarTdCuerpo(medico.idRefeps,tr2);
                            if(medico.estadoMedico===1){
                                 agregarTdCuerpo('Activo',tr2);
                            }else{
                                 agregarTdCuerpo('Inactivo',tr2);
                            }
        
        }
 async function agregarProfecion(){
          let aProfecionValue=inputAgregarProfecion.value;
          let a=validar(aProfecionValue.length<1||aProfecionValue.length>28,pagina,'El Procedimiento es obligatoria y no debe superar los 28 caracteres');
          if(a){
               let b={};
               b.nombreProfecion=aProfecionValue;
               fechProtegidoPost('/agregarProfecion',b);//hacer endpoint
          }
          inputAgregarProfecion.value="";
          } 
     
async function agregarEspecialidad(){
          let aEspecialidadValue=inputAgregarEspecialidad.value;
          let a=validar(aEspecialidadValue.length<1||aEspecialidadValue.length>28,pagina,'El Examen es obligatoria y no debe superar los 28 caracteres');
          if(a){
               let b={};
               b.nombreEspecialidad=aEspecialidadValue;
               fechProtegidoPost('/agregarEspecialidad',b);//hacer endpoint
          }
          inputAgregarEspecialidad.value="";
          }  
async function traerProfeciones(){
     profeciones=await fechProtegido("/profeciones");
     profecionDL.innerHTML = ''; 
     if(profeciones.error){
          alerta(pagina,'Hubo un inconveniente al buscar profeciones');
     }else{
         return profeciones;
            // llenarDl(profecionDL,profeciones.data,'nombre_profecion');
     
     }
}                 
async function traerEspecialidades(){
     especialidades=await fechProtegido("/especialidades");
     especialidadDL.innerHTML = ''; 
     if(especialidades.error){
          alerta(pagina,'Hubo un inconveniente al buscar profeciones');
     }else{
          return especialidades;
         // llenarDl(especialidadDL ,especialidades.data,'nombre_especialidad');
          }
}        