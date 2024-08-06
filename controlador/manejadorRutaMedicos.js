import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { profecionesTodas,especialidadesTodas } from "../modelo/medicoData.js";

let estadoSuces;
async function manejadorMedicos(req,res,objeto){
    try {
        
        let aux;
        let caracteres = req.body;  
        let objet = req.body; 
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
            
                //res.render('medicos',{encabezado,mensajeExito,estadoSuces});
                res.render('vistaMedicos', { encabezado,mensajeExito,estadoSuces });
            } else {
                res.status(403).json({ message: 'Acceso denegado' });
            }
        });
          
          break;
     case 'profecion':
            aux= await profecionesTodas(caracteres);
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
            break;
     case 'crearMedico':
        aux= await verificar(objet,'medico');
          if(!aux.err){
          let suces=await crearMedico(objet);
          estadoSuces=sucess.success;
            res.redirect('/medicos');
        }

          
         
        break;      
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} a Medicos`, error);
    res.status(500).send(`Error interno del servidor al procesar el ${objeto} a Medicos`);
}
    }
    
export {manejadorMedicos};