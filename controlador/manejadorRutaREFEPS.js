import { existeBd } from "../modelo/conexxionBD.js"
import { retornarError } from "./funsionesControlador.js";
let aux,objet;

async function verificarREFEPS(req,res){
objet=req.body;
aux=await existeBd(objet.refepsProfecional,'refeps_argentina','numero_refeps');
if(aux instanceof Error){return retornarError(res,`Error al verificar el REFEPS :${aux}`)}
return res.send(aux);
}
export{verificarREFEPS}