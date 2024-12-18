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
    limpiarCampos(limpiar);
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
    async function traerPrestaciones(){
     //adaptar par prestaciones ordenedas por id practica
     prestaciones=await fechProtegido('/traerTodasPrestaciones');
     preData=prestaciones.data;
   if(prestaciones.error){
         alerta(pagina,`Hubo un inconveniente al buscar prestaciones: ${prestaciones.error.message}`);
         return false;
    }else{
         preData.sort((a, b) => a.id_practica - b.id_practica);
        return preData;
    }
   
}               
                   
    async function modificarProcedimiento(){
   
    let nuevoProcedimientoValue=inputNuevoProcedimiento.value;
    let pro=await procedimientos.data.find(no=>no.nombre_procedimiento===nuevoProcedimientoValue);
    if(pro){
    let p={};
    p.idPrestacion=prestacion.id_prestacion;
    p.idProcedimiento=pro.id_procedimiento;
    fechProtegidoPost('/modificarProcedimiento',p);
    }else{
         alerta(pagina,'El procedimiento seleccionada no es valida');
    }
    inputNuevoProcedimiento.value="";
    }
    async function modificarExamen(){
    let nuevoExamenValue=inputNuevoExamen.value;
    let ex=await examenes.data.find(e=>e.nombre_examen===nuevoExamenValue);
    if(ex){
    let exa={};
    exa.idPrestacion=prestacion.id_prestacion;
    exa.idExamen=ex.id_examen;
    fechProtegidoPost('/modificarExamen',exa);
    } 
    inputNuevoExamen.value="";  
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
         
         prestacion=await prestaciones.find(pre=>pre.id_prestacion===parseInt(celdas[0].textContent));
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
                            if(prestacion.estado_prestacion===1){
                                 agregarTdCuerpo('Activo',tr2);
                            }else{
                                 agregarTdCuerpo('Inactivo',tr2);
                            }
        
        }
async function agregarPractica(){
let aPracticaValue=inputAPractica.value;
let a=validar(aPracticaValue.length<1||aPracticaValue.length>98,pagina,'La practica es obligatoria y no debe superar los 98 caracteres');
if(a){
     let b={};
      b.nombrePractica=aPracticaValue;
     fechProtegidoPost('/agregarPractica',b);
}
inputAPractica.value="";
} 
async function agregarProcedimiento(){
     let aProcedimientoValue=inputAProcedimiento.value;
     let a=validar(aProcedimientoValue.length<1||aProcedimientoValue.length>198,pagina,'El Procedimiento es obligatoria y no debe superar los 198 caracteres');
     if(a){
          let b={};
          b.nombreProcedimiento=aProcedimientoValue;
          fechProtegidoPost('/agregarProcedimiento',b);//hacer endpoint
     }
     inputAProcedimiento.value="";
     } 

async function agregarExamen(){
     let aExamenValue=inputAExamen.value;
     let a=validar(aExamenValue.length<1||aExamenValue.length>198,pagina,'El Examen es obligatoria y no debe superar los 198 caracteres');
     if(a){
          let b={};
          b.nombreExamen=aExamenValue;
          fechProtegidoPost('/agregarExamen',b);
     }
     inputAExamen.value="";
     } 
     

        