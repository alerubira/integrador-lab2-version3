async function traerProcedimentos(){
     procedimientos=await fechProtegido("/procedimiento");
     if(procedimientos.error){
          alerta(pagina,'Hubo un inconveniente al buscar procedimientos');
     }else{
          return procedimientos;
     }
}
async function traerExamenes(){
     examenes=await fechProtegido("/examen");
     if(examenes.error){
          alerta(pagina,'Hubo un inconveniente al buscar examenes');
     }else{
          return examenes;
     }
}
async function traerPracticas(){
     practicas=await fechProtegido('/practica'); 
     if(practicas.error){
          alerta(pagina,'Hubo un inconveniente al buscar Practicas');
     }else{
          return practicas;
     }
}
function cambiarEstado(){
    //construir endpoin,hacer modificacion
    let p={};
    p.idPrestacion=prestacion.id_prestacion;
    if(prestacion.estado_prestacion===1){
         p.estadoPrestacion=false;
    }else{
         p.estadoPrestacion=true;
    }
    console.log(p);
    fechProtegidoPost('/cambiarEstadoPrestacion',p);
    }             
                   
    async function modificarProcedimiento(){
    let nuevoProcedimientoValue=inputNuevoProcedimiento.value;
    //buscar en procedimientos si esta,sacr el id procedimiento,generar la prestacion a modificar,enviar al endpoin
    let pro=await procedimientos.data.find(no=>no.nombre_procedimiento===nuevoProcedimientoValue);
    if(pro){
    let p={};
    p.idProcedimiento=prestacion.idMedico;
    p.idEspecialidad=pro.id_especialidad;
    fechProtegidoPost('/cambiarEspecialidad',p);
    }else{
         alerta(pagina,'La especialidad seleccionada no es valida');
    }
    
    }
    function modificarDireccion(){
    let nuevoDomicilioValue=inputNuevoDomicilio.value;
    let domiciliValido=  validar(nuevoDomicilioValue.length<1||nuevoDomicilioValue.length>30,pagina,'El domicilio es obligatorio y no debe exeder los 25 caracteres',event);
    if(domiciliValido){
    let md={};
    md.idMedico=prestacion.idMedico;
    md.domicilioProfecional=nuevoDomicilioValue;
    fechProtegidoPost('/cambiarDireccion',md);
    }   
    }
    async function seleccionarPrestacion(event){
        fOcultar();
        mostrar(divModificarPestacion);
         // Obtener el botón que se hizo clic
         let btn = event.target;
        
         // Encontrar la fila (<tr>) que contiene el botón
         let fila = btn.closest('tr');
        
         // Obtener todas las celdas (<td>) dentro de esa fila
         let celdas = fila.getElementsByTagName('td');
        prestacion={};
         // Recorrer las celdas y obtener los valores
         
         prestacion=await prestaciones.data.find(pre=>pre.id_prestacion===parseInt(celdas[0].textContent));
         console.log(prestacion);
         eliminarHijos(cuerpo2);
         let tr2=document.createElement('tr');
                            cuerpo2.appendChild(tr2);
                            agregarTdCuerpo(prestacion.id_prestacion,tr2);
                            agregarTdCuerpo(prestacion.id_practica,tr2);
                            agregarTdCuerpo(prestacion.nombre_practica,tr2);
                            agregarTdCuerpo(prestacion.id_procedimiento,tr2);
                            agregarTdCuerpo(prestacion.nombre_procedimiento,tr2);
                            agregarTdCuerpo(prestacion.id_examen,tr2);
                            agregarTdCuerpo(prestacion.nombre_examen,tr2);
                            if(prestacion.estado_procedimiento===1){
                                 agregarTdCuerpo('Activo',tr2);
                            }else{
                                 agregarTdCuerpo('Inactivo',tr2);
                            }
        
        }
        