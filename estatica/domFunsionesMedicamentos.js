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
function cambiarEstadoM(){
   limpiarCampos(limpiar);
   let m={};
   m.idNGP=medicamento.id_n_g_p;
   if(medicamento.estado_n_g_p===1){
        m.estado_n_g_p=false;
   }else{
        m.estado_n_g_p=true;
   }
   console.log(m);
   fechProtegidoPost('/cambiarEstadoMedicamento',m);
   } 
function modificarEstadoNG(){
     limpiarCampos(limpiar);
     let ng={};
     ng.idNG=medicamento.id_nombre_generico;
     if(medicamento.estado_nonbre_generico===1){
          ng.estadoNombreGenerico=false;
     }else{
          ng.estadoNombreGenerico=true;
     }
     fechProtegidoPost('/modificarEstadoNG',ng);
}               
 async function modificarPresentacion(){
  
   let nuevoPresentacionValue=inputNuevaPresentacion.value;
   let pre=await presentaciones.data.find(no=>no.nombre_presentacion===nuevoPresentacionValue);
   if(pre){
   let p={};
   p.idPrestacion=pre.id_presentacion;
   p.idNGP=medicamento.id_n_g_p;
   fechProtegidoPost('/modificarPresentacion',p);
   }else{
        alerta(pagina,'La Presentacion seleccionada no es valida');
   }
   
   }
   async function modificarForma(){
     //traer con el medicamento(modificar procedimiento)el id de nombre generico forma para hacer update
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
     let nuevaFamiliaValue=inputNuevaFamilia.value;
     let fa=await familias.data.find(no=>no.nombre_familia===nuevaFamiliaValue);
     if(fa){
     let f={};
     f.idFamilia=fa.id_familia;
     f.idNG=medicamento.id_nombre_generico;
     fechProtegidoPost('/modificarFamilia',f);
     }else{
          alerta(pagina,'La Familia seleccionada no es valida');
   }
}
   async function modificarCategoria(){
     let nuevaCategoriaValue=inputNuevaCategoria.value;
     let ca=await categorias.data.find(no=>no.nombre_categoria===nuevaCategoriaValue);
     if(ca){
     let c={};
     c.idCategoria=ca.id_categoria;
     c.idNG=medicamento.id_nombre_generico;
     fechProtegidoPost('/modificarCategoria',c);
     }else{
          alerta(pagina,'La Categoria seleccionada no es valida');
   }
   }
 async function modificarNG(){

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
        
        medicamento=await medData[0].find(med=>med.id_n_g_p===parseInt(celdas[0].textContent));
        console.log(medicamento);
        eliminarHijos(cuerpo2);
        let tr2=document.createElement('tr');
                           cuerpo2.appendChild(tr2);
                           agregarTdCuerpo(medicamento.id_n_g_p,tr2);
                           agregarTdCuerpo(medicamento.id_nombre_generico,tr2);
                           agregarTdCuerpo(medicamento.nombre_generico,tr2);
                           if(medicamento.estado_nombre_generico===1){
                              agregarTdCuerpo('Activo',tr2);
                           }else{
                               agregarTdCuerpo('Inactivo',tr2);
                           }
                           agregarTdCuerpo(medicamento.id_familia,tr2);
                           agregarTdCuerpo(medicamento.nombre_familia,tr2);
                           agregarTdCuerpo(medicamento.id_categoria,tr2);
                           agregarTdCuerpo(medicamento.nombre_categoria,tr2);
                           agregarTdCuerpo(medicamento.id_forma,tr2);
                           agregarTdCuerpo(medicamento.nombre_forma,tr2);
                           agregarTdCuerpo(medicamento.id_presentacion,tr2);
                           agregarTdCuerpo(medicamento.nombre_presentacion,tr2);
                           if(medicamento.activo_n_g_p===1){
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
    let aNombreValue=inputANombreGenerico.value;
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
    inputANombreGenerico.value="";
    inputFamilia.value="";
    inputCategoria.value="";
    idCategoria.value="";
    idFamilia.value="";
    eliminarHijos(dlCategoria);
    eliminarHijos(dlFamilia);
    fOcultar();
    } 

async function agregarFamilia(){
    let aFamiliaValue=inputAFamilia.value;
    let a=validar(aFamiliaValue.length<1||aFamiliaValue.length>28,pagina,'La Familia es obligatoria y no debe superar los 28 caracteres');
    if(a){
         let b={};
         b.nombreFamilia=aFamiliaValue;
         fechProtegidoPost('/agregarFamilia',b);
    }
    inputAFamilia.value="";
fOcultar();
    } 
async function agregarCategoria(){
     let aCategoriaValue=inputACategoria.value;
     let a=validar(aCategoriaValue.length<1||aCategoriaValue.length>28,pagina,'La Categoria es obligatoria y no debe superar los 28 caracteres');
     if(a){
          let b={};
          b.nombreCategoria=aCategoriaValue;
          fechProtegidoPost('/agregarCategoria',b);
     }
     inputACategoria.value="";
 fOcultar();
     } 
     async function agregarForma(){
          let aFormaValue=inputAForma.value;
          let a=validar(aFormaValue.length<1||aFormaValue.length>28,pagina,'La Forma es obligatoria y no debe superar los 28 caracteres');
          if(a){
               let b={};
               b.nombreForma=aFormaValue;
               fechProtegidoPost('/agregarForma',b);
          }
          inputAForma.value="";
      fOcultar();
          } 
          async function agregarPresentacion(){
               let aPresentacionValue=inputAPresentacion.value;
               let a=validar(aPresentacionValue.length<1||aPresentacionValue.length>28,pagina,'La Familia es obligatoria y no debe superar los 28 caracteres');
               if(a){
                    let b={};
                    b.nombrePresentacion=aPresentacionValue;
                    fechProtegidoPost('/agregarPresentacion',b);
               }
               inputAPresentacion.value="";
           fOcultar();
               } 


       