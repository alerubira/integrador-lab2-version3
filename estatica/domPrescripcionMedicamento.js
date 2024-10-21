function capturarAdministracion(){
    
    const inputAdministracion = document.getElementById('administracion_medicamento').value;
    const opciones = document.querySelectorAll('#administracion option');
    let idAdministracion = null;
  
    // Buscar el id_administracion correspondiente al nombre_administracion_medicamento seleccionado
    opciones.forEach(opcion => {
      if (opcion.value === inputAdministracion) {
        idAdministracion = opcion.getAttribute('data-id');
      }
    });
  
    if (idAdministracion) {
        administracion.nombre=inputAdministracion;
        medicamento.idAdministracion=idAdministracion;
      console.log(idAdministracion);
      // Aquí puedes usar el id_lado para lo que necesites, como enviarlo al servidor
    }
 inputAdministracion.value=null; 
  
}
async function capturarMedicamento(){
    medicamento.nombre="";
      capturarAdministracion();
  bandera=true;
  /*if(!validar(!prestacion.idPrestacion,pagina,'NO HAY prestacion seleccionada')){bandera=false};
  if(!validar(!indicacion.value,pagina,'La Indicacion es Obligatoria')){bandera=false};
  if(!validar(!justificacion.value,pagina,'La Justificacion es Obligatoria')){bandera=false};
  if(!validar(!nombrePrestacion.value,pagina,'El Nombre de la Prestacion es Obligatorio')){bandera=false};
  console.log(prestacionesPrescripcion);
  console.log(prestacion.idPrestacion);
  let a=await prestacionesPrescripcion.find(p=>p.idPrestacion===prestacion.idPrestacion);
  console.log(a);
  if(!validar(a,pagina,"La Practica ya se encuentra en la Prescripcion,no se puede recetar la misma Practica")){bandera=false}
  */
 /* if(bandera){
  medicamento.indicacion=indicacion.value;
  medicamento.justificacion=justificacion.value;
  medicamento.observacion=observacion.value;
  medicamentosPrescripcion.push(medicamento);
  medicamento={};
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
  }*/
}
async function agregarPrestacionCompleta(){
    lado.nombre="";
      capturarLado();
  bandera=true;
  if(!validar(!prestacion.idPrestacion,pagina,'NO HAY prestacion seleccionada')){bandera=false};
  if(!validar(!indicacion.value,pagina,'La Indicacion es Obligatoria')){bandera=false};
  if(!validar(!justificacion.value,pagina,'La Justificacion es Obligatoria')){bandera=false};
  if(!validar(!nombreMedicamento.value,pagina,'El Nombre de la Prestacion es Obligatorio')){bandera=false};
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
  
  p.textContent=`PRESTACION : ${nombreMedicamento.value}---Lado: ${lado.nombre}`;
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
let nombreMedicamento=document.getElementById('nombre_medicamento');
nombreMedicamento.addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const lista = document.getElementById('listaMedicamentos');
    
    // Limpiar la lista antes de agregar las opciones filtradas
    lista.innerHTML = '';
  
    // Filtrar medicamentos basadas en la entrada del usuario
    const filtradas = medAprobadas.filter(med => 
      med.nombre_generico.toLowerCase().includes(input)
    );
  
    // Crear una lista de elementos li con los nombresGenericos filtradas
    filtradas.forEach(med => {
      let li = document.createElement('li');
      li.textContent = `${med.nombre_generico}-FORMA FARMACEUTICA:${med.nombre_forma}-PRESENTACION:${med.nombre_presentacion}`;
      li.setAttribute('data-id', med.id_n_g_p);
       // Agregar una clase para CSS
      li.classList.add('boton');
      
      // Añadir evento al hacer clic en una opción
      li.addEventListener('click', function() {
        inputNombrePrestacion.value =`${med.nombre_generico}-FORMA FARMACEUTICA:${med.nombre_forma}-PRESENTACION:${med.nombre_presentacion}`;
        lista.innerHTML = ''; // Limpiar la lista al seleccionar una opción
        console.log('ID de la prestación seleccionada:', med.id_n_g_p);
        medicamento.idNGP=med.id_n_g_p;
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