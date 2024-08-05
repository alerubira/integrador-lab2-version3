import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
function manejadorMedicos(req,res,objeto){
    try {
        
        
    
    switch (objeto) {

        case 'ingresar':
          
        const token = req.query.token;
        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }
       
        verifyToken(token, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token no válido' });
            }
       
            if (decoded.tipoAutorizacion === 3) {
               //let  encabezado = "Bienvenido a Accesos";
                res.render('vistaMedicos', { encabezado });
            } else {
                res.status(403).json({ message: 'Acceso denegado' });
            }
        });
          
          break;
}
}catch (error) {
    console.error(`Error al Procesar el ${objeto} a Medicos`, error);
    res.status(500).send(`Error interno del servidor al procesar el ${objeto} a Medicos`);
}
}
export {manejadorMedicos};