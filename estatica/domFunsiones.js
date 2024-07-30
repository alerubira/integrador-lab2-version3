
 let ocultar=document.getElementsByClassName('ocultar');
let limpiar=document.querySelectorAll('.limpiar');
let divAlerta=document.getElementById('divAlerta');
let divExito=document.getElementById('divExito');
let pagina;
let cla=/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,}).*$/;
limpiarCampos(limpiar);

 function fOcultar(){
            
        for (let elemento of ocultar) {
            elemento.style.display = 'none';
                }
        }
function limpiarCampos(list){
    //console.log(list);
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
         event.preventDefault(); // Previene el envío del formulario
         return false;
        }else{
            return true;
        }}
 async function fech(input, endpoint) {
            try {
                console.log(`input en fech: ${input}`);
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

//export{Focultar};

