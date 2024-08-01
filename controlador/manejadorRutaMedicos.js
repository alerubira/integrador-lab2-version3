import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
function manejadorMedicos(req,res,objeto){
    try {
        
        
    
    switch (objeto) {

        case 'ingresar':
          
        if (req.user.tipoAutorizacion === 3) {
         
            res.render('vistaMedicos', { encabezado });
          } else {
            res.status(403).json({ message: 'Acceso denegado' });
          }
          
          break;
}
}catch (error) {
    console.error(`Error al Procesar el ${objeto} a Medicos`, error);
    res.status(500).send(`Error interno del servidor al procesar el ${objeto} a Medicos`);
}
}
export {manejadorMedicos};