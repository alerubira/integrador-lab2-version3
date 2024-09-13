async function traerMedicamentos(){
    familias=await fechProtegido("/procedimiento");
    if(familias.error){
         alerta(pagina,'Hubo un inconveniente al buscar procedimientos');
    }else{
         return familias;
    }
}
async function traerNombresGenericos(){
     nombresGenericos=await fechProtegido("/nombresGenericos");
     if(nombresGenericos.error){
          alerta(pagina,'Hubo un inconveniente al buscar nombres genericos');
     }else{
          return nombresGenericos;
     }
}
async function traerPresentaciones(){
    presentaciones=await fechProtegido("/presentaciones");
    if(presentaciones.error){
         alerta(pagina,'Hubo un inconveniente al buscar presentaciones');
    }else{
         return presentaciones;
    }
}
async function traerFormas(){
    formas=await fechProtegido('/formas'); 
    if(formas.error){
         alerta(pagina,'Hubo un inconveniente al buscar formas farmaceuticas');
    }else{
         return formas;
    }
}
async function traerCategorias(){
     categorias=await fechProtegido("/categorias");
     if(categorias.error){
          alerta(pagina,'Hubo un inconveniente al buscar categorias');
     }else{
          return categorias;
     }
}
async function traerFamilias(){
     familias=await fechProtegido("/familias");
     if(familias.error){
          alerta(pagina,'Hubo un inconveniente al buscar examenes');
     }else{
          return familias;
     }
}
function cambiarEstado(){
   limpiarCampos(limpiar);
   let p={};
   p.idPrestacion=medicamento.id_prestacion;
   if(medicamento.estado_prestacion===1){
        p.estadoPrestacion=false;
   }else{
        p.estadoPrestacion=true;
   }
   console.log(p);
   fechProtegidoPost('/cambiarEstadoPrestacion',p);
   }             
                  
   async function modificarPresentacion(){
  
   let nuevoProcedimientoValue=inputNuevaPresentacion.value;
   let pro=await familias.data.find(no=>no.nombre_procedimiento===nuevoProcedimientoValue);
   if(pro){
   let p={};
   p.idPrestacion=medicamento.id_prestacion;
   p.idProcedimiento=pro.id_procedimiento;
   fechProtegidoPost('/modificarProcedimiento',p);
   }else{
        alerta(pagina,'El procedimiento seleccionada no es valida');
   }
   
   }
   async function modificarForma(){
   let nuevoExamenValue=inputNuevaForma.value;
   let ex=await presentaciones.data.find(e=>e.nombre_examen===nuevoExamenValue);
   if(ex){
   let exa={};
   exa.idPrestacion=medicamento.id_prestacion;
   exa.idExamen=ex.id_examen;
   fechProtegidoPost('/modificarExamen',exa);
   }   
   }
   async function modificarFamilia(){

   }
   async function modificarCategoria(){

   }
   async function seleccionarMedicamento(event){
       fOcultar();
       mostrar(divModificarMedicamento);
        // Obtener el botón que se hizo clic
        let btn = event.target;
       
        // Encontrar la fila (<tr>) que contiene el botón
        let fila = btn.closest('tr');
       
        // Obtener todas las celdas (<td>) dentro de esa fila
        let celdas = fila.getElementsByTagName('td');
       medicamento={};
        // Recorrer las celdas y obtener los valores
        
        medicamento=await medicamentos.data.find(pre=>pre.id_prestacion===parseInt(celdas[0].textContent));
        console.log(medicamento);
        eliminarHijos(cuerpo2);
        let tr2=document.createElement('tr');
                           cuerpo2.appendChild(tr2);
                           agregarTdCuerpo(medicamento.id_prestacion,tr2);
                           agregarTdCuerpo(medicamento.id_practica,tr2);
                           agregarTdCuerpo(medicamento.nombre_practica,tr2);
                           agregarTdCuerpo(medicamento.id_procedimiento,tr2);
                           agregarTdCuerpo(medicamento.nombre_procedimiento,tr2);
                           agregarTdCuerpo(medicamento.id_examen,tr2);
                           agregarTdCuerpo(medicamento.nombre_examen,tr2);
                           if(medicamento.estado_procedimiento===1){
                                agregarTdCuerpo('Activo',tr2);
                           }else{
                                agregarTdCuerpo('Inactivo',tr2);
                           }
       
       }
async function agregarPractica(){
let aPracticaValue=inputAPractica.value;
let a=validar(aPracticaValue.length<1||aPracticaValue.length>28,pagina,'La practica es obligatoria y no debe superar los 28 caracteres');
if(a){
    let b={};
     b.nombrePractica=aPracticaValue;
    fechProtegidoPost('/agregarPractica',b);//hacer endpoint
}
inputAPractica.value="";
} 
async function agregarNombreGenerico(){
     bandera=true;
    let aNombreValue=inputNombreGenericoNuevo.value;
    let categoriaValue=inputCategoria.value;
    let familiaValue=inputFamilia.value;
    console.log(aNombreValue);
    let a=validar(aNombreValue.length<1||aNombreValue.length>38,pagina,'El Nombre es obligatoria y no debe superar los 28 caracteres');
    if(a){
     objetoEncontrado =await familias.data.find(objet => objet.nombre_familia === familiaValue);
     banderaAux=  validar(!objetoEncontrado,pagina,'La familia no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
         idFamilia.value= objetoEncontrado.id_familia;
         objetoEncontrado =await categorias.data.find(objet => objet.nombre_categoria === categoriaValue);
         banderaAux=  validar(!objetoEncontrado,pagina,'La categoria no corresponde',event);
         if(objetoEncontrado){idCategoria.value=objetoEncontrado.id_categoria}
         if(!banderaAux){bandera=false};
     }
    }else{bandera=false};
    
    if(bandera){

         let nG={};
         nG.nombreGenerico=aNombreValue;
         nG.idFamilia=parseInt(idFamilia.value);
         nG.idCategoria=parseInt(idCategoria.value);
         fechProtegidoPost('/agregarNombreGenerico',nG);
    }
    inputNombreGenericoNuevo.value="";
    inputFamilia.value="";
    inputCategoria.value="";
    idCategoria.value="";
    idFamilia.value="";
    eliminarHijos(dlCategoria);
    eliminarHijos(dlFamilia);
    fOcultar();
    } 

async function agregarExamen(){
    let aExamenValue=inputAExamen.value;
    let a=validar(aExamenValue.length<1||aExamenValue.length>28,pagina,'El Examen es obligatoria y no debe superar los 28 caracteres');
    if(a){
         let b={};
         b.nombreExamen=aExamenValue;
         fechProtegidoPost('/agregarExamen',b);//hacer endpoint
    }
    inputAExamen.value="";
    } 


       