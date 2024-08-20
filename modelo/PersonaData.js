import { consulta1 } from "./conexxionBD.js";
async function buscarIdPorDni(dni) {
   try {
    let query='SELECT id_persona FROM `persona` WHERE dni_persona=?';
    let idPersona=await consulta1(query,dni);
    return idPersona;
   } catch (error) {
    console.log(`error al buscar el id de l persona : ${error.message}`);
    return error;
   }
}
export{buscarIdPorDni};