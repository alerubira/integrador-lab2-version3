import { verifyToken } from "./manejadorDeRutasLogin.js";
import { buscarMID } from "../modelo/medicoData.js";
import { retornarError } from "./funsionesControlador.js";
import { Medico } from "../modelo/clasesEntidad.js";
import { buscarPacienteDni,pacienteTarea ,generarPaciente} from "../modelo/pacienteData.js";
import { verificar } from "./verificaryup.js";
import { existeBd } from "../modelo/conexxionBD.js";
import { prestacionDatatodos } from "../modelo/prestacionData.js";
let aux;
let objet;
 async function manejadorAccesoPrescripcion(req,res){
    try {
      /*if (req.user.tipoAutorizacion === 3) {
       
       res.render('vistaAcceso', { encabezado });
     } else {
       res.status(403).json({ message: 'Acceso denegado' });
     }*/
       const token = req.query.token;
       if (!token) {
           return retornarError(res,"Token no Proporcionado");
       }
       //let profecional=await buscarMID(req.query.idProfecional);
      // if(profecional instanceof Error){return retornarError(res,`Error al buscar el Profecional:${profecional}`)}
       
       verifyToken(token,async (err, decoded) => {
           if (err) {
               return retornarError(res,`Token no valido:${err}`);
           }
           if(decoded.tipoAutorizacion!==2){return retornarError(res,"El Profecional no tiene el nivel de Autorizacion")}
           if (decoded.tipoAutorizacion === 2) {
              let  encabezado = "Bienvenido a Prescripcion Electronica";
              let p1=await buscarMID(decoded.idSolicitante);
             if(p1 instanceof Error){return retornarError(res,`Error al buscar el Profecional:${p}`)}
             let p=p1[0][0]
             if(p.estado_medico!==1){return retornarError(res,"El Profecional Esta dado de baja")}
            let profecional=new Medico(p.id_medico,null,p.nombre,p.apellido,p.dni_persona,p.domicilio,null,p.nombre_profecion,null,p.nombre_especialidad,p.matricula_profecional,null,p.estado_medico);
            let lados=await prestacionDatatodos('lados');
            if(lados instanceof Error){return retornarError(res,`Error al buscar los lados:${lados}`)}
            let prestaciones=await prestacionDatatodos('prestaciones');
            if(prestaciones instanceof Error){return retornarError(res,`Error al buscar las Prestaciones`)}
            let presAprobadas=await prestaciones.filter(pre=>pre.estado_prestacion===1);
            console.log(presAprobadas);
             res.render('vistaPrescripcion', { encabezado ,profecional,lados,presAprobadas});
              
           } 
       });
      
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
     case 'cambiarEstado':
         objet=req.body;
         e1=await existeBd(objet.idMedico,'medico','id_medico');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el Medico:${e1}`)}
         if(!e1){return retornarError(res,`El medico no existe`)}
         aux=await medicoDataModificar('estado',objet.idMedico,objet.estadoMedico) ;
         if(aux instanceof Error){return retornarError(res,`Error al modificar el estado del Medico,${aux}`)}
         return res.send({ message: "El Estado del Medico fue modificado con exito", datos: aux }); 
         break 
     case 'cambiarEspecialidad':
         objet=req.body;
         e1=await existeBd(objet.idMedico,'medico','id_medico');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el Medico:${e1}`)}
         e2=await existeBd(objet.idEspecialidad,'especialida','id_especialidad');
         if(e2 instanceof Error){return retornarError(res,`Error al verificar si existe la Especialidad:${e2}`)}
         if(e1&&e2){
             aux=await medicoDataModificar('especialidad',objet.idMedico,objet.idEspecialidad);
             if(aux instanceof Error){return retornarError(res,`Error al modificar la Especialidad,${aux}`)}
             return res.send({ message: "La Especialidad fue modificada con exito", datos: aux }); 
         }else{
             return retornarError(res,'El Medico o la Especialidad no existen en la base de datos')
         }
     
         break 
     case 'cambiarDireccion':
         objet=req.body;
         let dom={domicilioProfecional:objet.domicilioProfecional};
         aux=await verificar(dom,'domicilio');
         if(aux.errors){return retornarError(res,`Error al verificar la tipologia del Domicilio,${aux.message}`)}
         e1=await existeBd(objet.idMedico,'medico','id_medico');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe El Medico,${e}`)}
         if(e1){
                 aux=await medicoDataModificar('domicilio',objet.idMedico,objet.domicilioProfecional);
                 if(aux instanceof Error){return retornarError(res,`Error al modificar el Domicilio,${aux}`)}
                 return res.send({ message: "La direccion fue modificada con exito", datos: aux }); 
             }else{
                 return retornarError(res,'El Medico no existe en la base de datos');
             }
              break;
     case 'agregarProfecion':
         objet=req.body;
         aux=await verificar(objet,'nombreProfecion');
         if(aux.errors){ return retornarError(res,`Error al verificar la tipologia de la Profecion,${aux.message}`)}
         aux=await existeNombreBd(objet.nombreProfecion,'profecion','nombre_profecion');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si existe Profecion,${aux}`)}
         if(aux){return retornarError(res,'La profecion ya existe, seleccione otro nombre')}
         aux=await medicoDataAgregar(objet.nombreProfecion,'profecion');
         if (aux instanceof Error) {return retornarError(res,`Error al agregar Profecion a la base de datos,${aux}`)}
           return res.send({ message: "La Profecion fue archivada con exito", datos: aux });   
         break;
     case 'agregarEspecialidad':
             objet=req.body;
             aux=await verificar(objet,'nombreEspecialidad');
             if(aux.errors){return retornarError(res,`Error al verificar la tiologia de la Especialidad,${aux.message}`)}
             aux=await existeNombreBd(objet.nombreEspecialidad,'especialida','nombre_especialidad');
             if(aux instanceof Error){return retornarError(res,`Error al verificar si existe Especialidad,${aux}`)}
             if(aux){return retornarError(res,'La especialidad ya existe,seleccione una nueva')}
             aux=await medicoDataAgregar(objet.nombreEspecialidad,'especialidad');
             if (aux instanceof Error) {return retornarError(res,`Error al agregar la Especialidad,${aux}`)}
             return res.send({ message: "La Especiaidad fue archivada con exito", datos: aux }); 
             break;                    
     default :
     return retornarError(res,'Seleccion no nalida en el manejador Prescripcion')             
         }
}catch (error) {
 return retornarError(res,`Error al procesar el ${accion} en Prescripcion:${error.message}`)
}
  }
  export{manejadorAccesoPrescripcion,manejadorPrescripcion};