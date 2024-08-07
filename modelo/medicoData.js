//import { connection } from "./conexxionBD.js";
import { Medico } from './clasesEntidad.js';
import { consulta1 ,pool} from "./conexxionBD.js";
import { crearHash } from "./loginn.js";
let profecionales;
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
/*function agregarMedico(medico,callback){
    const sql = "INSERT INTO `profecional` (`idrefeps`, `nombre`, `apellido`, `documento`, `profecion`, `especialidad`, `domicilio`, `matriculaprofecioinal`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const valores = [medico.refepsProfecional,medico.nombreProfecional,medico.apellidoProfecional,medico.dniProfecional,medico.profecionProfecional,medico.especialidadProfecional,  medico.domicilioProfecional,medico.matriculaProfecional];
    connection.connect(function(err) {
        if (err) {
            callback (err);
        } else {
            connection.query(sql,valores, function(err, result) {
                if (err) {
                    callback (err);
                } else {
                   // console.log(result);
                   // callback(result);
                   if (result.affectedRows > 0) {
                    callback(null,"Inserción exitosa en la base de datos.");
                    // callback(result);
                } else {
                    callback(null,"No se insertaron filas en la base de datos.");
                }
                }
            });
        }
    });
}*/
async function profecionesTodas(){
    let query='SELECT * FROM `profecion` WHERE 1;';
    
    return await consulta1(query);
}
async function especialidadesTodas(){
    let query='SELECT * FROM `especialida` WHERE 1;';
    return await consulta1(query);
}
/*async function crearMedico(Medico) {
    let claveH= await crearHash(Medico.claveProvisoria);
    let usuarioH=await crearHash(Medico.usuarioProvisorio);
    return new Promise((resolve, reject) => {
        connection.beginTransaction((err) => {
            if (err) {
                return connection.rollback(() => {
                    reject(err);
                });
            }
//console.log(`paciente antes de entrar a la query ${paciente.nombre}`);
            connection.query(
                'INSERT INTO `persona`(`nombre`, `apellido`, `dni_persona`, `estado_persona`) VALUES (?,?,?,?)',
                [Medico.nombreProfecional,Medico.apellidoProfecional,Medico.dniProfecional, true],
                (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(error);
                        });
                    }

                    if (results.affectedRows !== 1) {
                        return connection.rollback(() => {
                            reject(new Error('Error al insertar en la tabla persona persona'));
                        });
                    }

                    const id_persona = results.insertId;

                    connection.query(
                        'INSERT INTO `medico`(`id_persona`, `domicilio`, `id_profecion`,`id_especialidad`,`matricula_profecional`,`id_refeps`) VALUES (?,?,?,?,?,?)',
                        [id_persona, Medico.domicilioProfecional, Medico.idProfecion,Medico.idEspecialidad,Medico.matriculaProfecional,Medico.refepsProfecional],
                        (error, results) => {
                            if (error) {
                                return connection.rollback(() => {
                                    reject(error);
                                });
                            }

                            if (results.affectedRows !== 1) {
                                return connection.rollback(() => {
                                    reject(new Error('Error al insertar en la tabla medico'));
                                });
                            }

                            const id_medico = results.insertId;
                            
                            connection.query(
                               
                                'INSERT INTO `login`(`id_medico`, `usuario_login`,`clave_login`,`tipo_autorizacion`,`instancia`) VALUES (?,?,?,?,?)',
                                [id_medico, usuarioH,claveH,Medico.nivelAutorizacion,1],
                                (error, results) => {
                                    if (error) {
                                        return connection.rollback(() => {
                                            reject(error);
                                        });
                                    }

                                    if (results.affectedRows !== 1) {
                                        return connection.rollback(() => {
                                            reject(new Error('Error al insertr en la tabla login'));
                                        });
                                    }

                                    connection.commit((err) => {
                                        if (err) {
                                            return connection.rollback(() => {
                                                reject(err);
                                            });
                                        }
                                        resolve({ success: true });
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    })
    .catch((error) => {
        console.error('Error en la transaccion:', error);
        return { success: false, message: 'Error en la transaccion', error };
    })
    .finally(() => {
        connection.end((err) => {
            if (err) {
                console.error('Error al cerrar la conexión:', err);
            }
        });
    });
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





export{crearMedico,buscarMID,profecionales,profecionesTodas,especialidadesTodas};
