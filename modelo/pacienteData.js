import { retornarErrorSinRes } from "../controlador/funsionesControlador.js"
import { consulta1 } from "./conexxionBD.js";
let query;
let aux;
async function buscarPacienteDni(dni){
query='CALL obtenerPacientesPorDNI(?)';
aux= await consulta1(query,dni);
return aux[0];
}
export{buscarPacienteDni}