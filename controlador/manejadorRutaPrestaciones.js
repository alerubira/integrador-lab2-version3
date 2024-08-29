import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { prestacionDatatodos,crearPrestacion,prestacionDataModificar } from "../modelo/prestacionData.js";
//import { medicoDatatodos,medicoDataModificar,crearMedico } from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";
//import { Medico } from "../modelo/clasesEntidad.js";
import {  existeBd } from "../modelo/conexxionBD.js";
let estadoSuces;
let mensajeExito;
let objet;
let e1,e2,errorMessage;
async function manejadorPrestaciones(req,res,objeto){
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
                res.render('vistaPrestaciones', { encabezado,mensajeExito,estadoSuces });
            } else {
                res.status(403).json({ message: 'Acceso denegado' });
            }
        });
          
          break;
     case 'practica':
        //verificar parctica procedimient y examen em el servidor,que esten en la base de datos
           aux = await prestacionDatatodos('practicas');
           res.send(aux);
        break;     
     case 'examen':
            aux= await prestacionDatatodos('examenes');
            res.send(aux);
        break;
      case 'procedimiento':
         aux=await prestacionDatatodos('procedimientos');
         res.send(aux);
            break;
     case 'todasPrestaciones':
        aux=await prestacionDatatodos('prestaciones');
       // console.log(aux);
        res.send(aux);
        break       
     case 'crearPrestacion':
        objet = req.body;
        if(!existeBd(objet.idPractica,'practica','id_practica')){
            return res.status(500).send(error);
        }
        if(!existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento')){
            return res.status(500).send(error);
        }
        if(!existeBd(objet.idExamen,'examen','id_examen')){
            return res.status(500).send(error);
        }
          let suces=await crearPrestacion(objet);
          console.log(suces);
            if(suces.error){
                //console.log(`suces error : ${suces.error}`);
                return res.status(500).send(suces.error);
            }else{
                //let estadoSuces=suces.success;
                return res.send(suces);
                   }
          
            break;
      
    case 'modificarEsatdo':
         objet=req.body;
         //console.log(objet);
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         if(e1){
            aux=await prestacionDataModificar('estado',objet.idPrestacion,objet.estadoPrestacion) ;
            return res.send(aux);
         }else{
            errorMessage='La Prestacion no existe en la base de datos';
            return res.status(400).send({message:errorMessage});
         }
        
        break 
    case 'cambiarEspecialidad':
        objet=req.body;
        //console.log(objet);
         e1=await existeBd(objet.idMedico,'medico','id_medico');
         e2=await existeBd(objet.idEspecialidad,'especialida','id_especialidad');
         if(e1&&e2){
            aux=await medicoDataModificar('especialidad',objet.idMedico,objet.idEspecialidad);
            return res.send(aux); 
         }else{
            errorMessage='El Medico o la Especialidad no existen en la base de datos';
            return res.status(400).send({message:errorMessage});
         }
       
        break 
    case 'cambiarDireccion':
        objet=req.body;
        let dom={domicilioProfecional:objet.domicilioProfecional};
        aux=await verificar(dom,'domicilio');
        if(aux.errors){
            return res.status(500).send(aux.errors);
          }else{
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            if(e1){
                aux=await medicoDataModificar('domicilio',objet.idMedico,objet.domicilioProfecional);
                return res.send(aux);
            }else{
                errorMessage='El Medico  no existe en la base de datos';
                return res.status(400).send({message:errorMessage});
            }
       
          }
        break;                  
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} a Prestaciones`, error);
    return res.status(500).send(error);
}
    }
    
export {manejadorPrestaciones};