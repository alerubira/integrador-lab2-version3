
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
let inputNuevaEspecialidad=document.getElementById('nuevaEspecialidad');
let inputNuevoDomicilio=document.getElementById('nuevoDomicilio');
let botonEstado=document.getElementById('botonEstado');
let cuerpo2=document.getElementById('cuerpo2');
let divAProfecion=document.getElementById('divAgregarProfecion');
let divAEspecialidad=document.getElementById('divAgregarEspecialidad');
let inputAgregarProfecion=document.getElementById('agregarProfecion');
let inputAgregarEspecialidad=document.getElementById('agregarEspecialidad');
let profeciones;
let especialidades;
let bandera;
let banderaAux;
let medicos=[];
let medico;
let pMedico=document.getElementById('pMedico');

(async function(){    
profeciones=await fechProtegido("/profeciones");
profecionDL.innerHTML = ''; 
if(profeciones.error){
     alerta(pagina,'Hubo un inconveniente al buscar profeciones');
}else{
     /*for(let p of profeciones.data){
          let op=document.createElement('option');
          op.textContent=p.nombre_profecion;
          op.value=p.nombre_profecion;
          profecionDL.appendChild(op);
         }*/
        llenarDl(profecionDL,profeciones.data,'nombre_profecion');

}
especialidades=await fechProtegido("/especialidades");
especialidadDL.innerHTML = ''; 
if(especialidades.error){
     alerta(pagina,'Hubo un inconveniente al buscar profeciones');
}else{
     llenarDl(especialidadDL ,especialidades.data,'nombre_especialidad');
     }
})();

 document.getElementById('crudMedico').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     fOcultar2();
     let selectedValue = this.value;
     fOcultar();
     switch(selectedValue) {
          case 'crearMedico':
               console.log(selectedValue);
               let divCMedico = document.getElementById('divCrearMedico');
               mostrar(divCMedico);
               break;
          
          case 'buscarMedico':
              fOcultar();
              eliminarHijos(cuerpo);
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
                    if(m.estadoMedico===1){
                         agregarTdCuerpo('Activo',tr);
                    }else{
                         agregarTdCuerpo('Inactivo',tr);
                    }
                    let btn=document.createElement('button');
                              btn.textContent = 'Seleccionar';
                              btn.className = 'boton';
                              btn.addEventListener('click', seleccionarMedico);
                             let td=document.createElement('td');
                             td.appendChild(btn);
                             tr.appendChild(td);
                              }
                  }
                  break;
               case 'agregarProfecion':
                    fOcultar();
                    mostrar(divAProfecion);
                    break;
               case 'agregarEspecialidad':
                    fOcultar();
                    mostrar(divAEspecialidad);
                    break;
                break;
          default:
               console.log('Selección no válida');
               alerta(pagina,('Seleccion no valida'));
     }
     document.getElementById("crudMedico").selectedIndex = 0;
});

document.getElementById('modificarMedico').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     let selectedValue = this.value;
     fOcultar2();
     switch(selectedValue) {
          case 'estadoMedico':
               if(medico.estadoMedico===1){
                    botonEstado.innerText="Inhabilitar";
               }else{
                    botonEstado.innerText="Habilitar";
               }
               mostrar(divEstado);
              break;
          case 'direccionMedico':
               mostrar(divNuevoDomicilio);
               break
          case 'especialidadMedico':
               eliminarHijos(especialidadNuevas);
               llenarDl(especialidadNuevas,especialidades.data);
               mostrar(divNuevaEspecialidad);
               break; 
               default:
                    console.log('Selección no válida');
                    alerta(pagina,('Seleccion no valida'));         
     } 
     document.getElementById("modificarMedico").selectedIndex = 0;      
     })    


formularioProfecionalCrear.addEventListener('submit',async function(event) {
     event.preventDefault(); 
     bandera=true;
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
    banderaAux= validar(dniValue.length < 7 || dniValue.length > 8 || !/^\d+$/.test(dniValue),pagina,"El dni solo acepta 7 u 8 numeros",event)
    if(!banderaAux){bandera=false};
    banderaAux= validar(nombreValue.length<1||nombreValue.length>28||!/^[a-zA-Z]+$/.test(nombreValue),pagina,"El nombre es obligatorio,debe contener menos de 30 letras unicamente",event)
    if(!banderaAux){bandera=false};
    banderaAux= validar(apellidoValue.length<1||apellidoValue.length>28||!/^[a-zA-Z]+$/.test(apellidoValue),pagina,"El apellido es obligatorio,debe contener menos de 30 letras unicamente",event)
    if(!banderaAux){bandera=false};
     let objetoEncontrado = await profeciones.data.find(objeto => objeto.nombre_profecion === profecionValue);
     banderaAux= validar(!objetoEncontrado,pagina,'La profecion no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          idProfecion.value=await objetoEncontrado.id_profecion;
     }
      objetoEncontrado =await especialidades.data.find(objet => objet.nombre_especialidad === especialidadValue);

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
     banderaAux= validar(claveValue.length<1||!cla.test(claveValue),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
     if(!banderaAux){bandera=false}; 
     banderaAux= validar(nivelValue!=1&&nivelValue!=2&&nivelValue!=3 ,pagina,'El nivel seleccionado no es valido',event)
     if(!banderaAux){bandera=false};
     banderaAux= validar(palabraClaveValue.length<1||palabraClaveValue.length>35,pagina,'La palabra clave es obligatoria y no debe superar los 35 caracteres',event);
     if(!banderaAux){bandera=false};
     if(bandera){
         let profecionalCreado={dniProfecional:dniValue,nombreProfecional:nombreValue,apellidoProfecional:apellidoValue
          ,idProfecion:idProfecion.value,idEspecialidad:idEspecialidad.value,domicilioProfecional:domicilioValue
          ,refepsProfecional:refepsValue,matriculaProfecional:matriculaValue,usuarioProvisorio:usuarioValue
          ,claveProvisoria:claveValue,palabraClave:palabraClaveValue,nivelAutorizacion:nivelValue
        };
        fechProtegidoPost('/crearMedico',profecionalCreado);
          /*const token = localStorage.getItem('token');
    
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
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        alerta(pagina,`Hubo un inconveniente al cargar el medico: ${errorData.message}`);
      }
    } catch (error) {
     alerta(pagina,`Error al acceder para crear Medico: ${error.message}`);
      console.error('Error al acceder al endpoint protegido:', error.message);
    }*/
     }
});
