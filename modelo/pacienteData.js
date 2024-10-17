import { retornarErrorSinRes } from "../controlador/funsionesControlador.js"
import { consulta1 } from "./conexxionBD.js";

let query;
let aux;
async function buscarPacienteDni(dni){
query='CALL obtenerPacientesPorDNI(?)';
aux= await consulta1(query,dni);
return aux[0];
}
async function pacienteTarea(tarea){
    try{
     switch(tarea){
         case 'traerObras':
              query='SELECT * FROM `obra_social` os join plan_obra_social pl on pl.id_obra_social=os.id_obra_social WHERE 1;';
              return await(consulta1(query));
              break
         case 'traerSexos':
             query='SELECT * FROM `sexo` WHERE 1';
             return await(consulta1(query));
             break
         case 'examen':
              query='UPDATE `prestacion` SET `id_examen`=? WHERE id_prestacion=?';
             return await(consulta1(query,modificante,id));
             break; 
             default:
                 return retornarErrorSinRes(`Seleccion:${tarea}, en pacienteTarea,NO VALIDA`);    
     }
 
    }catch(error){
     console.error(`Error al realizar la tarea  ${tarea} `, error);
     return retornarErrorSinRes(`Error en pacienteTarea:${error}`);
    }
 }
 function generarPaciente(paciente) {
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
                [paciente.nombre, paciente.apellido, paciente.dni, paciente.estado],
                (error, results) => {
                    if (error) {
                        return connection.rollback(() => {
                            reject(error);
                        });
                    }

                    if (results.affectedRows !== 1) {
                        return connection.rollback(() => {
                            reject(new Error('Error inserting into persona'));
                        });
                    }

                    const id_persona = results.insertId;

                    connection.query(
                        'INSERT INTO `paciente`(`id_persona`, `fecha_nacimiento`, `id_sexo`) VALUES (?,?,?)',
                        [id_persona, paciente.fechaNacimiento, paciente.sexo],
                        (error, results) => {
                            if (error) {
                                return connection.rollback(() => {
                                    reject(error);
                                });
                            }

                            if (results.affectedRows !== 1) {
                                return connection.rollback(() => {
                                    reject(new Error('Error inserting into paciente'));
                                });
                            }

                            const id_paciente = results.insertId;

                            connection.query(
                                'INSERT INTO `paciente_obra_social_plan`(`id_paciente`, `id_plan`) VALUES (?,?)',
                                [id_paciente, paciente.idPlanObraSocial],
                                (error, results) => {
                                    if (error) {
                                        return connection.rollback(() => {
                                            reject(error);
                                        });
                                    }

                                    if (results.affectedRows !== 1) {
                                        return connection.rollback(() => {
                                            reject(new Error('Error inserting into paciente_obra_social_plan'));
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
        console.error('Transaction error:', error);
        return { success: false, message: 'Transaction error', error };
    })
    .finally(() => {
        connection.end((err) => {
            if (err) {
                console.error('Error closing the connection:', err);
            }
        });
    });
}


export{buscarPacienteDni,pacienteTarea,generarPaciente}