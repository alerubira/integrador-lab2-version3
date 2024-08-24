pagina="Prestaciones";
//const Focultar = require('./domFunsiones.js');
let formularioPrestacionCrear=document.getElementById('formularioPrestacionCrear');
let nombrePractica=document.getElementById('nombrePractica');
let dlExamen=document.getElementById('dlExamen');
let dlProcedimiento=document.getElementById('dlProcedimiento');
let idExamen=document.getElementById('idExamen');
let idProcedimiento=document.getElementById('idProcedimiento');
let inputexamen=document.getElementById('examenPrestacion');
let inputProcedimiento=document.getElementById('procedimientoPrestacion');
let divBuscarPrestacion=document.getElementById('divBuscarPrestacion');
let divModificarPestacion=document.getElementById('divModificarPrestacion');
let cuerpo=document.getElementById('cuerpo');
let divNuevoExamen=document.getElementById('divNuevoExamen');
let divNuevoProcedimiento=document.getElementById('divNuevaEspecialidad');
let especialidadNuevas=document.getElementById('especialidadNuevas');
let inputNuevaEspecialidad=document.getElementById('nuevaEspecialidad');
let inputNuevoDomicilio=document.getElementById('nuevoDomicilio');
let botonEstado=document.getElementById('botonEstado');
let cuerpo2=document.getElementById('cuerpo2');
let examenes;
let procedimientos;
let bandera;
let banderaAux;
let prestaciones=[];
let prestacion;
let pMedico=document.getElementById('pMedico');

(async function(){    
examenes=await fechProtegido("/examen");
dlExamen.innerHTML = '';
console.log(examenes.data); 
if(examenes.error){
     alerta(pagina,'Hubo un inconveniente al buscar examenes');
}else{
     for(let e of examenes.data){
          let op=document.createElement('option');
          op.textContent=e.nombre_examen;
          op.value=e.nombre_examen;
          dlExamen.appendChild(op);
         }

}
procedimientos=await fechProtegido("/procedimiento");
dlProcedimiento.innerHTML = ''; 
console.log(procedimientos.data);
if(procedimientos.error){
     alerta(pagina,'Hubo un inconveniente al buscar procedimientos');
}else{
     for(let p of procedimientos.data){
          let op1=document.createElement('option');
          op1.textContent=p.nombre_procedimiento;
          op1.value=p.nombre_procedimiento;
          dlProcedimiento.appendChild(op1);
     }
     }
})();

 document.getElementById('crudPrestaciones').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     fOcultar2();
     let selectedValue = this.value;
     fOcultar();
     switch(selectedValue) {
          case 'crearPrestacion':
               console.log(selectedValue);
               let divCPrestacion = document.getElementById('divCrearPrestacion');
               mostrar(divCPrestacion);
               break;
          
          case 'buscarPrestaciones':
              fOcultar();
              eliminarHijos(cuerpo);
               prestaciones=await fechProtegido('/traertodosMedicos');
              if(prestaciones.error){
                    alerta(pagina,`Hubo un inconveniente al buscar medicos: ${prestaciones.error.message}`);
                    console.log(prestaciones.error.message);
               }else{
               console.log(prestaciones.data);
                mostrar(divBuscarPrestacion);
                for(let m of prestaciones.data){
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
          default:
               console.log('Selección no válida');
               alerta(pagina,('Seleccion no valida'));
     }
     document.getElementById("crudPrestaciones").selectedIndex = 0;
});

document.getElementById('modificarPrestacion').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     let selectedValue = this.value;
     fOcultar2();
     switch(selectedValue) {
          case 'estadoMedico':
               if(prestacion.estadoMedico===1){
                    botonEstado.innerText="Inhabilitar";
               }else{
                    botonEstado.innerText="Habilitar";
               }
               mostrar(divEstado);
              break;
          case 'direccionMedico':
               mostrar(divNuevoExamen);
               break
          case 'especialidadMedico':
               eliminarHijos(especialidadNuevas);
               llenarDl(especialidadNuevas,procedimientos.data);
               mostrar(divNuevoProcedimiento);
               break; 
               default:
                    console.log('Selección no válida');
                    alerta(pagina,('Seleccion no valida'));         
     } 
     document.getElementById("modificarMedico").selectedIndex = 0;      
     })    


formularioPrestacionCrear.addEventListener('submit',async function(event) {
     event.preventDefault(); 
     bandera=true;
     let nombreValue=nombrePractica.value;
     let examenValue=inputexamen.value;
     let procedimientoValue=inputProcedimiento.value;
     
    banderaAux= validar(nombreValue.length<1||nombreValue.length>28||!/^[a-zA-Z]+$/.test(nombreValue),pagina,"El nombre es obligatorio,debe contener menos de 30 letras unicamente",event)
    if(!banderaAux){bandera=false};
     let objetoEncontrado = await examenes.data.find(objeto => objeto.nombre_examen === examenValue);
     banderaAux= validar(!objetoEncontrado,pagina,'El examen no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          idExamen.value=await objetoEncontrado.id_examen;
     }
      objetoEncontrado =await procedimientos.data.find(objet => objet.nombre_procedimiento === procedimientoValue);

      banderaAux=  validar(!objetoEncontrado,pagina,'El procedimiento no corresponde',event);
      if(!banderaAux){bandera=false};
      if(objetoEncontrado){
          idProcedimiento.value=await objetoEncontrado.id_procedimiento;
     }
     
     
     if(bandera){
         let prestacionCreado={nombrePractica:nombreValue,idExamen:idExamen.Value,idProcedimiento:idProcedimiento.value};
        fechProtegidoPost('/crearPrestacion',prestacionCreado);
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
