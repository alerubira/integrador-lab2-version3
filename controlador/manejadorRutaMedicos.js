import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { profecionesTodas,especialidadesTodas,crearMedico } from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";

let estadoSuces;
let mensajeExito;
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
            res.send(aux);
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
         res.send(aux);
            break;
     case 'crearMedico':
       // console.log(objet);
        aux= await verificar(objet,'medico');
        
          if(!aux.errors){
         /* let suces=await crearMedico(objet);
          estadoSuces=suces.success;
            res.redirect('/medicos');*/
            console.log('crear medico');
        }

          
         
        break;      
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} a Medicos`, error);
    res.status(500).send(`Error interno del servidor al procesar el ${objeto} a Medicos`);
}
    }
    
export {manejadorMedicos};