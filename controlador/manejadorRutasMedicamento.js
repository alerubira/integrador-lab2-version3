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
           if(aux instanceof Error){return retornarError(res,`Error al buscar nombres Genericos,${aux.message}`)}
           res.send(aux);
        break;
     case 'medicamentos':
            aux=await medicamentoDatatodos('medicamentos');
            if(aux instanceof Error){return retornarError(res,`Error al buscar Medicamentos,${aux.message}`)}
            res.send(aux);
        break;        
     case 'formas':
            aux= await medicamentoDatatodos('formas');
            if(aux instanceof Error){return retornarError(res,`Error al buscar Formas Frmaceuticas,${aux.message}`)}
            res.send(aux);
        break;
      case 'presentaciones':
         aux=await medicamentoDatatodos('presentaciones');
         if(aux instanceof Error){return retornarError(res,`Error al buscar Presentaciones,${aux.message}`)}
         res.send(aux);
            break;
     case 'familias':
        aux=await medicamentoDatatodos('familias');
        if(aux instanceof Error){return retornarError(res,`Error al buscar Familias,${aux.message}`)}
        res.send(aux);
        break  
     case 'categorias':
        aux=await medicamentoDatatodos('categorias');
        if(aux instanceof Error){return retornarError(res,`Error al buscar Categorias,${aux.message}`)}
         res.send(aux);  
         break;  
    case 'crearNombreGenerico':
        objet=req.body;
        let a={};
         a.nombreGenerico=objet.nombreGenerico;
        aux=await verificar(a,'nombreGenerico');
        if(aux.errors){return retornarError(res,`El Nomre Generico no tiene el formato correcto,${aux.message}`)}
        aux=await existeNombreBd(objet.nombreGenerico,'nombre_generico','nombre_generico');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Nombre Generico,${aux.message}`)}
        if(aux){return retornarError(res,'el nombre generico del madicamento ya existe , coloque uno distinto') }
     
        aux=await existeBd(objet.idFamilia,'familia','id_familia')
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la Familia,${aux.message}`)}
        if(!aux){return retornarError(res,'La familia no existe en la base de datos')}
        aux=await existeBd(objet.idCategoria,'categoria','id_categoria'); 
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la Categoria,${aux.message}`)}  
        if(!aux){return retornarError(res,'La categoria no existe en la base de datos')}
            
         suces=await medicamentoDataAgregar(objet,'nombreGenerico');
        if (suces instanceof Error) {return retornarError(res,`Error al crear Nombre Generico,${suces.message}`)}
        return res.send({ message: "El nombre Generico fue creado  con exito", datos: aux });
        break;         
     case 'crearMedicamento':
        objet = req.body;
        aux=await existeBd(objet.idNombreGenerico,'nombre_generico','id_nombre_generico');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el nombe generico,${aux.message}`)}
        if(!aux){return retornarError(res,'El nombre Generico no existe,seleccione uno nuevo')}
        aux=await existeBd(objet.idForma,'forma_farmaceutica','id_forma');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la forma farmaceutica,${aux.message}`)}
        if(!aux){return retornarError(res,`La forma no existe en la base de datos `)}
        aux=await existeBd(objet.idPresentacion,'presentacion','id_presentacion');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la Presentacion,${aux.message}`)}
        if(!aux){return retornarError(res,`La presentacion no existe en la base de datos ${aux.message}`)}
         
        suces=await crearMedicamento(objet);
         if (suces instanceof Error) {return retornarError(res,`Error al crear el medicamento ${suces.message}`)}
            return res.send(suces);
           break;
      
    case 'modificarEstadoNG':
         objet=req.body;
         e1=await existeBd(objet.idNG,'nombre_generico','id_nombre_generico');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el nombre generico,${e1.message}`)}
         if(e1){
            aux=await medicamentoDataModificar('estadoNombreGenerico',objet.idNG,objet.estadoNombreGenerico) ;
            if (aux instanceof Error) {return retornarError(res,`Error al modificar el Estado del nombre Generico ${aux.message}`)}
            return res.send({ message: "El Estado del Medicamento fue modificado con exito", datos: aux });
         }else{return retornarError(res,'El nombre Generico no existe')}
        
        break ;
    case 'modificarEstadoMedicamento':
        objet=req.body;
        e1=await existeBd(objet.idNGP,'nombre_generico_presentacion','id_n_g_p');
        if(aux instanceof Error){return retornarError(res,`Error al verificar si existe el Medicamento,${aux.message}`)}
        if(e1){
           aux=await medicamentoDataModificar('estadoMedicamento',objet.idNGP,objet.estado_n_g_p) ;
           if (aux instanceof Error) {return retornarError(res,`Error al modificar el Estado del Medicamento ${aux.message}`)}
           return res.send({ message: "El Estado del Medicamento fue modificado con exito", datos: aux });
        }else{return retornarError(res,'El nombre del Medicamento no existe')}
        break;    
    case 'modificarCategoria':
        objet=req.body;
         e1=await existeBd(objet.idNG,'nombre_generico','id_nombre_generico');
         e2=await existeBd(objet.idCategoria,'categoria','id_categoria');
         if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el nombre generico ,${e1.message}`)}
         if(e2 instanceof Error){return retornarError(res,`Error al verificar si existe la categoria ,${e2.message}`)}
         if(e1&&e2){
            aux=await medicamentoDataModificar('categoria',objet.idNG,objet.idCategoria);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar la Categoria ${aux.message}`)}
            return res.send({ message: "La Categoria fue modificada con exito", datos: aux });
         }else{ return retornarError(res,'El nombre Generico o la Categoria no existen') }
       
        break 
    case 'modificarFamilia':
        objet=req.body;
        e1=await existeBd(objet.idNG,'nombre_generico','id_nombre_generico');
        e2=await existeBd(objet.idFamilia,'familia','id_familia');
        if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el nombre generico ,${e1.message}`)}
        if(e2 instanceof Error){return retornarError(res,`Error al verificar si existe la Familia ,${e2.message}`)}
        if(e1&&e2){
            aux=await medicamentoDataModificar('familia',objet.idNG,objet.idFamilia);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar la Familia ${aux.message}`)}
            return res.send({ message: "La Familia fue modificada con exito", datos: aux });
          }else{return retornarError(res,'El nombre Generico o la Familia no existaen')}
       break;
    case 'modificarForma':
        objet=req.body;
        e1=await existeBd(objet.idForma,'forma_farmaceutica','id_forma');
        if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe La Forma Farmaceutica:${e1.message}`)}
        e2=await existeBd(objet.idNGP,'nombre_generico_forma','id_n_g_f');
        if(e2 instanceof Error){return retornarError(res,`Error al verficar si existe el Madicamento:${e2.message}`)}
        if(e1&&e2){
            aux=await medicamentoDataModificar('forma',objet.idNGP,objet.idForma);
            if(aux instanceof Error){return retornarError(res,`Error al modificar la Forma:${aux.message}`)}
            return res.send({ message: "La Forma fue modificada con exito", datos: aux });
        }else{return retornarError(res,'El medicamento o la Forma Farmaceutica no existe')}
        break;   
    case 'modificarPresentacion':
        objet=req.body;
        e1=await existeBd(objet.idNGP,'nombre_generico_presentacion','id_n_g_p');
        e2=await existeBd(objet.idPresentacion,'presentacion','id_presentacion');
        if(e1 instanceof Error){return retornarError(res,`Error al verificar si existe el nombre generico ,${e1.message}`)}
        if(e2 instanceof Error){return retornarError(res,`Error al verificar si existe la Presentacion ,${e2.message}`)}
        if(e1&&e2){
            aux=await medicamentoDataModificar('presentacion',objet.idNGP,objet.idPresentacion);
            if (aux instanceof Error) {return retornarError(res,`Error al modificar la Presentacion ${aux.message}`)}
            return res.send({ message: "La Presentacion fue modificada con exito", datos: aux }); 
          }else{return retornarError(res,'El nombre del Medicamento o la Presentacion no existaen')}
        break;
    case 'modificarNombreGenerico':
        objet=req.body;
        aux=await existeBd(objet.idNombreGenerico,'nombre_generico','id_nombre_generico');
        if (aux instanceof Error) {return retornarError(res,`Error al verificar si existe el nombre generico ${aux.message}`)}
        if(!aux){return retornarError(res,'El nombre generico a modificar no se ncontro en la base de datos')}
        let nG={};
         nG.nombreGenerico=objet.nuevoNombreGenerico;
        aux=await verificar(nG,'nombreGenerico');
        if(aux.errors){return retornarError(res,`Error al verificar la tipologia del nuevo Nombre Generico ${aux.message}`)}
        aux=await medicamentoDataModificar('nombreGenerico',objet.idNombreGenerico,objet.nuevoNombreGenerico);
        if(aux instanceof Error){return retornarError(res,`Error al modificar el Nombre Generico:${aux.message}`)}
        return res.send({ message: "El nombre generico fue modificado con exito", datos: aux });
        break;       
    case 'agregarFamilia':
           objet=req.body;
           aux=await verificar(objet,'nombreFamilia');
           if(aux.errors){return retornarError(res,`Error al verificar la tipologia de el Nombre de la Familia ${aux.message}`)}
           aux=await existeNombreBd(objet.nombreFamilia,'familia','nombre_familia');
           if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la Familia,${aux.message}`)}
           if(aux){return retornarError(res,'el nombre de la Familia ya existe , coloque uno distinto') }
            aux=await medicamentoDataAgregar(objet.nombreFamilia,'familia');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar la Familia ${aux.message}`)}
            return res.send({ message: "La Familia fue gregada con exito", datos: aux });
           break;
       case 'agregarCategoria':
            objet=req.body;
            aux=await verificar(objet,'nombreCategoria');
            if(aux.errors){return retornarError(res,`Error al verificar la tipologia de el nombre de la Categoria ${aux.message}`)}
            aux=await existeNombreBd(objet.nombreCategoria,'categoria','nombre_categoria');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la Categoria,${aux.message}`)}
            if(aux){return retornarError(res,'La Categoria ya exista, seleccione otro nombre')}
           aux=await medicamentoDataAgregar(objet.nombreCategoria,'categoria');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar la Categoria ${aux.message}`)}
            return res.send({ message: "La Categoria fue gregada con exito", datos: aux });
            break;
       case 'agregarForma':
            objet=req.body;
            aux=await verificar(objet,'nombreForma');
            if(aux.errors){return retornarError(res,`Error al verificar la tipologia de el nombre de la forma ${aux.message}`)}
            aux=await existeNombreBd(objet.nombreForma,'forma_farmaceutica','nombre_forma');
           
            if(aux instanceof Error){return retornarError(res,`Error al buscar si existe la forma farmacologica,${aux.message}`)}
            if(aux){return retornarError(res,'La Forma Farmacologica ya existe,coloque una nueva')}
            aux=await medicamentoDataAgregar(objet.nombreForma,'forma');
            if(aux instanceof Error) {return retornarError(res,`Error al agregar la Forma Farmaceutica ${aux.message}`)}
            return res.send({ message: "La Forma fue gregada con exito", datos: aux });
            break;      
        case 'agregarPresentacion':
            objet=req.body;
            aux=await verificar(objet,'nombrePresentacion');
            if(aux.errors){return retornarError(res,`Error en la verificacion de la tipologia del nombre de la Presentacion ${aux.message}`)}
            aux=await existeNombreBd(objet.nombrePresentacion,'presentacion','nombre_presentacion');
            if(aux instanceof Error){return retornarError(res,`Error al verificar si existe la presentacion,${aux.message}`)}
            if(aux){return retornarError(res,'El nombre de la Presentacion ya existe, seleccione uno nuevo')}
            aux=await medicamentoDataAgregar(objet.nombrePresentacion,'presentacion');
            if (aux instanceof Error) {return retornarError(res,`Error al agregar la Presentacion ${aux.message}`)}
            return res.send({ message: "La Presentacion fue gregada con exito", datos: aux });
            break;  
        default:
            return retornarError(res,'El manejador de rutas de Medicamentos no encontro la ruta');                
    }
}catch (error) {
    return retornarError(res,`Error al procesar ${objeto} en Medicamentos ,${error.message}`)
}
    }
    
export {manejadorMedicamentos};