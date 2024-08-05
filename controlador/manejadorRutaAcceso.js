import { encabezado } from "../rutas.js";
import { verifyToken } from "./manejadorDeRutasLogin.js";
 function manejadorAcceso(req,res){
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
      
           if (decoded.tipoAutorizacion === 3) {
              let  encabezado = "Bienvenido a Accesos";
               res.render('vistaAcceso', { encabezado });
           } else {
               res.status(403).json({ message: 'Acceso denegado' });
           }
       });
      
  }catch (error) {
      console.error(`Error al Procesar el Acceso`, error);
      res.status(500).send('Error interno del servidor al procesar el acceso');
  }
  }
  export{manejadorAcceso};