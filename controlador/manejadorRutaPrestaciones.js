import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { prestacionDatatodos,crearPrestacion,prestacionDataModificar,prestacionDataAgregar } from "../modelo/prestacionData.js";
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
    case 'cambiarProcedimiemto':
        objet=req.body;
        //console.log(objet);
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         e2=await existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento');
         if(e1&&e2){
            aux=await prestacionDataModificar('procedimiento',objet.idPrestacion,objet.idProcedimiento);
            return res.send(aux); 
         }else{
            errorMessage='La prestacion o el procedimiento no existen en la base de datos';
            return res.status(400).send({message:errorMessage});
         }
       
        break 
    case 'cambiarExamen':
        objet=req.body;
        e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
        e2=await existeBd(objet.idExamen,'examen','id_examen');
        if(e1&&e2){
            aux=await prestacionDataModificar('examen',objet.idPrestacion,objet.idExamen);
            return res.send(aux); 
          }else{
            errorMessage='La prestacion o el examen no existen en la base de datos';
            return res.status(400).send({message:errorMessage});
            }
       break;
       case 'agregarPractica':
           objet=req.body;
           aux=await verificar(objet,'nombrePractica');
          // console.log(aux.ValidationError);
           if(aux.errors){
            return res.status(500).send(aux.errors);
           }else{
            aux=await prestacionDataAgregar(objet.nombrePractica,'practica');
            if (aux instanceof Error) {
                console.error("Error en la consulta sql:", aux.message);
                return res.status(500).json({ message: aux.message }); // Devuelve un error HTTP 500 al cliente
     }
            return res.send(aux);
           }
        break;
       case 'agregarProcedimiento':
            objet=req.body;
            aux=await verificar(objet,'nombreProcedimiento');
          // console.log(aux.errors);
            if(aux.errors){
                return res.status(500).send(aux.errors);
            }else{
              aux=await prestacionDataAgregar(objet.nombreProcedimiento,'procedimiento');
              if (aux instanceof Error) {
                console.error("Error en la consulta sql:", aux.message);
                return res.status(500).json({ message: aux.message }); // Devuelve un error HTTP 500 al cliente
     }
              return res.send(aux);
            }
        break;
       case 'agregarExamen':
            objet=req.body;
            aux=await verificar(objet,'nombreExamen');
            //console.log(aux);
            if(aux.errors){
                return res.status(500).send(aux.errors);
            }else{
                aux=await prestacionDataAgregar(objet.nombreExamen,'examen');
                 if (aux instanceof Error) {
                            console.error("Error en la consulta sql:", aux.message);
                            return res.status(500).json({ message: aux.message }); // Devuelve un error HTTP 500 al cliente
                 }
                return res.send(aux);
                 }
                

        break;                    
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} en Prestaciones`, error);
    return res.status(500).send(error.message);
}
    }
    
export {manejadorPrestaciones};