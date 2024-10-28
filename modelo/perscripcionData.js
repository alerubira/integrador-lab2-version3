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
        let connection;
        let prescripciones=[];
        let precripcion={};
        let medicamento={};
        let prestacion={};
        let medicamentos=[];
        let prestaciones=[];
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
export{crearPrescripcion,prescripcionDataTraer}    