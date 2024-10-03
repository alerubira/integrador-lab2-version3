pagina="Medicamentos";
//const Focultar = require('./domFunsiones.js');
let formularioMedicamentoCrear=document.getElementById('formularioMedicamentoCrear');
let nombreGenerico=document.getElementById('nombreGenerico');
let dlNombreGenerico=document.getElementById('dlNombreGenerico');
let dlCategoria=document.getElementById('dlCategoria');
let dlFamilia=document.getElementById('dlFamilia');
let dlNuevaPresentacion=document.getElementById('dlNuevaPresentacion');
let idNombreGenerico=document.getElementById('idNombreGenerico');
let idForma=document.getElementById('idForma');
let idPresentacion=document.getElementById('idPresentacion');
let idCategoria=document.getElementById('idCategoria');
let idProcedimiento=document.getElementById('idProcedimiento');
let inputCategoria=document.getElementById('categoria');
let inputFamilia=document.getElementById('familia');
let inputForma=document.getElementById('forma');
let inputPresentacion=document.getElementById('presentacion');
let dlForma=document.getElementById('dlForma');
let dlPresentacion=document.getElementById('dlPresentacion');
let divBuscarMedicamentos=document.getElementById('divBuscarMedicamentos');
let divModificarMedicamento=document.getElementById('divModificarMedicamento');
let cuerpo=document.getElementById('cuerpo');
let divNuevaForma=document.getElementById('divNuevaForma');
let divNuevaPresentacion=document.getElementById('divNuevaPresentacion');
let divCMedicamento = document.getElementById('divCrearMedicamento');
let especialidadNuevas=document.getElementById('especialidadNuevas');
let inputNuevaPresentacion=document.getElementById('nuevaPresentacion');
let inputNuevaForma=document.getElementById('nuevaForma');
let dlNuevaForma=document.getElementById('dlNuevaForma');
let botonEstadoNG=document.getElementById('botonEstadoNG');
let botonEstadoM=document.getElementById('botonEstadoM');
let cuerpo2=document.getElementById('cuerpo2');
let divANombreGenerico=document.getElementById('divAgregarNombreGenerico');
let divAFamilia=document.getElementById('divAgregarFamilia');
let divACategoria=document.getElementById('divAgregarCategoria');
let divAFornma=document.getElementById('divAgregarForma');
let divAPresentacion=document.getElementById('divAgregarPresentacion');
let inputNombreGenericoNuevo=document.getElementById('agregarNombreGenerico');
let divNuevaFamilia=document.getElementById('divNuevaFamilia');
let inputNuevaFamilia=document.getElementById('nuevaFamilia');
let dlNuevaFamilia=document.getElementById('dlNuevaFamilia');
let divNuevaCategoria=document.getElementById('divNuevaCategoria');
let inputNuevaCategoria=document.getElementById('nuevaCategoria');
let dlNuevaCategoria=document.getElementById('dlNuevaCategoria');
let inputANombreGenerico=document.getElementById('agregarNombreGenerico');
let inputAFamilia=document.getElementById('agregarFamilia');
let inputACategoria=document.getElementById('agregarCategoria');
let inputAForma=document.getElementById('agregarForma');
let inputAPresentacion=document.getElementById('agregarPresentacion');
let divEstadoNG=document.getElementById('divEstadoNG');
let divEstadoM=document.getElementById('divEstadoM');
let divNuevoNombreG=document.getElementById('divNuevoNombreG');
let inputNNombreG=document.getElementById('nuevoNombreG');

let formas;
let presentaciones;
let nombresGenericos;
let familias;
let categorias;
let bandera;
let banderaAux;
let medicamentos=[];
let medicamento;
let medData;



 document.getElementById('crudMedicamentos').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     fOcultar2();
     let selectedValue = this.value;
     fOcultar();
     switch(selectedValue) {
          case 'crearMedicamento':
               eliminarHijos(dlNombreGenerico);
               eliminarHijos(dlForma);
               eliminarHijos(dlPresentacion);
               nombresGenericos=await traerNombresGenericos();
               formas=await traerFormas();
               presentaciones=await traerPresentaciones();
               llenarDl(dlNombreGenerico,nombresGenericos.data,'nombre_generico');
               llenarDl(dlForma,formas.data,'nombre_forma');
               llenarDl(dlPresentacion,presentaciones.data,'nombre_presentacion');
              
               
               mostrar(divCMedicamento);
               break;
          
          case 'buscarMedicamentos':
              fOcultar();
              eliminarHijos(cuerpo);
              medicamentos=await traerMedicamentos();
              if(medicamentos){
                mostrar(divBuscarMedicamentos);
                for(let m of medicamentos){
                    let tr=document.createElement('tr');
                    cuerpo.appendChild(tr);
                    agregarTdCuerpo(m.id_n_g_p,tr);
                    agregarTdCuerpo(m.id_nombre_generico,tr);
                    agregarTdCuerpo(m.nombre_generico,tr);
                    if(m.estado_nombre_generico===1){
                         agregarTdCuerpo('Activo',tr);
                    }else{
                         agregarTdCuerpo('Inactivo',tr);
                    }
                    agregarTdCuerpo(m.id_familia,tr);
                    agregarTdCuerpo(m.nombre_familia,tr);
                    agregarTdCuerpo(m.id_categoria,tr);
                    agregarTdCuerpo(m.nombre_categoria,tr);
                    agregarTdCuerpo(m.id_forma,tr);
                    agregarTdCuerpo(m.nombre_forma,tr);
                    agregarTdCuerpo(m.id_presentacion,tr);
                    agregarTdCuerpo(m.nombre_presentacion,tr);
                    if(m.activo_n_g_p===1){
                         agregarTdCuerpo('Activo',tr);
                    }else{
                         agregarTdCuerpo('Inactivo',tr);
                    }
                    let btn=document.createElement('button');
                              btn.textContent = 'Seleccionar';
                              btn.className = 'boton';
                              btn.addEventListener('click', seleccionarMedicamento);
                             let td=document.createElement('td');
                             td.appendChild(btn);
                             tr.appendChild(td); 
                              }
                         }          
                  
                break;
          case 'agregarNombreGenerico':
               fOcultar();
               familias=await traerFamilias();
               categorias=await traerCategorias();
               eliminarHijos(dlFamilia);
               eliminarHijos(dlCategoria);
               llenarDl(dlFamilia,familias.data,'nombre_familia')
               llenarDl(dlCategoria,categorias.data,'nombre_categoria');
               mostrar(divANombreGenerico);
               break;
          case 'agregarFamilia':
               fOcultar();
               mostrar(divAFamilia);
               break;
          case 'agregarCategoria':
               fOcultar();
               mostrar(divACategoria);
               break;
          case 'agregarFormaFarmaceutica':
               fOcultar();
               mostrar(divAFornma)
               break;
          case 'agregarPresentacion' :
               fOcultar();
               mostrar(divAPresentacion);
               break;         
          default:
               console.log('Selección no válida');
               alerta(pagina,('Seleccion no valida'));
     }
     document.getElementById("crudMedicamentos").selectedIndex = 0;
});

document.getElementById('modificarMedicamento').addEventListener('change',async function() {
     limpiarCampos(limpiar);
     let selectedValue = this.value;
     fOcultar2();
     switch(selectedValue) {
          case 'estadoMedicamento':
               limpiarCampos(limpiar);
               fOcultar2();
               if(medicamento.activo_n_g_p===1){
                    botonEstadoM.innerText="Inhabilitar";
               }else{
                    botonEstadoM.innerText="Habilitar";
               }
               mostrar(divEstadoM);
              break;
          case 'forma':
               limpiarCampos(limpiar);
               fOcultar2();
               formas=await traerFormas();
               llenarDl(dlNuevaForma,formas.data,'nombre_forma');
               mostrar(divNuevaForma);
               break
          case 'presentacion':
               limpiarCampos(limpiar);
               fOcultar2();
               //eliminarHijos(especialidadNuevas);
               presentaciones=await traerPresentaciones();
               //console.log(examenes.data);
               llenarDl(dlNuevaPresentacion,presentaciones.data,'nombre_presentacion');
               mostrar(divNuevaPresentacion);
               break;
          case 'familia':
               limpiarCampos(limpiar);
               fOcultar2();
               familias=await traerFamilias();
               llenarDl(dlNuevaFamilia,familias.data,'nombre_familia');
               mostrar(divNuevaFamilia);
               break;
          case 'categoria':
               limpiarCampos(limpiar);
               fOcultar2();
               categorias=await traerCategorias();
               llenarDl(dlNuevaCategoria,categorias.data,'nombre_categoria');
               mostrar(divNuevaCategoria);
               break;  
          case 'estadoNombreGenerico':
               limpiarCampos(limpiar);
               fOcultar2();
               if(medicamento.estado_nombre_generico===1){
                    botonEstadoNG.innerText="Inhabilitar";
               }else{
                    botonEstadoNG.innerText="Habilitar";
               }
               mostrar(divEstadoNG);
               break;
          case 'nombreGenerico':
               limpiarCampos(limpiar);
               fOcultar2();
               mostrar(divNuevoNombreG);
               break;                   
               default:
                    console.log('Selección no válida');
                    alerta(pagina,('Seleccion no valida'));  
               break            
     } 
     document.getElementById("modificarMedicamento").selectedIndex = 0;      
     })    


formularioMedicamentoCrear.addEventListener('submit',async function(event) {
     event.preventDefault(); 
     bandera=true;
     let nombreValue=nombreGenerico.value;
     
     let formaValue=inputForma.value;
     let presentacionValue=inputPresentacion.value;
     let objetoEncontrado ;
     objetoEncontrado=await nombresGenericos.data.find(non=>non.nombre_generico===nombreValue);
     banderaAux=validar(!objetoEncontrado,pagina,'Eñ nombre generico no corresponde');
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          idNombreGenerico.value=objetoEncontrado.id_nombre_generico;
     }
    //banderaAux= validar(nombreValue.length<1||nombreValue.length>28||!/^[a-zA-Z]+$/.test(nombreValue),pagina,"El nombre es obligatorio,debe contener menos de 30 letras unicamente",event)
     objetoEncontrado=await formas.data.find(ob=>ob.nombre_forma===formaValue);
     banderaAux=validar(!objetoEncontrado,pagina,'La forma no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          idForma.value=objetoEncontrado.id_forma;
     } 
      objetoEncontrado = await presentaciones.data.find(objeto => objeto.nombre_presentacion === presentacionValue);
     banderaAux= validar(!objetoEncontrado,pagina,'La presentacion no corresponde',event);
     if(!banderaAux){bandera=false};
     if(objetoEncontrado){
          //console.log(objetoEncontrado.id_examen);
          idPresentacion.value= objetoEncontrado.id_presentacion;
          //console.log(idExamen.value);
     }
      if(bandera){
         let medicamentoCreado={idNombreGenerico:parseInt(idNombreGenerico.value),idForma:parseInt(idForma.value),idPresentacion:parseInt(idPresentacion.value)};
         fechProtegidoPost('/crearMedicamento',medicamentoCreado);
        }
});
