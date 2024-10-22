let sexos;
document.getElementById('dniP').addEventListener('input', async function() {
    eliminarHijos(divPacientes);
    let inputDniP = this.value;
    validar(inputDniP.length>8,pagina,'El dni no deve superar los 8 caracteres');
    if (inputDniP.length === 7||inputDniP.length===8) {
        try {
            
            let p={};
           // console.log(`dni antes deir al fetch ${inputDniP}`);
           //usar un fech get protegido para traer los pacientes,hacer endpoin completo
           p.dni =parseInt(inputDniP);
          pacientes=await fechProtegidoPost('/buscarPacientes',p);
          console.log(pacientes);
            // pacientes = await fech(inputDniP, '/buscarPacientes');
            if (pacientes.length>0) {
                sugerirPacientes(pacientes);
            }else{
                
                crearPaciente()
            }
        } catch (error) {
            console.error('Error fetching pacientes:', error);
        }
    }
});
async function traerSexos(){
    let s=await fechProtegido('/traerSexos');
     sexos=s.data;
    console.log(sexos);
    eliminarHijos(selectSexo);
    let opt=document.createElement('option');
    opt.value=null;
    opt.textContent='Elija un sexo';
    selectSexo.appendChild(opt);
    for(let sexo of sexos){
    let opti=document.createElement('option');
    opti.value=sexo.nombre_sexo;
    opti.textContent=sexo.nombre_sexo;
    selectSexo.appendChild(opti);
    
}
}
async function traerObras(a){
let o=await fechProtegido('/traerObras');
obras=o.data;
if(!a){llenarSelecObraS(obras);}
}

 function llenarSelecObraS(obras){
    console.log(obras);
    eliminarHijos(obraSocialSelec);
    let option2 = document.createElement('option');
    option2.value=null;
    option2.textContent='Obra Social';
    obraSocialSelec.appendChild(option2);
    /*for(let ob of obras){
        let option = document.createElement('option');
        option.value = ob.nombre_obra_social;
        option.textContent = ob.nombre_obra_social;
        obraSocialSelec.appendChild(option);
      }*/
      let nombresUnicos = new Set();

for (let ob of obras) {
    // Verifica si el nombre de la obra social ya está en el Set
    if (!nombresUnicos.has(ob.nombre_obra_social)) {
        // Si no está, añade el nombre al Set y crea la opción
        nombresUnicos.add(ob.nombre_obra_social);
        
        let option = document.createElement('option');
        option.value = ob.nombre_obra_social;
        option.textContent = ob.nombre_obra_social;
        obraSocialSelec.appendChild(option);
    }
}
      llenarO(obras);
 } 

 function llenarO(obras) {
    obraSocialSelec.addEventListener("change", function() {
        //console.log(obraSocialSelec.value);
       // console.log(obras);

        // Crear una promesa para manejar el filtrado
        let filtrarObras = new Promise((resolve, reject) => {
            // Filtrar las obras
            let planes = obras.filter(ob => ob.nombre_obra_social === obraSocialSelec.value);
            if (planes) {
                resolve(planes); // Resuelve la promesa con los planes filtrados
            } else {
                reject("No se encontraron planes."); // Rechaza la promesa en caso de error
            }
        });

        // Manejar la promesa
        filtrarObras
            .then(planes => {
                llenarPlan(planes); // Ejecutar llenarPlan después de que se resuelva la promesa
            })
            .catch(error => {
                console.error(error); // Manejar errores si los hay
            });
    });
 }


function crearPaciente(){
selectSexo.style.display="block";
traerObras();
traerSexos();//traer todos los sexos para el nuevo pacienta
let p=document.createElement('p');
p.textContent='El paciente no esta registrado,por favor complete los campos y registrelo';
let buton=document.createElement('button');
buton.classList.add('boton'); // Agregar la clase 'boton'
buton.textContent = 'Registrar';
//buton.addEventListener('click', registrarPaciente);

divPacientes.appendChild(p);
divPacientes.appendChild(buton);
buton.addEventListener('click', (event) => {
event.preventDefault(); // Evitar el envío del formulario
registrarPaciente();
});


selectSexo.addEventListener('change', async function(event) {
// 3. Capturar el valor seleccionado
const valorSeleccionado = event.target.value;
// Hacer algo con el valor seleccionado (por ejemplo, imprimirlo en la consola)
// console.log('Valor seleccionado:', valorSeleccionado);

sexo= await sexos.find(se => se.nombre_sexo===valorSeleccionado);
if(sexo){
inputSexoP.value=sexo.nombre_sexo;
inputSexoP.placeholder=sexo.nombre_sexo;
}else{
alert('La opcion de sexo ingresada no es valida');
}  


});
}


function controlar(input,cartel){
    if(!input||input===undefined){
        alert(cartel);
    }
}
async function registrarPaciente(){
    
    //hacerel paciente con los datos necesarios para la base de datos
    let inputDni=document.getElementById('dniP');
    let inputNombre=document.getElementById('nombreP');
    controlar(inputNombre.value,'El nombre es obligatorio');
    let inputApellido=document.getElementById('apellidoP');
    controlar(inputApellido.value,'El apellido es obligatorio');
    let inputFechaN=document.getElementById('fechaNP');
    controlar(inputFechaN.value,'Lafecha de nacimiento es obligatoria');
    paciente.nombre=inputNombre.value;
    paciente.apellido=inputApellido.value;
    paciente.dni=inputDni.value;
    paciente.estado=true;
    paciente.fechaNacimiento=inputFechaN.value;
    controlar(obraSocialPlan,'La obra social y el plan son obligatorios');
    paciente.idPlanObraSocial=obraSocialPlan.id_plan;
    controlar(sexo,'el sexo es obligatorio y debe elegirse con el seleccionador');
    paciente.sexo=sexo.id_sexo;
    console.log(`Paciente antes de ir al fech ${paciente}`);
   let pacienteCreado=await fechProtegidoPost('/generarPaciente',paciente);
    console.log(pacienteCreado.datos.success);
   if(pacienteCreado.datos.success){
console.log(pacienteCreado.datos.idPaciente);
paciente.idPaciente=pacienteCreado.datos.idPaciente;
    bloquearDiv(divPacientes);
    fOcultar();
    eliminarHijos(divPacientes);
   }
  
    //console.log(`paciente en la funsion registrarPaciente ${paciente.nombre}`);
    //hacer el endpoin para cargar el pacienta
    //ejecutar el fech
    //hacer la queri a la base de datos
} 
function sugerirPacientes(aux) {
    fOcultar();
    // Lógica para sugerir pacientes usando la información recibida en aux
    //console.log('Sugerir pacientes con los datos:', aux);
    for(let paciente of aux){
        //console.log(paciente.nombre);
       // Agregar contenido al label
       let div = document.createElement('div');
       div.className = 'div'; // Agrega la clase 'mi-clase' al div
       // Crear y agregar label para DNI
       let labelDni = document.createElement('label');
       labelDni.className=('label');
       labelDni.textContent = paciente.dni_persona;
       labelDni.htmlFor = 'dniP';
       div.appendChild(labelDni);
       
       // Crear y agregar label para Nombre
       let labelNombre = document.createElement('label');
       labelNombre.className=('label');
       labelNombre.textContent = paciente.nombre;
       labelNombre.htmlFor = 'nombreP';
       div.appendChild(labelNombre);
       
       // Crear y agregar label para Apellido
       let labelApellido = document.createElement('label');
       labelApellido.className=('label');
       labelApellido.textContent = paciente.apellido;
       labelApellido.htmlFor = 'apellidoP';
       div.appendChild(labelApellido);
       console.log(paciente.dni_persona);
       // Crear y agregar el botón
       let buton = document.createElement('button');
       buton.textContent = 'Agregar';
       buton.className='boton';
       buton.addEventListener('click', (event) => {
        event.preventDefault(); // Evitar el envío del formulario
        asignarPaciente(paciente.dni_persona);
    });
       div.appendChild(buton);
       
       // Agregar el div al contenedor principal
       divPacientes.appendChild(div);
       
        divPacientes.appendChild(document.createElement('br')); // Añadir un salto de línea entre inputs
    
    }
       
}
async function asignarPaciente(dniPaciente){
    
    let pacienteM= pacientes.find(persona => persona.dni_persona === dniPaciente);
    if(pacienteM){
        document.getElementById('dniP').value = pacienteM.dni_persona;
        document.getElementById('nombreP').value = pacienteM.nombre;
        document.getElementById('apellidoP').value = pacienteM.apellido;
        document.getElementById('sexoP').value = pacienteM.nombre_sexo;
        document.getElementById('obraSP').value = pacienteM.obraSocial;
        document.getElementById('plan').value = pacienteM.plan;
        document.getElementById('fechaNP').value =convertirFechaISOaFechaLocal(pacienteM.fecha_nacimiento) ;
        let p={};
        p.id_paciente=pacienteM.id_paciente;
        paciente.dni=pacienteM.dni_persona;
       let o=await fechProtegidoPost('/obraSocialPaciente',p);
       console.log(o);
       obras=o[0];
       llenarSelecObraS(obras,true);
    eliminarHijos(divPacientes);
    }else{alerta(pagina,'El DNI no corresponde aun Paciente')}
 }    

function llenarPlan(planes){
    eliminarHijos(planSelec);
    let option2 = document.createElement('option');
    option2.value=null;
    option2.textContent='PLan';
    planSelec.appendChild(option2);
    for(let pl of planes){
        let option = document.createElement('option');
        option.value = pl.nombre_plan;
        option.textContent = pl.nombre_plan;
        planSelec.appendChild(option);
      }
 }
 planSelec.addEventListener("change",async function(){
    //console.log(obrass);
obraSocialPlan=await obras.find(ob=>ob.nombre_plan===planSelec.value);
paciente.idPlanObraSocial=obraSocialPlan.id_plan;
//console.log(`plan obra social seleccionad ${obraSocialPlan.id_plan}`);
 });