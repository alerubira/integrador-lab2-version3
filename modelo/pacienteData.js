import { retornarErrorSinRes } from "../controlador/funsionesControlador.js"
import { consulta1 ,pool,existeBd} from "./conexxionBD.js";
import { buscarIdPorDni } from "./PersonaData.js";
let query;
let aux;
async function buscarPacienteDni(dni){
query='CALL obtenerPacientesPorDNI(?)';
aux= await consulta1(query,dni);
return aux[0];
}
async function pacienteTarea(tarea,objeto){
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
        case 'traerOSP':
            query='CALL ObtenerPlanesObraSocialPorPaciente(?)'
            return await consulta1(query,objeto);
            break; 
             default:
                 return retornarErrorSinRes(`Seleccion:${tarea}, en pacienteTarea,NO VALIDA`);    
     }
 
    }catch(error){
     console.error(`Error al realizar la tarea  ${tarea} `, error);
     return retornarErrorSinRes(`Error en pacienteTarea:${error}`);
    }
 }
async function generarPaciente(paciente) {
    //let usuarioH = await crearHash(Medico.usuarioProvisorio);

    let connection;
    try {
        connection = await pool.getConnection();
        await connection.beginTransaction();
        let p=await existeBd(paciente.dni,'persona','dni_persona');
        let id_persona;
        if(p){
            let resultado=await  buscarIdPorDni(paciente.dni);
            if(!resultado.error){
                id_persona=resultado[0].id_persona;
            }
        }else{
            const [personaResult] = await connection.execute(
                'INSERT INTO `persona`(`nombre`, `apellido`, `dni_persona`) VALUES (?,?,?)',
                [paciente.nombre, paciente.apellido, paciente.dni]
            );
    
             id_persona = personaResult.insertId;
        }
        
        const [pacienteResult] = await connection.execute(
            'INSERT INTO `paciente`(`id_persona`, `fecha_nacimiento`, `id_sexo`, `estado_paciente`) VALUES (?,?,?,?)',
            
            [id_persona, paciente.fechaNacimiento,paciente.sexo,paciente.estado]
        );

        const id_paciente = pacienteResult.insertId;
        
        const [planResult] = await connection.execute(
            'INSERT INTO `paciente_obra_social_plan`(`id_paciente`, `id_plan`) VALUES (?,?)',
            [id_paciente,paciente.idPlanObraSocial]
        );

        await connection.commit();
        return { success: true };
    } catch (error) {
        if (connection) {
            await connection.rollback();
        }
        console.error('Error en la transacción:', error);
        throw new Error(`Error en la Transaccion:${error}`);
    } finally {
        if (connection) {
            connection.release(); // Devolvemos la conexión al pool
        }
    }
}


export{buscarPacienteDni,pacienteTarea,generarPaciente}