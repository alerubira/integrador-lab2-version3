import { verifyToken } from "./manejadorDeRutasLogin.js";
import { buscarMID } from "../modelo/medicoData.js";
import { retornarError } from "./funsionesControlador.js";
import { Medico } from "../modelo/clasesEntidad.js";
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
            
             res.render('vistaPrescripcion', { encabezado ,profecional});
              
           } 
       });
      
  }catch (error) {
      console.error(`Error al Procesar La Prescripcion`, error);
      return retornarError(res,`Error al procesar el acceso a la Prescripcion:${error}`)
  }
  }
  export{manejadorAccesoPrescripcion};