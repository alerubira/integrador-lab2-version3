//import { connection } from "./conexxionBD.js";
//import { Medico } from './clasesEntidad.js';
import { consulta1 ,existeBd,pool} from "./conexxionBD.js";
import { retornarErrorSinRes } from "../controlador/funsionesControlador.js";
//import { crearHash } from "./loginn.js";
import { buscarIdPorDni } from './PersonaData.js';
let profecionales;
let query;
async function prestacionDataModificar(modificar,id,modificante){
   try{
    switch(modificar){
        case 'estado':
             query='UPDATE `prestacion` SET `estado_prestacion`=? WHERE id_prestacion=?'
             return await(consulta1(query,modificante,id));
             break
        case 'procedimiento':
            query='UPDATE `prestacion` SET `id_procedimiento`=? WHERE id_prestacion=?';
            return await(consulta1(query,modificante,id));
            break
        case 'examen':
             query='UPDATE `prestacion` SET `id_examen`=? WHERE id_prestacion=?';
            return await(consulta1(query,modificante,id));
            break; 
            default:
                return retornarErrorSinRes(`Seleccion:${modificar}, en prestacionDataModificar,NO VALIDA`);    
    }

   }catch(error){
    console.error(`Error al modificar  ${modificar} `, error);
    return error;
   }
}
async function prestacionDatatodos(traer){
try{
    switch(traer){
     case 'practicas':
        query='SELECT * FROM `practica` WHERE 1;';
        return await consulta1(query);
        break;   
     case 'examenes':
         query='SELECT * FROM `examen` WHERE 1;';
        return await consulta1(query);
        break
     case 'procedimientos':
        query='SELECT * FROM `procedimiento` WHERE 1;';
        return await consulta1(query);
        break
     case 'prestaciones':
         query='SELECT pre.id_prestacion,pre.id_practica,pre.id_procedimiento,pre.id_examen,pra.nombre_practica,pro.nombre_procedimiento,ex.nombre_examen,pre.estado_prestacion FROM `prestacion` pre JOIN `practica` pra ON pre.id_practica=pra.id_practica JOIN `examen` ex on pre.id_examen=ex.id_examen JOIN `procedimiento` pro on pre.id_procedimiento=pro.id_procedimiento WHERE 1';
        return await   consulta1(query);
        break;
    case 'lados':
        query='SELECT * FROM `lado` WHERE 1';
        return await consulta1(query);
        break;    
        default:
            return retornarErrorSinRes(`Seleccion:${traer}, en prestacionDatatodos,NO VALIDA`); 
      }
}catch(error){
    console.error(`Error al buscar  ${traer} `, error);
    return error;
}
}
function buscarMID(id, callback) {
    connection.connect(function(err) {
        if (err) {
            throw err;
        } else{
            
               
            
            connection.query("select id_medico, nombre,apellido,dni_persona,domicilio,nombre_profecion,nombre_especialidad,matricula_profecional FROM persona p JOIN medico m on p.id_persona=m.id_persona join profecion pr on m.id_profecion=pr.id_profecion join especialida es on es.id_especialidad=m.id_especialidad WHERE m.id_medico=?;", [id], function(err, result, fields) {
                if (err) {
                    throw err;
                } else {
                    //console.log(result);
                    let m=new Medico(result[0].id_medico, result[0].nombre,result[0].apellido,result[0].dni_persona,result[0].domicilio,result[0].nombre_profecion,result[0].nombre_especialidad,result[0].matricula_profecional);

                    /*console.log("----------------------");
                    console.log(m);
                    console.log("--------------------------");*/
                   
                    callback(m);
                }
            });
        }
    });
}

/*async function profecionesTodas(){
    let query='SELECT * FROM `profecion` WHERE 1;';
    
    return await consulta1(query);
}
async function especialidadesTodas(){
    let query='SELECT * FROM `especialida` WHERE 1;';
    return await consulta1(query);
}
async function medicosTodos(){
    let query='SELECT p.id_persona,p.nombre,p.apellido,p.dni_persona,p.estado_persona,m.id_medico,m.domicilio,m.id_profecion,m.id_especialidad,m.matricula_profecional,m.id_refeps,pr.nombre_profecion,e.nombre_especialidad FROM `persona` p JOIN `medico` m on m.id_persona = p.id_persona JOIN `profecion` pr on m.id_profecion=pr.id_profecion JOIN `especialida` e on m.id_especialidad=e.id_especialidad WHERE 1'

 return await consulta1(query);
}*/
/*async function cambiarEstado(idPersona,estadoPersona){
let query='UPDATE `persona` SET `estado_persona`=? WHERE id_persona=?'
return await(consulta1(query,estadoPersona,idPersona));
}
async function cambiarEspecialidad(idMedico,idEspecialidad){
    let query='UPDATE `medico` SET `id_especialidad`=? WHERE id_medico=?';
 return await(consulta1(query,idEspecialidad,idMedico));   
    //hacer el upDate
}
async function cambiarDireccion(idMedico,domicilio){
let query='UPDATE `medico` SET `domicilio`=? WHERE id_medico=?';
return await(consulta1(query,domicilio,idMedico));
}*/


async function crearPrestacion(Prestacion) {
    let query='INSERT INTO `prestacion`(`id_practica`, `id_procedimiento`, `id_examen`,`estado_prestacion`) values(?,?,?,?)'
    let respuesta=await consulta1(query,Prestacion.idPractica,Prestacion.idProcedimiento,Prestacion.idExamen,true);
    
   return respuesta;

   
}

async function prestacionDataAgregar(objet,agregar){
    try{
        switch(agregar){
         case 'practica':
            query='INSERT INTO `practica`( `nombre_practica`) VALUES (?)';
            return await consulta1(query,objet);
            break;   
         case 'examen':
             query='INSERT INTO `examen`( `nombre_examen`) VALUES (?)';
            return await consulta1(query,objet);
            break
         case 'procedimiento':
            query='INSERT INTO `procedimiento`(`nombre_procedimiento`) VALUES (?)';
            return await consulta1(query,objet);
            break
            default:
                return retornarErrorSinRes(`Seleccion:${agregar}, en prestacionDataAgregar,NO VALIDA`);
          }
    }catch(error){
        console.error(`Error al agregar  ${agregar} `, error);
        
        return error;
    }
    }



export{prestacionDatatodos,prestacionDataModificar,crearPrestacion,buscarMID,prestacionDataAgregar};
