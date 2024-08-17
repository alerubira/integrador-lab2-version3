//import { connection } from "./conexxionBD.js";
import { Medico } from './clasesEntidad.js';
import { consulta1 ,pool} from "./conexxionBD.js";
import { crearHash } from "./loginn.js";
let profecionales;
let query;
async function medicoDataModificar(modificar,id,modificante){
   try{
    switch(modificar){
        case 'estado':
             query='UPDATE `persona` SET `estado_persona`=? WHERE id_persona=?'
             return await(consulta1(query,modificante,id));
             break
        case 'domicilio':
            query='UPDATE `medico` SET `domicilio`=? WHERE id_medico=?';
            return await(consulta1(query,modificante,id));
            break
        case 'especialidad':
             query='UPDATE `medico` SET `id_especialidad`=? WHERE id_medico=?';
            return await(consulta1(query,modificante,id));
            break; 
    }

   }catch(error){
    console.error(`Error al modificar  ${modificar} `, error);
    return error;
   }
}
async function medicoDatatodos(traer){
try{
    switch(traer){
     case 'profeciones':
         query='SELECT * FROM `profecion` WHERE 1;';
        return await consulta1(query);
        break
     case 'especialidades':
        query='SELECT * FROM `especialida` WHERE 1;';
        return await consulta1(query);
        break
     case 'medicos':
         query='SELECT p.id_persona,p.nombre,p.apellido,p.dni_persona,p.estado_persona,m.id_medico,m.domicilio,m.id_profecion,m.id_especialidad,m.matricula_profecional,m.id_refeps,pr.nombre_profecion,e.nombre_especialidad FROM `persona` p JOIN `medico` m on m.id_persona = p.id_persona JOIN `profecion` pr on m.id_profecion=pr.id_profecion JOIN `especialida` e on m.id_especialidad=e.id_especialidad WHERE 1'
        return await consulta1(query);
        break 
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


async function crearMedico(Medico) {
    let claveH = await crearHash(Medico.claveProvisoria);
    //let usuarioH = await crearHash(Medico.usuarioProvisorio);

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();

        const [personaResult] = await connection.execute(
            'INSERT INTO `persona`(`nombre`, `apellido`, `dni_persona`, `estado_persona`) VALUES (?,?,?,?)',
            [Medico.nombreProfecional, Medico.apellidoProfecional, Medico.dniProfecional, true]
        );

        const id_persona = personaResult.insertId;

        const [medicoResult] = await connection.execute(
            'INSERT INTO `medico`(`id_persona`, `domicilio`, `id_profecion`, `id_especialidad`, `matricula_profecional`, `id_refeps`) VALUES (?,?,?,?,?,?)',
            [id_persona, Medico.domicilioProfecional, Medico.idProfecion, Medico.idEspecialidad, Medico.matriculaProfecional, Medico.refepsProfecional]
        );

        const id_medico = medicoResult.insertId;

        const [loginResult] = await connection.execute(
            'INSERT INTO `login`(`id_medico`, `usuario_login`, `clave_login`, `tipo_autorizacion`, `instancia`,`palabra_clave`) VALUES (?,?,?,?,?,?)',
            [id_medico, Medico.usuarioProvisorio, claveH, Medico.nivelAutorizacion, 1,Medico.palabraClave]
        );

        await connection.commit();
        return { success: true };
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error en la transacción:', error);
        return { success: false, message: 'Error en la transacción', error };
    } finally {
        if (connection) {
            connection.release(); // Devolvemos la conexión al pool
        }
    }
}





export{medicoDatatodos,medicoDataModificar,crearMedico,buscarMID,profecionales};
