import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { prestacionDatatodos,crearPrestacion,prestacionDataModificar,prestacionDataAgregar } from "../modelo/prestacionData.js";
//import { medicoDatatodos,medicoDataModificar,crearMedico } from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";
//import { Medico } from "../modelo/clasesEntidad.js";
import {  existeBd ,existeNombreBd} from "../modelo/conexxionBD.js";
import { retornarError } from "./funsionesControlador.js";
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
            return retornarError(res,'La practica no existe en la base de datos');
        }
        if(!existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento')){
            return retornarError(res,'El Procedimiento no existe en la base de datos');
        }
        if(!existeBd(objet.idExamen,'examen','id_examen')){
            return retornarError (res,'El Examen no existe en la base de datos');
        }
        //verificar que la prestacion no exista en la base de datos
          let suces=await crearPrestacion(objet);
          if (suces instanceof Error) {return retornarError(res,`Error al crear la Prestacion ${suces.message}`)}
                return res.send(suces);
            break;
       case 'modificarEsatdo':
         objet=req.body;
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         if(e1){
            aux=await prestacionDataModificar('estado',objet.idPrestacion,objet.estadoPrestacion) ;
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el Estado de la Prestacion ${aux.message}`)}
            return res.send(aux);
         }else{
            return retornarError(res,'La Prestacion no existe en la base de datos');
         }
        
        break 
    case 'cambiarProcedimiemto':
        objet=req.body;
        //console.log(objet);
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         e2=await existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento');
         if(e1&&e2){
            aux=await prestacionDataModificar('procedimiento',objet.idPrestacion,objet.idProcedimiento);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el Estado del Procedimiento ${aux.message}`)}
            return res.send(aux); 
         }else{
            return retornarError(res,'La prestacion o el procedimiento no existen en la base de datos');
         }
       
        break 
    case 'cambiarExamen':
        objet=req.body;
        e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
        e2=await existeBd(objet.idExamen,'examen','id_examen');
        if(e1&&e2){
            aux=await prestacionDataModificar('examen',objet.idPrestacion,objet.idExamen);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el El Examen ${aux.message}`)}
            return res.send(aux); 
          }else{
            return retornarError(res,'La prestacion o el examen no existen en la base de datos');
            }
       break;
       case 'agregarPractica':
           objet=req.body;
           aux=await verificar(objet,'nombrePractica');
           if(aux.errors){return retornarError(res,`El nombre de la Prestacion no es valido,${aux.message}`)}
           aux=await existeNombreBd(objet.nombrePractica,'practica','nombre_practica');
           if(aux){return retornarError(res,'el nombre de la Practica ya existe , coloque uno distinto') }
            aux=await prestacionDataAgregar(objet.nombrePractica,'practica');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar Practica,${aux.message}`)}
            return res.send(aux);
           break;
       case 'agregarProcedimiento':
            objet=req.body;
            aux=await verificar(objet,'nombreProcedimiento');
            if(aux.errors){return retornarError(res,`El nombre del Procedimiento no es valido,${aux.message}`)}
            aux=await existeNombreBd(objet.nombreProcedimiento,'procedimiento','nombre_procedimiento');
            if(aux){return retornarError(res,'el nombre del Procedimiento  ya existe , coloque uno distinto') }
            aux=await prestacionDataAgregar(objet.nombreProcedimiento,'procedimiento');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar el Procedimiento,${aux.message}`)}
             return res.send(aux);
            break;
       case 'agregarExamen':
            objet=req.body;
            aux=await verificar(objet,'nombreExamen');
            if(aux.errors){return retornarError(res,`El nombre del Eamen no es valido:${aux.message}`)}
            aux=await existeNombreBd(objet.nombreExamen,'examen','nombre_examen');
            if(aux){return retornarError(res,'el nombre del Examen  ya existe , coloque uno distinto') }
             aux=await prestacionDataAgregar(objet.nombreExamen,'examen');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar Examen:${aux.message}`)}
            return res.send(aux);
             break;                    
    }
}catch (error) {
    return retornarError(res,`Error al precesar ${objeto} en Prestaciones , ${error.message}` )
    
}
    }
    
export {manejadorPrestaciones};