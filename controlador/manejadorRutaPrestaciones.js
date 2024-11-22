import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { prestacionDatatodos,crearPrestacion,prestacionDataModificar,prestacionDataAgregar } from "../modelo/prestacionData.js";
//import { medicoDatatodos,medicoDataModificar,crearMedico } from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";
import { Medico } from "../modelo/clasesEntidad.js";
import {  existeBd ,existeNombreBd,existeConjuntoBD} from "../modelo/conexxionBD.js";
import { retornarError } from "./funsionesControlador.js";
import { buscarMID } from "../modelo/medicoData.js";
let estadoSuces;
let mensajeExito;
let objet;
let e1,e2,errorMessage;
async function manejadorPrestaciones(req,res,objeto){
    try {
        
        let aux;
       // let caracteres = req.body;  
        
    switch (objeto) {

        case 'ingresar':
          
        const datosEncoded = req.query.datos; 
        const datosDecoded = decodeURIComponent(datosEncoded);
         const toke = JSON.parse(datosDecoded);
         
         if(!toke){return retornarError(res,"Datos de acceso Invalido")}
         if(toke.tipoAutorizacion!==3){return retornarError(res,"El Profecional no tiene el nivel de Autorizacion")}
         if (toke.tipoAutorizacion === 3) {
            let  encabezado = "Planilla para Procesar Prestaciones";
            let p1=await buscarMID(toke.idSolicitante);
           if(p1 instanceof Error){return retornarError(res,`Error al buscar el Profecional:${p}`)}
           let p=p1[0][0]
           if(p.estado_medico!==1){return retornarError(res,"El Profecional Esta dado de baja")}
          let profecional=new Medico(p.id_medico,null,p.nombre,p.apellido,p.dni_persona,p.domicilio,null,p.nombre_profecion,null,p.nombre_especialidad,p.matricula_profecional,null,p.estado_medico);
          res.render('vistaPrestaciones', { encabezado ,profecional});
         }
   
    
          
          
          break;
     case 'practica':
            aux = await prestacionDatatodos('practicas');
            if(aux instanceof Error){return retornarError(res,`Error al buscar las Practicas:${aux}`)}
           res.send(aux);
        break;     
     case 'examen':
            aux= await prestacionDatatodos('examenes');
            if(aux instanceof Error){return retornarError(res,`Error al buscar los Examenes:${aux}`)}
            res.send(aux);
        break;
      case 'procedimiento':
         aux=await prestacionDatatodos('procedimientos');
         if(aux instanceof Error){return retornarError(res,`Error al buscar los Procedimientos:${aux}`)}
         res.send(aux);
            break;
     case 'todasPrestaciones':
        aux=await prestacionDatatodos('prestaciones');
        if(aux instanceof Error){return retornarError(res,`Error al buscar las Prestaciones:${aux}`)}
        
        res.send(aux);
        break       
     case 'crearPrestacion':
        objet = req.body;
        aux=await existeBd(objet.idPractica,'practica','id_practica');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe La practica`)}
        if(!aux){return retornarError(res,"La Practica seleccionada no existe, seleccione una nueva")}
        aux=await existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Procedimiento`)}
        if(!aux){return retornarError(res,"El Procedimiento seleccionada no existe, seleccione una nueva")}
        aux=await existeBd(objet.idExamen,'examen','id_examen');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Examen`)}
        if(!aux){return retornarError(res,"El Examen seleccionada no existe, seleccione una nueva")}
        aux=await existeConjuntoBD('prestacion','id_prestacion','id_practica','id_examen',objet.idPractica,objet.idExamen);
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la Prestacion:${aux}`)}
        if(aux!==0){return retornarError(res,'La Prestacion ya existe')}
        aux=await existeBd(objet.idProcedimiento,'prestacion','id_procedimiento');
        if (aux instanceof Error){return retornarError(res,`Error al verificar si el Procedimiento ya existe en Prestacion:${aux}`)}
        if (aux){return retornarError(res,'El Procedimiento seleccionada ya pertenece a una Prestacion')}
        aux=await existeBd(objet.idExamen,'prestacion','id_examen');
        if (aux instanceof Error){return retornarError(res,`Error al verificar si existe Examen en Prestacion:${aux}`)}
        if(aux){return retornarError(res,'El Examen ya existe en otra Prestacion, seleccione uno distinto')}
          let suces=await crearPrestacion(objet);
          if (suces instanceof Error) {return retornarError(res,`Error al crear la Prestacion ${suces}`)}
          return res.send({ message: "La Prestacion fue creada  con exito", datos: suces}); 
            break;
       case 'modificarEsatdo':
         objet=req.body;
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe la Prestacion:${e1}`)}
         if(e1){
            aux=await prestacionDataModificar('estado',objet.idPrestacion,objet.estadoPrestacion) ;
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el Estado de la Prestacion ${aux}`)}
            return res.send({ message: "El Esatdo de la Prestacion fue modificada con exito", datos: aux }); 
         }else{
            return retornarError(res,'La Prestacion no existe en la base de datos');
         }
        
        break 
    case 'cambiarProcedimiemto':
        objet=req.body;
         e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe la Prestacion`)}
         e2=await existeBd(objet.idProcedimiento,'procedimiento','id_procedimiento');
         if(e2 instanceof Error){return retornarError(res,`Error al verificar si existe el procedimiento`)}
         aux=await existeBd(objet.idProcedimiento,'prestacion','id_procedimiento');
         if(aux instanceof Error){return retornarError(res,`Error al verificar si el procedimientoya fue utilizado`)}
         if(aux){return retornarError(res,"El Procedimiento seleccionado ya existe en una Prestacion")}
         if(e1&&e2){
            aux=await prestacionDataModificar('procedimiento',objet.idPrestacion,objet.idProcedimiento);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el Estado del Procedimiento ${aux.message}`)}
            return res.send({ message: "El Procedimiento fue modificado con exito", datos: aux }); 
         }else{
            return retornarError(res,'La prestacion o el procedimiento no existen en la base de datos');
         }
       
        break 
    case 'cambiarExamen':
        objet=req.body;
        e1=await existeBd(objet.idPrestacion,'prestacion','id_prestacion');
        if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe la Prestacion:${e1}`)}
        e2=await existeBd(objet.idExamen,'examen','id_examen');
        if(e2 instanceof Error){ return retornarError(res,`Error al verificar si existe el Examen:${e2}`)}
        aux=await existeBd(objet.idExamen,'prestacion','id_examen');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si Examen existe en Prestacion`)}
        if(aux){return retornarError(res,"El Examen ya pertenece a ota Pretacion,seleccione uno nuevo")}
        if(e1&&e2){
            aux=await prestacionDataModificar('examen',objet.idPrestacion,objet.idExamen);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el El Examen ${aux.message}`)}
            return res.send({ message: "El Examen fue modificado con exito", datos: aux });  
          }else{
            return retornarError(res,'La prestacion o el examen no existen en la base de datos');
            }
       break;
       case 'agregarPractica':
           objet=req.body;
           aux=await verificar(objet,'nombrePractica');
           if(aux.errors){return retornarError(res,`El nombre de la Prestacion no es valido,${aux.message}`)}
           aux=await existeNombreBd(objet.nombrePractica,'practica','nombre_practica');
           if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el nombre en Practica:${aux}`)}
           if(aux){return retornarError(res,'el nombre de la Practica ya existe , coloque uno distinto') }
            aux=await prestacionDataAgregar(objet.nombrePractica,'practica');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar Practica,${aux}`)}
            return res.send({ message: "La Practica agregada con exito", datos: aux }); 
           break;
       case 'agregarProcedimiento':
            objet=req.body;
            aux=await verificar(objet,'nombreProcedimiento');
            if(aux.errors){return retornarError(res,`El nombre del Procedimiento no es valido,${aux.message}`)}
            aux=await existeNombreBd(objet.nombreProcedimiento,'procedimiento','nombre_procedimiento');
            if (aux instanceof Error){return retornarError(res,`Error al verificar si existe el nombre en Procedimiento:${aux}`)}
            if(aux){return retornarError(res,'el nombre del Procedimiento  ya existe , coloque uno distinto') }
            aux=await prestacionDataAgregar(objet.nombreProcedimiento,'procedimiento');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar el Procedimiento,${aux}`)}
            return res.send({ message: "El Procedimiento fue agregado con exito", datos: aux }); 
            break;
       case 'agregarExamen':
            objet=req.body;
            aux=await verificar(objet,'nombreExamen');
            if(aux.errors){return retornarError(res,`El nombre del Examen no es valido:${aux.message}`)}
            aux=await existeNombreBd(objet.nombreExamen,'examen','nombre_examen');
            if (aux instanceof Error){return retornarError(res,`Error al verificar si existe el nombre en Examen:${aux}`)}
            if(aux){return retornarError(res,'el nombre del Examen  ya existe , coloque uno distinto') }
             aux=await prestacionDataAgregar(objet.nombreExamen,'examen');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar Examen:${aux}`)}
            return res.send({ message: "El Examen fue agregado con exito", datos: aux }); 
             break;
        default:return retornarError(res,`Seleccion ${objeto} no valida en el manejador de Prestaciones`)                         
    }
}catch (error) {
    return retornarError(res,`Error al precesar ${objeto} en Prestaciones , ${error.message}` )
    
}
    }
    
export {manejadorPrestaciones};