import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { prestacionDatatodos } from "../modelo/prestacionData.js";
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
     case 'crearMedico':
       // console.log(objet);
        objet = req.body;
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
        aux=await medicoDatatodos('medicos');
       // console.log(`aux.error : ${aux.Error}`);
        if(aux.error){
            return res.status(500).send(aux.error);
        }else{
            //console.log(aux);
            let medicos=[];
            let medico;
            for(let m of aux){
            
               medico= new Medico(m.id_medico,m.id_persona,m.nombre,m.apellido,m.dni_persona,m.domicilio,m.id_profecion,m.nombre_profecion,m.id_especialidad,m.nombre_especialidad,m.matricula_profecional,m.id_refeps,m.estado_medico);
               medicos.push(medico);
            }
           return res.send(medicos);
        }
       
        break  
    case 'cambiarEstado':
         objet=req.body;
         e1=await existeBd(objet.idMedico,'medico','id_medico');
        aux=await medicoDataModificar('estado',objet.idPersona,objet.estadoMedico) ;
        //verificar la respuesta
        return res.send(aux);
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
    console.error(`Error al Procesar el ${objeto} a Medicos`, error);
    return res.status(500).send(error);
}
    }
    
export {manejadorPrestaciones};