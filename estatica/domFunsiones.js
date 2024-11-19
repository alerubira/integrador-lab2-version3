//console.log('dom funsiones');
 let ocultar=document.getElementsByClassName('ocultar');
 let ocultar2=document.getElementsByClassName('ocultar2');
let limpiar=document.querySelectorAll('.limpiar');
let limpiarP=document.querySelectorAll('.limpiarP');
let limpiarPr=document.querySelectorAll('.limpiarPr');
let limpiarM=document.querySelectorAll('.limpiarM');
let divAlerta=document.getElementById('divAlerta');
let divExito=document.getElementById('divExito');
let pagina;
let cla=/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,}).*$/;
limpiarCampos(limpiar);
function eliminarObjetoPorId(arreglo, id, propiedad) {
   const indice = arreglo.findIndex(objeto => objeto[propiedad] === Number(id));
      // Si se encuentra el objeto, eliminarlo del arreglo
       if (indice !== -1) {
         arreglo.splice(indice, 1); 
         } else { 
          console.log(`Objeto con ID ${id} no encontrado.`); 
        } 
  }
 function fOcultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
 function fOcultar2(){
    for (let elemento of ocultar2) {
        elemento.style.display = 'none';
            }
 }       
 function mostrar(elemento){
    //fOcultar();
    elemento.style.display = 'block';
 }       
function limpiarCampos(list){
    //console.log(list);
   // list1.textContent="";
    //list1.value=null;
    for (let li of list){
        li.textContent="";
        li.value=null;
    }
}
function eliminarHijos(div) {
    
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}
function alerta(pagina,mensage){
    // Limpiar cualquier contenido anterior antes de añadir nuevos elementos
    divAlerta.innerHTML = '';
    //console.log(pagina);
    p1=document.createElement('p');
    p1.textContent=`ALERTA La pagina ${pagina} dice`;
    divAlerta.appendChild(p1);
    p=document.createElement('p');
    p.textContent=`${mensage}`;
    divAlerta.appendChild(p);
    // Ejecutar la función eliminarHijos después de 6 segundos (6000 milisegundos)
    setTimeout(() => eliminarHijos(divAlerta), 6000);
}
function cartelExito(pagina,mensage){
    // Limpiar cualquier contenido anterior antes de añadir nuevos elementos
    divExito.innerHTML = '';
    //console.log(pagina);
    p1=document.createElement('p');
    p1.textContent=`Exito La pagina ${pagina} dice`;
    divExito.appendChild(p1);
    p=document.createElement('p');
    p.textContent=`${mensage}`;
    divExito.appendChild(p);
    // Ejecutar la función eliminarHijos después de 5 segundos (5000 milisegundos)
    setTimeout(() => eliminarHijos(divExito), 6000);
}
function validar(codicion,pagina,mensage,event){
    if (codicion) {
         alerta(pagina,mensage);
         if(event){
          event.preventDefault(); // Previene el envío del formulario
         }
        
         return false;
        }else{
            return true;
        }}
function llenarDl(dl,array,atributo){
    for(let e of array){
        let op2=document.createElement('option');
        op2.textContent=e[atributo];
        op2.value=e[atributo];
        dl.appendChild(op2);
   }
}        
 async function fech(input, endpoint) {
            try {
                const token = localStorage.getItem('token');
                
                const response = await fetch(endpoint, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'text/plain'
                        

                    },
                    
                        body: input
                    
                    
                });
        
                if (!response.ok) {
                    throw new Error(`Error en la respuesta del fetch: ${response.status} ${response.statusText}`);
                }
        
                const text = await response.text();
                //console.log('Raw response text:', text);
        
                if (!text) {
                    throw new Error('La respuesta del servidor está vacía');
                }
        
                let data;
                try {
                    data = JSON.parse(text);
                } catch (jsonError) {
                    throw new Error(`Error parseando JSON: ${jsonError.message}`);
                }
        
               // console.log('Success cliente:', data); // Maneja la respuesta del servidor aquí
                return data;
            } catch (error) {
                console.error('Error en fech:', error.message); // Maneja los errores aquí
                throw error; // Re-lanzar el error para que pueda ser capturado en el bloque catch
            }
        }  
// Función para verificar si la palabra está en el arreglo de objetos
function contienePalabra(array,propiedad,palabra) {
    console.log(array);
    console.log(propiedad);
    console.log(palabra);
    return array.some(objeto => objeto.propiedad === palabra);
  }
 
limpiarCampos(limpiar);
function volver(){
    history.back();
}
function agregarTdCuerpo(elemento,cuerpo){
    let td=document.createElement('td');
    td.textContent=elemento;
    cuerpo.appendChild(td);
}
async function fechProtegidoPost(endpoin,objeto){
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(endpoin, {
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json' // Este encabezado es necesario para enviar JSON
        },
        body:JSON.stringify(objeto)
        
      });
     
      if (response.ok) {
        const responseBody = await response.json();
        console.log(responseBody);
        if(responseBody===false){return responseBody}
        if(responseBody===true){return responseBody}
       if(responseBody.message) {cartelExito(pagina,`La tarea fue realizada con exito: ${responseBody.message}`);}
        console.log(responseBody);
        
       return responseBody;
      } else {
        const errorData = await response.json();
        console.log(errorData.message);
        alerta(pagina,`Hubo un inconveniente al realizar la tarea: ${errorData.message}`);
      }
    } catch (error) {
     alerta(pagina,`Error al acceder al servidor: ${error.message}`);
      console.error('Error al acceder al endpoint protegido:', error.message);
    }
     }

async function fechProtegido(ruta) {
    const token = localStorage.getItem('token');
    
    try {
      const response = await fetch(ruta, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const responseBody = await response.json();
        return { data: responseBody, error: null };
      } else {
        let error = await response.json();
        console.log(error);
       
        return { data: null, error: new Error(error.message) };
      }
    } catch (error) {
      console.error('Error al acceder al endpoint protegido:', error);
      alerta(pagina,`Error al acceder al servidor: ${error.message}`);
      return { data: null, error: error };
    }
  }
  
  
  
//export{Focultar};

