import { encabezado } from "../rutas.js";
import { verifyToken } from "./manejadorDeRutasLogin.js";
import { buscarMID } from "../modelo/medicoData.js";
import { retornarError } from "./funsionesControlador.js";//
import { Medico } from "../modelo/clasesEntidad.js";
 async function manejadorAcceso(req,res){
    try {
      /*if (req.user.tipoAutorizacion === 3) {
       
       res.render('vistaAcceso', { encabezado });
     } else {
       res.status(403).json({ message: 'Acceso denegado' });
     }*/
       /*const token = req.query.token;
       if (!token) {
           return res.status(403).json({ message:'Token no proporcionado' });
       }
      
       verifyToken(token, (err, decoded) => {
           if (err) {
               return res.status(403).json({ message: 'Token no válido' });
           }
      
           if (decoded.tipoAutorizacion === 3) {
              let  encabezado = "Bienvenido a Accesos";
               res.render('vistaAcceso', { encabezado });
           } else {
               res.status(403).json({ message: 'Acceso denegado' });
           }
       });*/
        //const toke=req.query;//
        //console.log(req.query.datos);
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
           if(toke.tipoAutorizacion!==3){return retornarError(res,"El Profecional no tiene el nivel de Autorizacion")}
           if (toke.tipoAutorizacion === 3) {
              let  encabezado = "Planilla para Procesar";
              let p1=await buscarMID(toke.idSolicitante);
             if(p1 instanceof Error){return retornarError(res,`Error al buscar el Profecional:${p}`)}
             let p=p1[0][0]
             if(p.estado_medico!==1){return retornarError(res,"El Profecional Esta dado de baja")}
            let profecional=new Medico(p.id_medico,null,p.nombre,p.apellido,p.dni_persona,p.domicilio,null,p.nombre_profecion,null,p.nombre_especialidad,p.matricula_profecional,null,p.estado_medico);
            //let lados=await prestacionDatatodos('lados');
           // if(lados instanceof Error){return retornarError(res,`Error al buscar los lados:${lados}`)}
            //let prestaciones=await prestacionDatatodos('prestaciones');
           // if(prestaciones instanceof Error){return retornarError(res,`Error al buscar las Prestaciones`)}
            //let presAprobadas=await prestaciones.filter(pre=>pre.estado_prestacion===1);
            //let adMedicamentos=await medicamentoDatatodos('administraciones');
            //if(adMedicamentos instanceof Error){return retornarError(res,`Error al buscar Administraciones de Medicamento:${adMedicamentos}`)}
            //let medicamentos=await medicamentoDatatodos('medicamentos');
            //if(medicamentos instanceof Error){return retornarError(res,`Error al buscar Medicamentos:${medicamentos}`)}
            
            //let mNGA=await medicamentos[0].filter(m=>m.estado_nombre_generico===1);
           // let medAprobados=await mNGA.filter(me=>me.activo_n_g_p===1);
            
             res.render('vistaAcceso', { encabezado ,profecional});
              
           } 
      // });
      
  }catch (error) {
      console.error(`Error al Procesar el Acceso`, error);
      res.status(500).send('Error interno del servidor al procesar el acceso');
  }
  }

  export{manejadorAcceso};