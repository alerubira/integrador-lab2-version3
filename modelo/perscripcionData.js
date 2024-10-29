import { pool } from "./conexxionBD.js";
import { retornarErrorSinRes } from "../controlador/funsionesControlador.js";
async function crearPrescripcion(prescripcion) {

    let connection;
    
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
        
            
           
               
                const [prescripcionResult] = await connection.execute(
                    'INSERT INTO `prescripcion_electronica`(`id_medico`, `id_paciente`,`fecha_prescripcion`,`diagnostico_prescripcion`,`vigencia_prescripcion`,`id_plan`) VALUES (?,?,?,?,?,?)',
                    [prescripcion.idProfecional,prescripcion.idPaciente,prescripcion.fechaA,prescripcion.diagnostico,prescripcion.fechaVC,prescripcion.idPlanObraSocial]
                );
                let id_prescripcion = prescripcionResult.insertId;
            for(let med of prescripcion.medicamentos){
            const [medicamentoPResult] = await connection.execute(
                'INSERT INTO `medicamento_prescripcion`(`id_n_g_p`, `nombre_comercial`, `id_administracion_medicamento`,id_prescripcion) VALUES (?,?,?,?)',
                [med.idNGP, med.nombreComercial,med.idAdministracion,id_prescripcion]
            );
            }
            for(let pre of prescripcion.prestaciones){
                const [prestacionPResult] = await connection.execute(
                    'INSERT INTO `prestacion_prescripcion`(`id_prestacion`, `id_lado`, `indicacion`,`justificacion`,`observacion`,id_prescripcion) VALUES (?,?,?,?,?,?)',
                    [pre.idPrestacion, pre.idLado,pre.indicacion,pre.justificacion,pre.observacion,id_prescripcion]
                );
                }

           await connection.commit();
           return { success: true ,message:'La prescripcion fue creada con exito'};
        
            
        
        
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error en la transacción:', error);
            return retornarErrorSinRes(`Error en la Transaccion:${error}`);
        } finally {
            if (connection) {
                connection.release(); // Devolvemos la conexión al pool
            }
        }
    }
    async function prescripcionDataTraer(objet){
        console.log(objet);
        //probar en la base de datos,no hace falta los dato del medico ni del paciente
        let connection;
        let prescripciones=[];
        prescripciones.prestaciones=[];
        prescripciones.medicamentos=[];
        let precripcion={};
        let medicamento={};
        let prestacion={};
        let medicamentos=[];
        let prestaciones=[];
        let aux=[];
        try {
            connection = await pool.getConnection();
            await connection.beginTransaction();
               const [prescripcionesResult] = await connection.execute(
                'CALL obtener_prescripciones(?, ?)',
                [objet.idProfecional,objet.idPaciente]
                );
                prescripciones=prescripcionesResult[0]
                //console.log(prescripciones);
            for(let preE of prescripciones){
            const [medicamentoPResult] = await connection.execute(
                'SELECT * FROM `medicamento_prescripcion` WHERE id_prescripcion=?',
                [preE.id_prescripcion],
               );
            aux=medicamentoPResult;
            for(let m of aux){
                //m.id_n_g_p traer el medicamento(nombre generico,la forma y la presentacion)
               /* SELECT pre.nombre_presentacion FROM `nombre_generico_presentacion`ngp
JOIN prestacion pre 
on ngp.id_presntacion=pre.id_prestacion
WHERE ngp.id_n_g_p=5 */
            }
               preE.medicamentos=medicamentoPResult;
            const[prestacionResult]=await connection.execute(
                 'SELECT * FROM `prestacion_prescripcion` WHERE id_prescripcion=?',
                 [preE.id_prescripcion],
            ) ;  
            preE.prestaciones=prestacionResult;
              
            }
            console.log(JSON.stringify(prescripciones, null, 2));
            //console.log(prescripciones)
           await connection.commit();
           return { success: true ,message:'Las Prescripciones fueron traidas con exito'};
        
            
        
        
        } catch (error) {
            if (connection) {
                await connection.rollback();
            }
            console.error('Error en la transacción:', error);
            return retornarErrorSinRes(`Error en la Transaccion:${error}`);
        } finally {
            if (connection) {
                connection.release(); // Devolvemos la conexión al pool
            }
        }
    }
export{crearPrescripcion,prescripcionDataTraer}    