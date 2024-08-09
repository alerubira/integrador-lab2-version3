import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { profecionesTodas,especialidadesTodas,crearMedico ,medicosTodos} from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";

let estadoSuces;
let mensajeExito;
async function manejadorMedicos(req,res,objeto){
    try {
        
        let aux;
       // let caracteres = req.body;  
        
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
            
            aux= await profecionesTodas();
            res.send(aux);
        break;
      case 'especialidad':
         aux=await especialidadesTodas();
         res.send(aux);
            break;
     case 'crearMedico':
       // console.log(objet);
       let objet = req.body;
       //console.log(objet);
        aux= await verificar(objet,'medico');
        
          if(aux.errors){
            return res.status(500).send(aux.errors);
          }else{let suces=await crearMedico(objet);
            if(suces.error){
                //console.log(`suces error : ${suces.error}`);
                return res.status(500).send(suces.error);
            }else{
                estadoSuces=suces.success;
                return res.send(estadoSuces);
                   }
            }
          
            break;
       case 'traerTodosMedicos':
        aux=await medicosTodos();
       // console.log(`aux.error : ${aux.Error}`);
        if(aux.error){
            return res.status(500).send(aux.error);
        }else{
            console.log(aux);
           return res.send(aux);
        }
       
        break           
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} a Medicos`, error);
    return res.status(500).send(error);
}
    }
    
export {manejadorMedicos};