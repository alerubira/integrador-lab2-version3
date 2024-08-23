function cambiarEstado(){
    //construir endpoin,hacer modificacion
    let p={};
    p.idPersona=medico.idPersona;
    if(medico.estadoMedico===1){
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
    m.idMedico=medico.idMedico;
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
    md.idMedico=medico.idMedico;
    md.domicilioProfecional=nuevoDomicilioValue;
    fechProtegidoPost('/cambiarDireccion',md);
    }   
    }
    async function seleccionarMedico(event){
        fOcultar();
        mostrar(divModificarPestacion);
         // Obtener el botón que se hizo clic
         let btn = event.target;
        
         // Encontrar la fila (<tr>) que contiene el botón
         let fila = btn.closest('tr');
        
         // Obtener todas las celdas (<td>) dentro de esa fila
         let celdas = fila.getElementsByTagName('td');
        medico={};
         // Recorrer las celdas y obtener los valores
         
         medico=await medicos.data.find(med=>med.idMedico===parseInt(celdas[1].textContent));
         console.log(medico);
         eliminarHijos(cuerpo2);
         let tr2=document.createElement('tr');
                            cuerpo2.appendChild(tr2);
                            agregarTdCuerpo(medico.idPersona,tr2);
                            agregarTdCuerpo(medico.idMedico,tr2);
                            agregarTdCuerpo(medico.dni,tr2);
                            agregarTdCuerpo(medico.apellido,tr2);
                            agregarTdCuerpo(medico.nombre,tr2);
                            agregarTdCuerpo(medico.idProfecion,tr2);
                            agregarTdCuerpo(medico.profesion,tr2);
                            agregarTdCuerpo(medico.idEspecialidad,tr2);
                            agregarTdCuerpo(medico.especialidad,tr2);
                            agregarTdCuerpo(medico.domicilio,tr2);
                            agregarTdCuerpo(medico.matriculaProfesional,tr2);
                            agregarTdCuerpo(medico.idRefeps,tr2);
                            if(medico.estadoMedico===1){
                                 agregarTdCuerpo('Activo',tr2);
                            }else{
                                 agregarTdCuerpo('Inactivo',tr2);
                            }
        
        }
        