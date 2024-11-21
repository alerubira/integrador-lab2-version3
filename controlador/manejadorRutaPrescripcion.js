import { verifyToken } from "./manejadorDeRutasLogin.js";
import { buscarMID } from "../modelo/medicoData.js";
import { retornarError } from "./funsionesControlador.js";//
import { Medico } from "../modelo/clasesEntidad.js";
import { buscarPacienteDni,pacienteTarea ,generarPaciente} from "../modelo/pacienteData.js";
import { verificar } from "./verificaryup.js";
import { existeBd,traerPorId } from "../modelo/conexxionBD.js";
import { prestacionDatatodos } from "../modelo/prestacionData.js";
import { medicamentoDatatodos } from "../modelo/medicamentoData.js";
import { crearPrescripcion,prescripcionDataTraer,modificarPrescripcion } from "../modelo/perscripcionData.js";
let aux;
let objet;
 async function manejadorAccesoPrescripcion(req,res){
    try {
      //const toke=req.query;//
     // console.log(req.query.datos);
      const datosEncoded = req.query.datos; 
      const datosDecoded = decodeURIComponent(datosEncoded);
       const toke = JSON.parse(datosDecoded);

       //const token = req.query.token;
       /*if (!token) {
           return retornarError(res,"Token no Proporcionado");
       }*/
      // console.log(toke);
      if(!toke){return retornarError(res,"Datos de acceso Invalido")}
       //let profecional=await buscarMID(req.query.idProfecional);
      // if(profecional instanceof Error){return retornarError(res,`Error al buscar el Profecional:${profecional}`)}
       
      /* verifyToken(token,async (err, decoded) => {
           if (err) {
               return retornarError(res,`Token no valido:${err}`);
           }*/
           if(toke.tipoAutorizacion!==2){return retornarError(res,"El Profecional no tiene el nivel de Autorizacion")}
           if (toke.tipoAutorizacion === 2) {
              let  encabezado = "Bienvenido a Prescripcion Electronica";
              let p1=await buscarMID(toke.idSolicitante);
             if(p1 instanceof Error){return retornarError(res,`Error al buscar el Profecional:${p}`)}
             let p=p1[0][0]
             if(p.estado_medico!==1){return retornarError(res,"El Profecional Esta dado de baja")}
            let profecional=new Medico(p.id_medico,null,p.nombre,p.apellido,p.dni_persona,p.domicilio,null,p.nombre_profecion,null,p.nombre_especialidad,p.matricula_profecional,null,p.estado_medico);
            let lados=await prestacionDatatodos('lados');
            if(lados instanceof Error){return retornarError(res,`Error al buscar los lados:${lados}`)}
            let prestaciones=await prestacionDatatodos('prestaciones');
            if(prestaciones instanceof Error){return retornarError(res,`Error al buscar las Prestaciones`)}
            let presAprobadas=await prestaciones.filter(pre=>pre.estado_prestacion===1);
            let adMedicamentos=await medicamentoDatatodos('administraciones');
            if(adMedicamentos instanceof Error){return retornarError(res,`Error al buscar Administraciones de Medicamento:${adMedicamentos}`)}
            let medicamentos=await medicamentoDatatodos('medicamentos');
            if(medicamentos instanceof Error){return retornarError(res,`Error al buscar Medicamentos:${medicamentos}`)}
            
            let mNGA=await medicamentos[0].filter(m=>m.estado_nombre_generico===1);
            let medAprobados=await mNGA.filter(me=>me.activo_n_g_p===1);
            
             res.render('vistaPrescripcion', { encabezado ,profecional,lados,presAprobadas,adMedicamentos,medAprobados});
              
           } 
      // });
      
  }catch (error) {
      console.error(`Error al Procesar La Prescripcion`, error);
      return retornarError(res,`Error al procesar el acceso a la Prescripcion:${error}`)
  }
  }
  async function manejadorPrescripcion(req,res,accion){
    try {
    switch (accion) {
     case 'buscarPacientes':
            aux=await buscarPacienteDni(req.body.dni)
            if(aux instanceof Error){return retornarError(res,`Error al buscar Pacientes:${aux}`)}
            return res.send(aux);
       break;
     case 'traerObras':
             aux=await pacienteTarea('traerObras') ;
             if(aux instanceof Error){return retornarError(res,`Error al buscar las Obras sociales${aux}`)}
             return res.send(aux);
         break;
     case 'traerSexos':
             aux=await pacienteTarea('traerSexos');
             if(aux instanceof Error){return retornarError(res,`Error al buscar sexos:${aux}`)}
             return res.send(aux);
        break;
     case 'generarPaciente':
         objet = req.body;
         aux= await verificar(objet,'paciente');
         if(aux.errors){return retornarError(res,`Los datos del Paciente no son compatibles,${aux.message}`)}
         aux=await existeBd(objet.idPlanObraSocial,'plan_obra_social','id_plan');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Plan:${aux}`)}
         if(!aux){return retornarError(res,'La obra social o el plan seleccionado no existe')}
         aux=await existeBd(objet.sexo,'sexo','id_sexo');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el sexo`)}
         if(!aux){return retornarError(res,"El sexo seleccionado no existe")}
          aux=await generarPaciente(objet);
         if (aux instanceof Error) {return retornarError(res,`Error al crear el Medico,${aux}`)}
         return res.send({ message: "El Paciente fue archivado con exito", datos: aux }); 
             break;
     case 'traerOSP':
        objet=req.body;
    
        aux=await existeBd(objet.id_paciente,'paciente','id_paciente');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Paciente:${aux}`)}
         if(!aux){return retornarError(res,"El Paciente no existe")}
         aux=await pacienteTarea('traerOSP',objet.id_paciente);
         if(aux instanceof Error){return retornarError(res,`Error al buscar obras sociales por Paciente:${aux}`)};
         if(aux.length<1){return retornarError(res,"El Paciente no posee obra social")}
         return res.send(aux);
          break  
     case 'generarPrescripcion':
        
         objet=req.body;
         console.log(objet);
         if(objet.medicamentos.length<1&&objet.prestaciones.length<1){return retornarError(res,'La prescripcion debe tener al menos una prestacion o un medicamento')}
         aux=await verificar(objet,'prescripcion');
         if(aux.errors){return retornarError(res,`Erro al verifiar la tipologia de la prescripcion:${aux.message}`)}
         for(let med of objet.medicamentos){
            aux=await verificar(med,'medicamentos');
            if(aux.errors){return retornarError(res,`Error en la tipologia de un Medicamento dentro de la Prescripcio:${aux.message}`)}
         }
         for(let pre of objet.prestaciones){
            aux=await verificar(pre,'prestaciones');
            if(aux.errors){return retornarError(res,`Error en la tipologia de una Prestacion dentro de la Prescripcion:${aux.message}`)}
         }
         aux=await existeBd(objet.idProfecional,'medico','id_medico');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Medico:${aux}`)}
         if(!aux){return retornarError(res,'El Medico que figura en la Prescripcion no existe')}
         aux=await existeBd(objet.idPaciente,'paciente','id_paciente');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Paciente:${aux}`)}
         if(!aux){return retornarError(res,'El Pacienteque figura en la Prescripcion no existe')}
         aux=await existeBd(objet.idPlanObraSocial,'plan_obra_social','id_plan');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Plan:${aux}`)}
         if(!aux){return retornarError(res,'La obra social o el plan seleccionado no existe')}
        for(let med of objet.medicamentos){
            aux=await existeBd(med.idNGP,'nombre_generico_presentacion','id_n_g_p');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Medicamento:${aux}`)}
            if(!aux){return retornarError(res,'El Medicamento dentro de la Prescripcion  no existe')}
            aux=await existeBd(med.idAdministracion,'administracion_medicamento','id_administracion_medicamento');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe La Administracion del Medicamento:${aux}`)}
            if(!aux){return retornarError(res,'La Administracion del Medicamento dentro de la Prescripcion  no existe')}
            aux=await traerPorId(med.idNGP,`nombre_generico_presentacion`,`activo_n_g_p`,`id_n_g_p`);
            if(aux instanceof Error){return retornarError(res,`Error al buscar el estado del Medicamento:${aux}`)}
            if(aux.activo_n_g_p!==1){return retornarError(res,'El Medicamento dentro de la Prescripcion esta Inhabilitado')}
        }
        for(let pre of objet.prestaciones){
            aux=await existeBd(pre.idPrestacion,'prestacion','id_prestacion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe La Prestacion:${aux}`)}
            if(!aux){return retornarError(res,'La Prestacion dentro de la Prescripcion  no existe')}
            if(pre.idLado!==null){
            aux=await existeBd(pre.idLado,'lado','id_lado');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Lado dentro de la Prestacion:${aux}`)}
            if(!aux){return retornarError(res,'El Lado en la Prestacion dentro de la Prescripcion  no existe')}
               }
               aux=await traerPorId(pre.idPrestacion,`prestacion`,`estado_prestacion`,`id_prestacion`);
               if(aux instanceof Error){return retornarError(res,`Error al buscar el estado de la Prestacion:${aux}`)}
               if(aux.estado_prestacion!==1){return retornarError(res,'La Prestacion dentro de la Prescripcion esta Inhabilitado')}   
            }
            aux=await crearPrescripcion(objet);
            if(aux instanceof Error){return retornarError(res,`Error al crea la Prescripcion Electronica:${aux}`)}    
            return res.send(aux);
        break 
    case 'traerPrescripciones':
    objet=req.body;
    
        aux=await existeBd(objet.idProfecional,'medico','id_medico');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Medico:${aux}`)}
        if(!aux){return retornarError(res,'El Medico no existe no existe')}
        aux=await existeBd(objet.idPaciente,'paciente','id_paciente');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Paciente:${aux}`)}
        if(!aux){return retornarError(res,'El Paciente  no existe')}
        aux=await prescripcionDataTraer(objet);
        if(aux instanceof Error){return retornarError(res,`Error al tarer Prescripciones:${aux}`)}
        return res.send(aux); 
         break 
     case 'modificarPrestacionPrescripcion':
        
         objet=req.body;
         aux=await existeBd(objet.idPrestacionPrescripcion,'prestacion_prescripcion','id_prestacion_prescripcion');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la prestacion dentrp de la Prescripcion:${aux}`)}
         if(!aux){return retornarError(res,'La Prestacion dentro de la Prescripcion no existe')}
         let ob={};
         ob.observacion=objet.observacion;
         aux=await verificar(ob,'observacion');
         if(aux.errors){return retornarError(res,`Erro al verifiar la tipologia de la Ovservacion:${aux.message}`)}
         aux=await modificarPrescripcion(objet);
         if(aux instanceof Error){return retornarError(res,`Error al Modificar la Observacion :${aux}`)}
         return res.send(aux);
     break;
                      
     default :
     return retornarError(res,'Seleccion no nalida en el manejador Prescripcion')             
         }
}catch (error) {
 return retornarError(res,`Error al procesar el ${accion} en Prescripcion:${error.message}`)
}
  }
  export{manejadorAccesoPrescripcion,manejadorPrescripcion};