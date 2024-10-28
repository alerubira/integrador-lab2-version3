let nombrePracticaDL=document.getElementById("nombrePractica");

let practica=document.getElementById('nombre_prestacion');
let practicaMomentanea;
let procedimientDL=document.getElementById('procedimiento');

let procedimiento=document.getElementById('procedimiento_prestacion');
let examenDL=document.getElementById('examen');
let inputNombrePrestacion= document.getElementById('nombre_prestacion');

let examen=document.getElementById('examen_prestacion');
let ladoDL=document.getElementById('lado');

let nombrePrestacion=document.getElementById('nombre_prestacion');
nombrePrestacion.addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const lista = document.getElementById('listaPrestaciones');
    
    // Limpiar la lista antes de agregar las opciones filtradas
    lista.innerHTML = '';
  
    // Filtrar prestaciones basadas en la entrada del usuario
    const filtradas = presAprobadas.filter(pres => 
      pres.nombre_practica.toLowerCase().includes(input)
    );
  
    // Crear una lista de elementos li con las prestaciones filtradas
    filtradas.forEach(pres => {
      let li = document.createElement('li');
      li.textContent = `${pres.nombre_practica}-${pres.nombre_procedimiento}-${pres.nombre_examen}`;
      li.setAttribute('data-id', pres.id_prestacion);
       // Agregar una clase para CSS
      li.classList.add('boton');
      
      // Añadir evento al hacer clic en una opción
      li.addEventListener('click', function() {
        inputNombrePrestacion.value =`${pres.nombre_practica}-${pres.nombre_procedimiento}-${pres.nombre_examen}` ;
        lista.innerHTML = ''; // Limpiar la lista al seleccionar una opción
        console.log('ID de la prestación seleccionada:', pres.id_prestacion);
        prestacion.idPrestacion=pres.id_prestacion;
      });
  
      lista.appendChild(li);
    });
    const listItems = document.querySelectorAll('li');
    let currentTop = 0; // Posición inicial para el primer <li>
    const spacing = 5; // Espaciado entre los <li>
  
    listItems.forEach((li) => {
      const liHeight = li.offsetHeight; // Calcula la altura del <li>
      li.style.top = `${currentTop}px`; // Posiciona el <li> usando top
      currentTop += liHeight + spacing; // Aumenta el valor de top para el siguiente <li>
    });
  });
  
let ladoPrestacion=document.getElementById('lado_prestacion');
function capturarLado(){
    
        const inputLado = document.getElementById('lado_prestacion').value;
        let opciones = document.querySelectorAll('#lado option');
        let idLadoSeleccionado = null;
      
        // Buscar el id_lado correspondiente al nombre_lado seleccionado
        opciones.forEach(opcion => {
          if (opcion.value === inputLado) {
            idLadoSeleccionado = opcion.getAttribute('data-id');
          }
        });
      
        if (idLadoSeleccionado) {
            lado.nombre=inputLado;
            prestacion.idLado=idLadoSeleccionado;
          
          // Aquí puedes usar el id_lado para lo que necesites, como enviarlo al servidor
        } else {
          lado.nombre="No se Requiere";
          prestacion.idLado=null;
        }
     inputLado.value=null; 
      
}
let indicacion=document.getElementById('indicacionPrestacion');
let justificacion=document.getElementById('justificacionPrestacion');
let observacion=document.getElementById('observacionPrestacion');
async function agregarPrestacionCompleta(event){
  event.preventDefault(); // Prevenir el envío del formulario
  lado.nombre="";
    capturarLado();
bandera=true;
if(!validar(!prestacion.idPrestacion,pagina,'NO HAY prestacion seleccionada')){bandera=false};
if(!validar(!indicacion.value,pagina,'La Indicacion es Obligatoria')){bandera=false};
if(!validar(!justificacion.value,pagina,'La Justificacion es Obligatoria')){bandera=false};
if(!validar(!nombrePrestacion.value,pagina,'El Nombre de la Prestacion es Obligatorio')){bandera=false};
console.log(prestacionesPrescripcion);
console.log(prestacion.idPrestacion);
let a=await prestacionesPrescripcion.find(p=>p.idPrestacion===prestacion.idPrestacion);
console.log(a);
if(!validar(a,pagina,"La Practica ya se encuentra en la Prescripcion,no se puede recetar la misma Practica")){bandera=false}
if(bandera){
prestacion.indicacion=indicacion.value;
prestacion.justificacion=justificacion.value;
prestacion.observacion=observacion.value;
prestacionesPrescripcion.push(prestacion);
prestacion={};
let divAux=document.createElement('div');
divAux.classList.add('divAuxiliar');
let p=document.createElement('h6');

p.textContent=`PRESTACION : ${nombrePrestacion.value}---Lado: ${lado.nombre}`;
divAux.appendChild(p);
let p1=document.createElement('h6'); 
p1.textContent=`INDICACION : ${indicacion.value}`
divAux.appendChild(p1);
let p2=document.createElement('h6');
p2.textContent=`JUSTIFICACION : ${justificacion.value}`;
divAux.appendChild(p2);
let p3=document.createElement('h6');
p3.textContent=`observacion : ${observacion.value}`;
divAux.appendChild(p3);
divMedicamentoPrestacion.appendChild(divAux);
limpiarCampos(limpiarPr);


 //inputNombreMedicamento.innerHTML="";
 
 //nombrePracticaDL.innerHTML="";
 
 
 
 // Restablecemos el valor a la opción inicial
 selectElement.value = 'j'; // O el valor que corresponda a la opción inicial
 fOcultar();
}
}
    