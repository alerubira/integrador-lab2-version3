//import { connection } from "./conexxionBD.js";
//import { Medico } from './clasesEntidad.js';
import { consulta1 ,existeBd,pool} from "./conexxionBD.js";
//import { crearHash } from "./loginn.js";
//import { buscarIdPorDni } from './PersonaData.js';
let medicamentos;
let query;
let respuesta;
async function medicamentoDataModificar(modificar,id,modificante){
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
    }

   }catch(error){
    console.error(`Error al modificar  ${modificar} `, error);
    return error;
   }
}
async function medicamentoDatatodos(traer){
try{
    switch(traer){
     case 'nombresGenericos':
        query='SELECT * FROM `nombre_generico` WHERE 1;';
        return await consulta1(query);
        break;   
     case 'formas':
         query='SELECT * FROM `forma_farmaceutica` WHERE 1;';
        return await consulta1(query);
        break
     case 'presentaciones':
        query='SELECT * FROM `presentacion` WHERE 1;';
        return await consulta1(query);
        break
     case 'familias':
         query='SELECT * FROM `familia` WHERE 1;';
        return await   consulta1(query);
        break 
     case 'categorias':
        query='SELECT * FROM `categoria` WHERE 1;';
        return await   consulta1(query);
        break;   
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


async function crearMedicamento(medicamento) {
    /* query='INSERT INTO `medicamento`(`id_nombre_generico`, `id_forma`, `id_presentacion`,`id_familia`,`id_categoria`,`estado_prestacion`) values(?,?,?,?,?,?)'
     respuesta=await consulta1(query,medicamento.idNombreGenerico,medicamento.idForma,medicamento.idPresentacion,medicamento.idFamilia,medicamento.idCategoria,true);
    //console.log(respuesta);
   return respuesta;*/
let connection;
    
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        
            const [nombreGenericoFormaResult] = await connection.execute(
                'INSERT INTO `nombre_generico_forma`(`id_nombre_generico`, `id_forma`) VALUES (?,?)',
                [medicamento.idNombreGenerico,medicamento.idForma]
            );
    
             let id_n_g_f = nombreGenericoFormaResult.insertId;
        console.log(id_n_g_f);
        
        const [nombreGenericoPresentacionResult] = await connection.execute(
            'INSERT INTO `nombre_generico_presentacion`(`id_n_g_f`, `id_presentacion`, `activo_n_g_p`) VALUES (?,?,?)',
            [id_n_g_f, medicamento.idPresentacion,true]
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

async function medicamentoDataAgregar(objet,agregar){
    try{
        switch(agregar){
         case 'nombreGenerico':
            query='INSERT INTO `nombre_generico`( `nombre_generico`, `id_familia`,`id_categoria`,`estado_nombre_generico`) values(?,?,?,?)';
            respuesta=await consulta1(query,objet.nombreGenerico,objet.idFamilia,objet.idCategoria,true);
            return respuesta;
            break;   
         case 'familia':
            query='INSERT INTO `familia`( `nombre_familia`) VALUES (?)';
            return await consulta1(query,objet);
            break;   
         case 'categoria':
             query='INSERT INTO `categoria`( `nombre_categoria`) VALUES (?)';
            return await consulta1(query,objet);
            break
         case 'forma':
            query='INSERT INTO `forma_farmaceutica`(`nombre_forma`) VALUES (?)';
            return await consulta1(query,objet);
            break
        case 'presentacion':
            query='INSERT INTO `presentacion`(`nombre_presentacion`) VALUES (?)';
            return await consulta1(query,objet);
            break;    
         
          }
    }catch(error){
        console.error(`Error al agregar  ${agregar} `, error);
        
        return error;
    }
    }



export{medicamentoDatatodos,medicamentoDataModificar,crearMedicamento,medicamentoDataAgregar};
