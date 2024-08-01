import { encabezado } from "../rutas.js";
//import { verifyToken } from "./manejadorDeRutasLogin.js";
async function manejadorAcceso(req,res){
    try {
      if (req.user.tipoAutorizacion === 3) {
       
       res.render('vistaAcceso', { encabezado });
     } else {
       res.status(403).json({ message: 'Acceso denegado' });
     }
      
  }catch (error) {
      console.error(`Error al Procesar el Acceso`, error);
      res.status(500).send('Error interno del servidor al procesar el acceso');
  }
  }
  export{manejadorAcceso};