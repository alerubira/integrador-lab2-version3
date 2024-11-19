function capturarAdministracion(){
    let opciones = document.querySelectorAll('#administracion  option'); 
    let idAdministracion = null;
  
    // Buscar el id_administracion correspondiente al nombre_administracion_medicamento seleccionado
    opciones.forEach(opcion => {
    
      if (opcion.value === inputAdministracion.value) {
        idAdministracion = opcion.getAttribute('data-id');
      }
    });
  console.log(idAdministracion);
    if (idAdministracion) {
        administracion.nombre=inputAdministracion.value;
        medicamento.idAdministracion=parseInt(idAdministracion);
      
    }
 
  
}
async function capturarMedicamento(event){
  event.preventDefault(); // Prevenir el envío del formulario
    medicamento.nombre="";
      capturarAdministracion();
  bandera=true;
  if(!validar(!medicamento.idNGP,pagina,'NO HAY Medicamento seleccionado ')){bandera=false};
  if(!validar(!medicamento.idAdministracion,pagina,'La Administracion es Obligatoria')){bandera=false};
  
  if(!validar(!inputNombreMedicamento.value,pagina,'El Nombre del Medicamento es Obligatorio')){bandera=false};
  
  let a=await medicamentosPrescripcion.find(m=>m.idNGP===medicamento.idNGP);
  
  if(!validar(a,pagina,"el Medicamento ya se encuentra en la Prescripcion,no se puede recetar el mismo Medicamento")){bandera=false}
  
  if(bandera){
  
   if(marca.value===""){marca.value="No Especificado"}
  medicamento.nombre=inputNombreMedicamento.value;
  medicamento.nombreComercial=marca.value;
  medicamentosPrescripcion.push(medicamento);
  console.log(medicamentosPrescripcion);
  let divAux=document.createElement('div');
  divAux.classList.add('divAuxiliar');
  let divAux1=document.createElement('div');
  divAux1.classList.add('divAuxiliar1');
  let p=document.createElement('h6');
  
  p.textContent=`MEDICAMENTO : ${medicamento.nombre}---ADMINISTRACION: ${administracion.nombre}`;
  
  divAux1.appendChild(p);
  let p1=document.createElement('h6'); 
  p1.textContent=`MARCA COMERCIAL : ${medicamento.nombreComercial}`
  divAux1.appendChild(p1);
  let divAux2=document.createElement('div');
  divAux2.classList.add('divAuxiliar2');
 // Crear el botón 
 let button = document.createElement('button');
 button.classList.add('boton');
  button.textContent = 'Borrar';
  // Crear el input de tipo hidden 
  let hiddenInput = document.createElement('input'); 
  hiddenInput.type = 'hidden'; 
  hiddenInput.value = medicamento.idNGP;
    // Agregar un evento al botón para capturar el nombre del medicamento 
    button.addEventListener('click', (event) => {
      event.preventDefault();
       //alert(`id Medicamento Capturado: ${hiddenInput.value}`);
       eliminarHijos(divAux);
       eliminarObjetoPorId(medicamentosPrescripcion,hiddenInput.value,'idNGP');   
       });
     // Agregar el botón al contenedor divAux
     divAux2.appendChild(hiddenInput);
     divAux2.appendChild(button);
     divAux.appendChild(divAux1)
      divAux.appendChild(divAux2);
  
  divMedicamentoPrestacion.appendChild(divAux);
  limpiarCampos(limpiarM);
  medicamento={};
   // Restablecemos el valor a la opción inicial
   
   selectElement.value = 'j'; // O el valor que corresponda a la opción inicial
   fOcultar();
  }
}

let inputNombreMedicamento=document.getElementById('nombre_medicamento');
inputNombreMedicamento.addEventListener('input', function() {
    const input = this.value.toLowerCase();
    const lista = document.getElementById('listaMedicamentos');
    
    // Limpiar la lista antes de agregar las opciones filtradas
    lista.innerHTML = '';
  
    // Filtrar medicamentos basadas en la entrada del usuario
    const filtradas = medAprobados.filter(med => 
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
        inputNombreMedicamento.value =`${med.nombre_generico}-FORMA FARMACEUTICA:${med.nombre_forma}-PRESENTACION:${med.nombre_presentacion}`;
        lista.innerHTML = ''; // Limpiar la lista al seleccionar una opción
        console.log('ID del medicamento seleccionada:', med.id_n_g_p);
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