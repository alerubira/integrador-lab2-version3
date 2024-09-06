pagina="Medicamentos";
//const Focultar = require('./domFunsiones.js');
let formularioMedicamentoCrear=document.getElementById('formularioMedicamentoCrear');
let nombreGenerico=document.getElementById('nombreGenerico');
let dlNombreGenerico=document.getElementById('dlNombreGenerico');
let dlExamen=document.getElementById('dlExamen');
let dlFamilia=document.getElementById('dlFamilia');
let dlProcedimientosNuevos=document.getElementById('dlProcedimientosNuevos');
let idPractica=document.getElementById('idPractica');
let idExamen=document.getElementById('idExamen');
let idProcedimiento=document.getElementById('idProcedimiento');
let inputexamen=document.getElementById('examenPrestacion');
let inputFamilia=document.getElementById('familia');
let divBuscarPrestacion=document.getElementById('divBuscarPrestacion');
let divModificarPestacion=document.getElementById('divModificarPrestacion');
let cuerpo=document.getElementById('cuerpo');
let divNuevoExamen=document.getElementById('divNuevoExamen');
let divNuevoProcedimiento=document.getElementById('divNuevoProcedimiento');
let divCPrestacion = document.getElementById('divCrearPrestacion');
let especialidadNuevas=document.getElementById('especialidadNuevas');
let inputNuevoProcedimiento=document.getElementById('nuevoProcedimiento');
let inputNuevoExamen=document.getElementById('nuevoExamen');
let dlExamenNuevo=document.getElementById('dlExamenNuevo');
let botonEstado=document.getElementById('botonEstado');
let cuerpo2=document.getElementById('cuerpo2');
let divAPractica=document.getElementById('divAgregarPractica');
let divAProcedimiento=document.getElementById('divAgregarProcedimiento');
let divAExamen=document.getElementById('divAgregarExamen');
let inputAPractica=document.getElementById('agregarPractica');
let inputAProcedimiento=document.getElementById('agregarProcedimiento');
let inputAExamen=document.getElementById('agregarExamen');
let practicas;
let examenes;
let procedimientos;
let bandera;
let banderaAux;
let prestaciones=[];
let prestacion;
let pMedico=document.getElementById('pMedico');

/*(async function(){  
practicas=await fechProtegido('/practica'); 
dlPractica.innerHTML='';
console.log(practicas.data);
if(practicas.error){
     alerta(pagina,'Hubo un inconveniente al buscar Practicas');
} else{
     llenarDl(dlPractica,practicas.data,'nombre_practica');
}   
examenes=await fechProtegido("/examen");
dlExamen.innerHTML = '';
console.log(examenes.data); 
if(examenes.error){
     alerta(pagina,'Hubo un inconveniente al buscar examenes');
}else{
    
        
        llenarDl(dlExamen,examenes.data,'nombre_examen');

}
procedimientos=await fechProtegido("/procedimiento");
dlProcedimiento.innerHTML = ''; 
console.log(procedimientos.data);
if(procedimientos.error){
     alerta(pagina,'Hubo un inconveniente al buscar procedimientos');
}else{
    
    llenarDl(dlProcedimiento,procedimientos.data,'nombre_procedimiento')
     }
})();*/

 document.getElementById('crudMedicamentos').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     fOcultar2();
     let selectedValue = this.value;
     fOcultar();
     switch(selectedValue) {
          case 'crearPrestacion':
               practicas=await traerPracticas();
               procedimientos=await traerProcedimentos();
               examenes=await traerExamenes();
               llenarDl(dlNombreGenerico,practicas.data,'nombre_practica');
               llenarDl(dlFamilia,procedimientos.data,'nombre_procedimiento')
               llenarDl(dlExamen,examenes.data,'nombre_examen');
               
               mostrar(divCPrestacion);
               break;
          
          case 'buscarPrestaciones':
              fOcultar();
              eliminarHijos(cuerpo);
               prestaciones=await fechProtegido('/traerTodasPrestaciones');
              if(prestaciones.error){
                    alerta(pagina,`Hubo un inconveniente al buscar prestaciones: ${prestaciones.error.message}`);
                    console.log(prestaciones.error.message);
               }else{
               console.log(prestaciones.data);
                mostrar(divBuscarPrestacion);
                for(let p of prestaciones.data){
                    let tr=document.createElement('tr');
                    cuerpo.appendChild(tr);
                    agregarTdCuerpo(p.id_prestacion,tr);
                    agregarTdCuerpo(p.id_practica,tr);
                    agregarTdCuerpo(p.nombre_practica,tr);
                    agregarTdCuerpo(p.id_procedimiento,tr);
                    agregarTdCuerpo(p.nombre_procedimiento,tr);
                    agregarTdCuerpo(p.id_examen,tr);
                    agregarTdCuerpo(p.nombre_examen,tr);
                    if(p.estado_prestacion===1){
                         agregarTdCuerpo('Activo',tr);
                    }else{
                         agregarTdCuerpo('Inactivo',tr);
                    }
                    let btn=document.createElement('button');
                              btn.textContent = 'Seleccionar';
                              btn.className = 'boton';
                              btn.addEventListener('click', seleccionarPrestacion);
                             let td=document.createElement('td');
                             td.appendChild(btn);
                             tr.appendChild(td);
                              }
                  }
                break;
          case 'agregarPractica':
               fOcultar();
               mostrar(divAPractica);
               break;
          case 'agregarProcedimiento':
               fOcultar();
               mostrar(divAProcedimiento);
               break;
          case 'agregarExamen':
               fOcultar();
               mostrar(divAExamen);
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
          case 'estadoPrestacion':
               limpiarCampos(limpiar);
               fOcultar2();
               if(prestacion.estado_prestacion===1){
                    botonEstado.innerText="Inhabilitar";
               }else{
                    botonEstado.innerText="Habilitar";
               }
               mostrar(divEstado);
              break;
          case 'procedimientoPrestacion':
               limpiarCampos(limpiar);
               fOcultar2();
               procedimientos=await traerProcedimentos();
               llenarDl(dlProcedimientosNuevos,procedimientos.data,'nombre_procedimiento');
               mostrar(divNuevoProcedimiento);
               break
          case 'examenPrestacion':
               limpiarCampos(limpiar);
               fOcultar2();
               //eliminarHijos(especialidadNuevas);
               examenes=await traerExamenes();
               //console.log(examenes.data);
               llenarDl(dlExamenNuevo,examenes.data,'nombre_examen');
               mostrar(divNuevoExamen);
               break; 
               default:
                    console.log('Selección no válida');
                    alerta(pagina,('Seleccion no valida'));         
     } 
     document.getElementById("modificarPrestacion").selectedIndex = 0;      
     })    


formularioMedicamentoCrear.addEventListener('submit',async function(event) {
     event.preventDefault(); 
     bandera=true;
     let nombreValue=nombreGenerico.value;
     let examenValue=inputexamen.value;
     let procedimientoValue=inputFamilia.value;
     let objetoEncontrado ;
    //banderaAux= validar(nombreValue.length<1||nombreValue.length>28||!/^[a-zA-Z]+$/.test(nombreValue),pagina,"El nombre es obligatorio,debe contener menos de 30 letras unicamente",event)
     objetoEncontrado=await practicas.data.find(ob=>ob.nombre_practica===nombreValue);
     banderaAux=validar(!objetoEncontrado,pagina,'La practica no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          idPractica.value=objetoEncontrado.id_practica;
     } 
      objetoEncontrado = await examenes.data.find(objeto => objeto.nombre_examen === examenValue);
     banderaAux= validar(!objetoEncontrado,pagina,'El examen no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          //console.log(objetoEncontrado.id_examen);
          idExamen.value= objetoEncontrado.id_examen;
          //console.log(idExamen.value);
     }
      objetoEncontrado =await procedimientos.data.find(objet => objet.nombre_procedimiento === procedimientoValue);

      banderaAux=  validar(!objetoEncontrado,pagina,'El procedimiento no corresponde',event);
      if(!banderaAux){bandera=false};
      if(objetoEncontrado){
          idProcedimiento.value= objetoEncontrado.id_procedimiento;
     }
     
     
     if(bandera){
         let prestacionCreado={idPractica:idPractica.value,idProcedimiento:idProcedimiento.value,idExamen:idExamen.value};
       
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
