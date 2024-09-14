import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { medicamentoDatatodos,medicamentoDataModificar,crearMedicamento,medicamentoDataAgregar } from "../modelo/medicamentoData.js";
//import { medicoDatatodos,medicoDataModificar,crearMedico } from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";
//import { Medico } from "../modelo/clasesEntidad.js";
import {  existeBd,existeNombreBd } from "../modelo/conexxionBD.js";
import { retornarError } from "./funsionesControlador.js";
let estadoSuces;
let mensajeExito;
let objet;
let e1,e2,errorMessage,suces;
async function manejadorMedicamentos(req,res,objeto){
    try {
        
        let aux;
       // let caracteres = req.body;  
        
    switch (objeto) {

        case 'ingresar':
          
        const token = req.query.token;
        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado' });
        }
       
        verifyToken(token, (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: 'Token no válido' });
            }
       
            if (decoded.tipoAutorizacion === 3) {
               //let  encabezado = "Bienvenido a Accesos";
            
                //res.render('medicos',{encabezado,mensajeExito,estadoSuces});
                res.render('vistaMedicamentos', { encabezado });
            } else {
                res.status(403).json({ message: 'Acceso denegado' });
            }
        });
          
          break;
     case 'nombresGenericos':
           aux = await medicamentoDatatodos('nombresGenericos');
           res.send(aux);
        break;     
     case 'formas':
            aux= await medicamentoDatatodos('formas');
            res.send(aux);
        break;
      case 'presentaciones':
         aux=await medicamentoDatatodos('presentaciones');
         res.send(aux);
            break;
     case 'familias':
        aux=await medicamentoDatatodos('familias');
       // console.log(aux);
        res.send(aux);
        break  
     case 'categorias':
        aux=await medicamentoDatatodos('categorias');
        // console.log(aux);
         res.send(aux);  
         break;  
    case 'crearNombreGenerico':
        objet=req.body;
        let a={};
         a.nombreGenerico=objet.nombreGenerico;
        aux=await verificar(a,'nombreGenerico');
        if(aux.errors){
            return res.status(500).send(aux.errors);
        }
        aux=await existeNombreBd(objet.nombreGenerico,'nombre_generico','nombre_generico');
        if(aux){return retornarError(res,'el nombre generico del madicamento ya existe , coloque uno distinto') }
     
        aux=await existeBd(objet.idFamilia,'familia','id_familia')
        if(!aux){return retornarError(res,'La familiano existe en la base de datos')}
        aux=await existeBd(objet.idCategoria,'categoria','id_categoria');   
        if(!aux){return retornarError(res,'La categoria no existe en la base de datos')}
            
         suces=await medicamentoDataAgregar(objet,'nombreGenerico');
        if (suces instanceof Error) {
          console.error("Error en la consulta sql:", suces.message);
          return res.status(500).json({ message: suces.message }); // Devuelve un error HTTP 500 al cliente
        }else{
          return res.send(suces);
        }
        break;         
     case 'crearMedicamento':
        objet = req.body;
       
        if(!existeBd(objet.idForma,'forma_farmaceutica','id_forma')){
            return res.status(500).send(error);
        }
        if(!existeBd(objet.idPresentacion,'presentacion','id_presentacion')){
            return res.status(500).send(error);
        }
           
           suces=await crearMedicamento(objet);
          if (suces instanceof Error) {
            console.error("Error en la consulta sql:", suces.message);
            return res.status(500).json({ message: suces.message }); // Devuelve un error HTTP 500 al cliente
          }else{
            return suces;
          }
          
            break;
      
    case 'modificarEsatdo':
         objet=req.body;
         //console.log(objet);
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         if(e1){
            aux=await prestacionDataModificar('estado',objet.idPrestacion,objet.estadoPrestacion) ;
            return res.send(aux);
         }else{
            errorMessage='La Prestacion no existe en la base de datos';
            return res.status(400).send({message:errorMessage});
         }
        
        break 
    case 'cambiarProcedimiemto':
        objet=req.body;
        //console.log(objet);
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         e2=await existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento');
         if(e1&&e2){
            aux=await prestacionDataModificar('procedimiento',objet.idPrestacion,objet.idProcedimiento);
            return res.send(aux); 
         }else{
            errorMessage='La prestacion o el procedimiento no existen en la base de datos';
            return res.status(400).send({message:errorMessage});
         }
       
        break 
    case 'cambiarExamen':
        objet=req.body;
        e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
        e2=await existeBd(objet.idExamen,'examen','id_examen');
        if(e1&&e2){
            aux=await prestacionDataModificar('examen',objet.idPrestacion,objet.idExamen);
            return res.send(aux); 
          }else{
            errorMessage='La prestacion o el examen no existen en la base de datos';
            return res.status(400).send({message:errorMessage});
            }
       break;
       case 'agregarFamilia':
           objet=req.body;
           aux=await verificar(objet,'nombreFamilia');
           if(aux.errors){return retornarError(res,`Error al verificar el Nombre ${aux.message}`)}
           
           aux=await existeNombreBd(objet.nombreFamilia,'familia','nombre_familia');
           if(aux){return retornarError(res,'el nombre de la Familia ya existe , coloque uno distinto') }
            aux=await medicamentoDataAgregar(objet.nombreFamila,'familia');
            if (aux instanceof Error) {return retornarError(res,`Error en la consulta ${aux.message}`)}
            return res.send(aux);
           break;
       case 'agregarCategoria':
            objet=req.body;
            aux=await verificar(objet,'nombreCategoria');
            if(aux.errors){return retornarError(res,`Error al verificar el nombre ${aux.message}`)}
           aux=await medicamentoDataAgregar(objet.nombreCategoria,'categoria');
            if (aux instanceof Error) {return retornarError(res,`Error en la consulta ${aux.message}`)}
             return res.send(aux);
            break;
       case 'agregarForma':
            objet=req.body;
            aux=await verificar(objet,'nombreForma');
            if(aux.errors){return retornarError(res,`Error al verificar ${aux.message}`)}
            aux=await medicamentoDataAgregar(objet.nombreForma,'forma');
            if(aux instanceof Error) {return retornarError(res,`Error en la consulta ${aux.message}`)}
            return res.send(aux);
            break;      
        case 'agregarPresentacion':
            objet=req.body;
            aux=await verificar(objet,'nombrePresentacion');
            if(aux.errors){return retornarError(res,`Error en la verificacion ${aux.message}`)}
            aux=await medicamentoDataAgregar(objet.nombreExamen,'examen');
            if (aux instanceof Error) {return retornarError(res,`Error en la consulta ${aux.message}`)}
            return res.send(aux);
            break;                  
    }
}catch (error) {
    console.error(`Error al Procesar el ${objeto} en Medicamentos`, error);
    return res.status(500).send(error.message);
}
    }
    
export {manejadorMedicamentos};