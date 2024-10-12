import { verifyToken } from "./manejadorDeRutasLogin.js";
import { buscarMID } from "../modelo/medicoData.js";
 function manejadorAccesoPrescripcion(req,res){
    try {
      /*if (req.user.tipoAutorizacion === 3) {
       
       res.render('vistaAcceso', { encabezado });
     } else {
       res.status(403).json({ message: 'Acceso denegado' });
     }*/
       const token = req.query.token;
       if (!token) {
           return res.status(403).json({ message: 'Token no proporcionado' });
       }
      
       verifyToken(token, (err, decoded) => {
           if (err) {
               return res.status(403).json({ message: 'Token no válido' });
           }
      
           if (decoded.tipoAutorizacion === 2) {
              let  encabezado = "Bienvenido a Prescripcion Electronica";
             //traer un profecional
               res.render('vistaPrescripcion', { encabezado ,profecional});
              
           } else {
               res.status(403).json({ message: 'Acceso denegado' });
           }
       });
      
  }catch (error) {
      console.error(`Error al Procesar La Prescripcion`, error);
      res.status(500).send('Error interno del servidor al procesar la prescripcion');
  }
  }
  export{manejadorAccesoPrescripcion};