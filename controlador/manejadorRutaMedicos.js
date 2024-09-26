import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { medicoDatatodos,medicoDataModificar,crearMedico ,medicoDataAgregar} from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";
import { Medico } from "../modelo/clasesEntidad.js";
import {  existeBd } from "../modelo/conexxionBD.js";
import { retornarError } from "./funsionesControlador.js";
let estadoSuces;
let mensajeExito;
let objet;
let e1,e2,errorMessage;
async function manejadorMedicos(req,res,objeto){
    try {
         let aux;
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
                 aux= await medicoDatatodos('profeciones');
                res.send(aux);
            break;
        case 'especialidad':
            aux=await medicoDatatodos('especialidades');
            res.send(aux);
                break;
        case 'crearMedico':
            objet = req.body;
            aux= await verificar(objet,'medico');
            if(aux.errors){return retornarError(res,`Los datos del Medico no son compatibles,${aux.message}`)}
             aux=await crearMedico(objet);
            if (aux instanceof Error) {return retornarError(res,`Error al crear el Medico,${aux.message}`)}
                    return res.send(aux);
                break;
        case 'traerTodosMedicos':
            aux=await medicoDatatodos('medicos');
            if (suces instanceof Error) {return retornarError(res,`Error al traer los Medicos,${suces.message}`)}
            
                let medicos=[];
                let medico;
                for(let m of aux){
                
                medico= new Medico(m.id_medico,m.id_persona,m.nombre,m.apellido,m.dni_persona,m.domicilio,m.id_profecion,m.nombre_profecion,m.id_especialidad,m.nombre_especialidad,m.matricula_profecional,m.id_refeps,m.estado_medico);
                medicos.push(medico);
                }
            return res.send(medicos);
             break  
        case 'cambiarEstado':
            objet=req.body;
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            if(!e1){return retornarError(res,`El medico no exista`)}
            if(e1 instanceof Error){return retornarError(res,`Error al buscar si existe ${e1.message}`)}
            aux=await medicoDataModificar('estado',objet.idPersona,objet.estadoMedico) ;
            if(aux instanceof Error){return retornarError(res,`Error al modificar el estado del Medico,${aux.message}`)}
            return res.send(aux);
            break 
        case 'cambiarEspecialidad':
            objet=req.body;
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            e2=await existeBd(objet.idEspecialidad,'especialida','id_especialidad');
            //controlar el error
            if(e1||e2 instanceof Error){return retornarError(res,`Erroe al buscar si existe,${Error.message}`)}
            if(e1&&e2){
                aux=await medicoDataModificar('especialidad',objet.idMedico,objet.idEspecialidad);
                if(aux instanceof Error){return retornarError(res,`Error al modificar la Especialidad,${aux.message}`)}
                return res.send(aux); 
            }else{
                return retornarError(res,'El Medico o la Especialidad no existen en la base de datos')
            }
        
            break 
        case 'cambiarDireccion':
            objet=req.body;
            let dom={domicilioProfecional:objet.domicilioProfecional};
            aux=await verificar(dom,'domicilio');
            if(aux.errors){return retornarError(res,`Error al verificar la tipologia del Domicilio,${aux.message}`)}
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe,${e1.message}`)}
            if(e1){
                    aux=await medicoDataModificar('domicilio',objet.idMedico,objet.domicilioProfecional);
                    if(aux instanceof Error){return retornarError(res,`Error al modificar el Domicilio,${aux.message}`)}
                    return res.send(aux);
                }else{
                    return retornarError(res,'El Medico no existe en la base de datos');
                }
                 break;
            case 'agregarProfecion':
                objet=req.body;
                aux=await verificar(objet,'nombreProfecion');
                if(aux.errors){ return retornarError(res,`Error al verificar la tipologia de la Profecion,${aux.message}`)}
               //verificar que el nombre no exista en la base de datos
                aux=await medicoDataAgregar(objet.nombreProfecion,'profecion');
                if (aux instanceof Error) {return retornarError(res,`Error al agregar Profecion a la base de datos,${aux.message}`)}
                 return res.send(aux);  
            break;
        case 'agregarEspecialidad'://realizar lo mismo que en agregarProfecion
                objet=req.body;
                aux=await verificar(objet,'nombreEspecialidad');
                if(aux.errors){
                    return res.status(500).send(aux.errors);
                }else{
                    aux=await medicoDataAgregar(objet.nombreEspecialidad,'especialidad');
                    if (aux instanceof Error) {
                                console.error("Error en la consulta sql:", aux.message);
                                return res.status(500).json({ message: aux.message }); // Devuelve un error HTTP 500 al cliente
                    }
                    return res.send(aux);
                    }
                    

            break;                    
                     
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} en Medicos`, error);
    return res.status(500).send(error);
}
}
    
export {manejadorMedicos};