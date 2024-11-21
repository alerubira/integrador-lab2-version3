import { verifyToken } from "./manejadorDeRutasLogin.js";
import { encabezado } from "../rutas.js";
import { medicoDatatodos,medicoDataModificar,crearMedico ,medicoDataAgregar} from "../modelo/medicoData.js";
import { verificar } from "./verificaryup.js";
import { Medico } from "../modelo/clasesEntidad.js";
import {  existeBd,existeNombreBd } from "../modelo/conexxionBD.js";
import { retornarError } from "./funsionesControlador.js";
import { buscarMID } from "../modelo/medicoData.js";
let estadoSuces;
let mensajeExito;
let objet;
let e1,e2,errorMessage;
async function manejadorMedicos(req,res,objeto){
    try {
         let aux;
       switch (objeto) {
        case 'ingresar':
          
            /*const token = req.query.token;
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado' });
            }*/
                const datosEncoded = req.query.datos; 
                const datosDecoded = decodeURIComponent(datosEncoded);
                 const toke = JSON.parse(datosDecoded);
                 console.log(toke);
                 if(!toke){return retornarError(res,"Datos de acceso Invalido")}
                 if(toke.tipoAutorizacion!==3){return retornarError(res,"El Profecional no tiene el nivel de Autorizacion")}
                 if (toke.tipoAutorizacion === 3) {
                    let  encabezado = "Planilla para Procesar Medicos";
                    let p1=await buscarMID(toke.idSolicitante);
                   if(p1 instanceof Error){return retornarError(res,`Error al buscar el Profecional:${p}`)}
                   let p=p1[0][0]
                   if(p.estado_medico!==1){return retornarError(res,"El Profecional Esta dado de baja")}
                  let profecional=new Medico(p.id_medico,null,p.nombre,p.apellido,p.dni_persona,p.domicilio,null,p.nombre_profecion,null,p.nombre_especialidad,p.matricula_profecional,null,p.estado_medico);
                  res.render('vistaMedicos', { encabezado ,profecional});
                 }
            /*verifyToken(token, (err, decoded) => {
                if (err) {
                    return res.status(403).json({ message: 'Token no válido' });
                }
        
                if (decoded.tipoAutorizacion === 3) {
                //let  encabezado = "Bienvenido a Accesos";
                
                    //res.render('medicos',{encabezado,mensajeExito,estadoSuces});
                    res.render('vistaMedicos', { encabezado,mensajeExito,estadoSuces });
                } else {
                    res.status(403).json({ message: 'Acceso denegado' });
                }
            });*/
            
            break;
        case 'profecion':
                 aux= await medicoDatatodos('profeciones');
                 if(aux instanceof Error){return retornarError(res,`Error al buscar profeciones:${aux}`)}
                res.send(aux);
            break;
        case 'especialidad':
            aux=await medicoDatatodos('especialidades');
            if(aux instanceof Error){return retornarError(res,`Error al buscar Especialidades:${aux}`)}
            res.send(aux);
                break;
        case 'crearMedico':
            
            objet = req.body;
            aux= await verificar(objet,'medico');
            if(aux.errors){return retornarError(res,`Los datos del Medico no son compatibles,${aux.message}`)}
             aux=await crearMedico(objet);
            if (aux instanceof Error) {return retornarError(res,`Error al crear el Medico,${aux.message}`)}
            return res.send({ message: "El Medioco fue archivado con exito", datos: aux }); 
                break;
        case 'traerTodosMedicos':
            aux=await medicoDatatodos('medicos');
            if (aux instanceof Error) {return retornarError(res,`Error al traer los Medicos,${aux}`)}
            
                let medicos=[];
                let medico;
                for(let m of aux){
                
                medico= new Medico(m.id_medico,m.id_persona,m.nombre,m.apellido,m.dni_persona,m.domicilio,m.id_profecion,m.nombre_profecion,m.id_especialidad,m.nombre_especialidad,m.matricula_profecional,m.id_refeps,m.estado_medico);
                medicos.push(medico);
                }
            return res.send(medicos);
             break  
        case 'cambiarEstado':
            objet=req.body;
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el Medico:${e1}`)}
            if(!e1){return retornarError(res,`El medico no existe`)}
            aux=await medicoDataModificar('estado',objet.idMedico,objet.estadoMedico) ;
            if(aux instanceof Error){return retornarError(res,`Error al modificar el estado del Medico,${aux}`)}
            return res.send({ message: "El Estado del Medico fue modificado con exito", datos: aux }); 
            break 
        case 'cambiarEspecialidad':
            objet=req.body;
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el Medico:${e1}`)}
            e2=await existeBd(objet.idEspecialidad,'especialida','id_especialidad');
            if(e2 instanceof Error){return retornarError(res,`Error al verificar si existe la Especialidad:${e2}`)}
            if(e1&&e2){
                aux=await medicoDataModificar('especialidad',objet.idMedico,objet.idEspecialidad);
                if(aux instanceof Error){return retornarError(res,`Error al modificar la Especialidad,${aux}`)}
                return res.send({ message: "La Especialidad fue modificada con exito", datos: aux }); 
            }else{
                return retornarError(res,'El Medico o la Especialidad no existen en la base de datos')
            }
        
            break 
        case 'cambiarDireccion':
            objet=req.body;
            let dom={domicilioProfecional:objet.domicilioProfecional};
            aux=await verificar(dom,'domicilio');
            if(aux.errors){return retornarError(res,`Error al verificar la tipologia del Domicilio,${aux.message}`)}
            e1=await existeBd(objet.idMedico,'medico','id_medico');
            if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe El Medico,${e}`)}
            if(e1){
                    aux=await medicoDataModificar('domicilio',objet.idMedico,objet.domicilioProfecional);
                    if(aux instanceof Error){return retornarError(res,`Error al modificar el Domicilio,${aux}`)}
                    return res.send({ message: "La direccion fue modificada con exito", datos: aux }); 
                }else{
                    return retornarError(res,'El Medico no existe en la base de datos');
                }
                 break;
        case 'agregarProfecion':
            objet=req.body;
            aux=await verificar(objet,'nombreProfecion');
            if(aux.errors){ return retornarError(res,`Error al verificar la tipologia de la Profecion,${aux.message}`)}
            aux=await existeNombreBd(objet.nombreProfecion,'profecion','nombre_profecion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe Profecion,${aux}`)}
            if(aux){return retornarError(res,'La profecion ya existe, seleccione otro nombre')}
            aux=await medicoDataAgregar(objet.nombreProfecion,'profecion');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar Profecion a la base de datos,${aux}`)}
              return res.send({ message: "La Profecion fue archivada con exito", datos: aux });   
            break;
        case 'agregarEspecialidad':
                objet=req.body;
                aux=await verificar(objet,'nombreEspecialidad');
                if(aux.errors){return retornarError(res,`Error al verificar la tiologia de la Especialidad,${aux.message}`)}
                aux=await existeNombreBd(objet.nombreEspecialidad,'especialida','nombre_especialidad');
                if(aux instanceof Error){return retornarError(res,`Error al verificar si existe Especialidad,${aux}`)}
                if(aux){return retornarError(res,'La especialidad ya existe,seleccione una nueva')}
                aux=await medicoDataAgregar(objet.nombreEspecialidad,'especialidad');
                if (aux instanceof Error) {return retornarError(res,`Error al agregar la Especialidad,${aux}`)}
                return res.send({ message: "La Especiaidad fue archivada con exito", datos: aux }); 
                break;                    
        default :
        return retornarError(res,'Seleccion no nalida en el manejador Medicos')             
            }
}catch (error) {
    return retornarError(res,`Error al procesar el ${objeto} en Medicos:${error.message}`)
}
}
    
export {manejadorMedicos};