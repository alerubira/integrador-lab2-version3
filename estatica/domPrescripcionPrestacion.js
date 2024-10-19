let nombrePracticaDL=document.getElementById("nombrePractica");
(async function(){ //traer bien las prestaciones con fec protegido armar endpoin
    let auxPractica=new Set();
   prestacionesTodas=await fech('*','/prestaciones');
   for(let prestacion of prestacionesTodas){
    if (!auxPractica.has(prestacion.nombre_practica)) {
        // Si no está, añade el nombre al Set y crea la opción
        auxPractica.add(prestacion.nombre_practica);
        
        let option = document.createElement('option');
        option.value = prestacion.nombre_practica;
        option.textContent = prestacion.nombre_practica;
        nombrePracticaDL.appendChild(option);
    }
}
})();
let practica=document.getElementById('nombre_prestacion');
let practicaMomentanea;
let procedimientDL=document.getElementById('procedimiento');
function capturarNombrePrestacion(){
    //console.log(practica.value);
practicaMomentanea=prestacionesTodas.filter(pres=>pres.nombre_practica===practica.value);
//console.log(practicaMomentanea);
if(practicaMomentanea.length<1){
    alert('El nombre de la practica no es valido');
}
for(let pro of practicaMomentanea){
    let option = document.createElement('option');
    option.value = pro.nombre_procedimiento;
    option.textContent = pro.nombre_procedimiento;
    procedimientDL.appendChild(option);
}

}
let procedimiento=document.getElementById('procedimiento_prestacion');
let examenDL=document.getElementById('examen');
let inputNombrePrestacion= document.getElementById('nombre_prestacion');
function capturarProcedimiento(){
   practicaMomentanea=practicaMomentanea.filter(pro=>pro.nombre_procedimiento===procedimiento.value);
   if(practicaMomentanea.length<1){
    alert('El procedimiento seleccionado no cooresponde a la practica')
   }
   for(let exa of practicaMomentanea){
    let option = document.createElement('option');
    option.value = exa.nombre_examen;
    option.textContent = exa.nombre_examen;
    examenDL.appendChild(option);
}

}
let examen=document.getElementById('examen_prestacion');
let ladoDL=document.getElementById('lado');
function capturarExamen(){
practicaMomentanea=practicaMomentanea.find(ex=>ex.nombre_examen===examen.value);
if(!practicaMomentanea){
    alert('El examen no corresponde')
}
for(let lad of lados){
    let option = document.createElement('option');
    option.value = lad.nombre_lado;
    option.textContent = lad.nombre_lado;
    ladoDL.appendChild(option);
}
}
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
  });
  
let ladoPrestacion=document.getElementById('lado_prestacion');
function capturarLado(){
    
        const inputLado = document.getElementById('lado_prestacion').value;
        const opciones = document.querySelectorAll('#lado option');
        let idLadoSeleccionado = null;
      
        // Buscar el id_lado correspondiente al nombre_lado seleccionado
        opciones.forEach(opcion => {
          if (opcion.value === inputLado) {
            idLadoSeleccionado = opcion.getAttribute('data-id');
          }
        });
      
        if (idLadoSeleccionado) {
            lado.nombre=inputLado;
            prestacion.lado=idLadoSeleccionado;
          
          // Aquí puedes usar el id_lado para lo que necesites, como enviarlo al servidor
        } else {
          console.log('Lado no encontrado');
        }
     inputLado.value=null; 
      
}
let indicacion=document.getElementById('indicacionPrestacion');
let justificacion=document.getElementById('justificacionPrestacion');
let observacion=document.getElementById('observacionPrestacion');
function agregarPrestacionCompleta(){
  lado.nombre="";
    capturarLado();
bandera=true;
if(!validar(!prestacion.idPrestacion,pagina,'NO HAY prestacion seleccionada')){bandera=false};
if(!validar(!indicacion.value,pagina,'La Indicacion es Obligatoria')){bandera=false};
if(!validar(!justificacion.value,pagina,'La Justificacion es Obligatoria')){bandera=false};
if(!validar(!nombrePrestacion.value,pagina,'El Nombre de la Prestacion es Obligatorio')){bandera=false};
if(bandera){
prestacion.indicacion=indicacion.value;
prestacion.justificacion=justificacion.value;
prestacion.observacion=observacion.value;
prestacionesPrescripcion.push(prestacion);
let divAux=document.createElement('div');
divAux.classList.add('divAuxiliar');
let p=document.createElement('h6');
let l;
//solucionar andefine para lado cuando no se selecciona lado
if(lado.nombre===undefined){l='No se requiere'}
/*if(lado.nombre!==""){
  l=lado.nombre
   }else{
    lado='No se Requiere'}*/
p.textContent=`PRESTACION : ${nombrePrestacion.value}---Lado: ${l}`;
divAux.appendChild(p);
let p1=document.createElement('h6'); 
p1.textContent=`INDICACION : ${indicacion.value}`
divAux.appendChild(p1);
let p2=document.createElement('h6');
p2.textContent=`JUSTIFICACION : ${justificacion.value}`;
divAux.appendChild(p2);
let p3=document.createElement('h6');
p3.textContent=`${observacion.value}`;
divAux.appendChild(p3);
divMedicamentoPrestacion.appendChild(divAux);
limpiarCampos(indicacion,justificacion,observacion,ladoPrestacion,inputNombrePrestacion);


 ladoPrestacion.innerHTML="";
 
 //nombrePracticaDL.innerHTML="";
 
 const selectElement = document.getElementById('tipo');
 
 // Restablecemos el valor a la opción inicial
 selectElement.value = 'j'; // O el valor que corresponda a la opción inicial
 fOcultar();
}
}
    
