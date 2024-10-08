import { existeBd } from "../modelo/conexxionBD.js"
import { retornarError } from "./funsionesControlador.js";
let aux,objet;

async function verificarREFEPS(req,res){
objet=req.body;
console.log(objet);
aux=await existeBd(objet.refepsProfecional,'refeps_argentina','numero_refeps');
console.log(aux);
if(aux instanceof Error){return retornarError(res,`Error al verificar el REFEPS :${aux}`)}
return res.send(aux);
}
export{verificarREFEPS}