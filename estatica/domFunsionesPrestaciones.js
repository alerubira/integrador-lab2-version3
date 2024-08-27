
function cambiarEstado(){
    //construir endpoin,hacer modificacion
    let p={};
    p.idPersona=prestacion.idPersona;
    if(prestacion.estadoMedico===1){
         p.estadoMedico=false;
    }else{
         p.estadoMedico=true;
    }
    fechProtegidoPost('/cambiarEstado',p);
    }             
                   
    async function modificarEspecialidad(){
    let nuevaEspecialidadValue=inputNuevaEspecialidad.value;
    
    let es=await especialidades.data.find(no=>no.nombre_especialidad===nuevaEspecialidadValue);
    if(es){
    let m={};
    m.idMedico=prestacion.idMedico;
    m.idEspecialidad=es.id_especialidad;
    fechProtegidoPost('/cambiarEspecialidad',m);
    }else{
         alerta(pagina,'La especialidad seleccionada no es valida');
    }
    
    }
    function modificarDireccion(){
    let nuevoDomicilioValue=inputNuevoDomicilio.value;
    let domiciliValido=  validar(nuevoDomicilioValue.length<1||nuevoDomicilioValue.length>30,pagina,'El domicilio es obligatorio y no debe exeder los 25 caracteres',event);
    if(domiciliValido){
    let md={};
    md.idMedico=prestacion.idMedico;
    md.domicilioProfecional=nuevoDomicilioValue;
    fechProtegidoPost('/cambiarDireccion',md);
    }   
    }
    async function seleccionarPrestacion(event){
        fOcultar();
        mostrar(divModificarPestacion);
         // Obtener el botón que se hizo clic
         let btn = event.target;
        
         // Encontrar la fila (<tr>) que contiene el botón
         let fila = btn.closest('tr');
        
         // Obtener todas las celdas (<td>) dentro de esa fila
         let celdas = fila.getElementsByTagName('td');
        prestacion={};
         // Recorrer las celdas y obtener los valores
         
         prestacion=await prestaciones.data.find(pre=>pre.id_prestacion===parseInt(celdas[1].textContent));
         console.log(prestacion);
         eliminarHijos(cuerpo2);
         let tr2=document.createElement('tr');
                            cuerpo2.appendChild(tr2);
                            agregarTdCuerpo(prestacion.id_prestacion,tr2);
                            agregarTdCuerpo(prestacion.id_practica,tr2);
                            agregarTdCuerpo(prestacion.nombre_practica,tr2);
                            agregarTdCuerpo(prestacion.id_procedimiento,tr2);
                            agregarTdCuerpo(prestacion.nombre_procedimiento,tr2);
                            agregarTdCuerpo(prestacion.id_examen,tr2);
                            agregarTdCuerpo(prestacion.nombre_examen,tr2);
                            if(prestacion.estado_procedimiento===1){
                                 agregarTdCuerpo('Activo',tr2);
                            }else{
                                 agregarTdCuerpo('Inactivo',tr2);
                            }
        
        }
        