//import {buscarMID,crearMedico} from '../modelo/medicoData.js'; 
//import { traerProfecionl} from './conexxion.js';
//import { buscarPacienteDni,todosSexo,createPaciente} from '../modelo/pacienteData.js';
//import { buscarOSIdPaciente, todasObras} from '../modelo/obraSocialData.js';
//import { todoGenericos ,todasAdministracion,todasPrestaciones,ladoTodos} from '../modelo/medicamentos.js';
//import { profecionesTodas,especialidadesTodas } from '../modelo/medicoData.js';
//import { verificarMedico } from './procesarDatos.js';

import { verificar } from "./verificaryup.js";
import { encabezado } from "../rutas.js";
import { buscarLoginPorUsuario } from "../modelo/loginData.js";
import { verificarHash } from "../modelo/loginn.js";
//import { agregarMedico } from '../modelo/medicoData.js';

async function manejador(req,res,objeto){
  try {
    let boolean;
    let login;
    let aux;
    let objet = req.body; 
    switch (objeto) {
      case 'verificarLogin':
        //ordenar,modificar vista(dejar solo login),crear vista(para los distintos accesesos),generar token
        let errLogin;
         aux=await verificar(objet,'Login');
         if(aux.errors){
          res.render('vistaPrincipal',{encabezado,errLogin:false});
         }else{
         login=await buscarLoginPorUsuario(aux.usuario);
         
         if(login.length<1){
          res.render('vistaPrincipal',{encabezado,errLogin:false});
         }else{
          boolean=await verificarHash(aux.clave1,login[0].clave_login);
          if(boolean) {
            res.render('vistaPrincipal',{encabezado,errLogin:true})
           }else{
            res.render('vistaPrincipal',{encabezado,errLogin:false})
           }
         }
         
         
        
         }
        
        break;
      case 'Medico':
         aux= await verificarMedico(objet);
          if(!aux.err){
          aux=await crearMedico(objet);
          return aux;
         }
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
        break;
      default:
        break;
}
//res.send(aux);

}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    res.status(500).send('Error interno del servidor');
}
}

export{manejador};
 
/*function verificarProfecional(res,req,logins,encabezado){
  let loginEncontrado = logins.find(login => 
    login.usuarioLogin === req.idUsuario && login.claveUsuario === req.idClave
  );
  if(loginEncontrado){
    buscarMID(loginEncontrado.idMedico, function(result) {
      // Aquí puedes manejar los resultados de la consulta
     //console.log(result);
       
        
          //console.log(profecional);
          traerProfecionl(result);
          // Redirigir al usuario al endpoint '/recetas'
        return res.redirect('/recetas');
  });
}else{
  let alerta=true;
return res.render('vistaPrincipal',{encabezado,alerta})
}
}
 /*buscarMID(loginEncontrado.idMedico, function(result) {
  // Aquí puedes manejar los resultados de la consulta
 //console.log(result);
   
    if (result) {
      //console.log(profecional);
      traerProfecionl(result);
      // Redirigir al usuario al endpoint '/recetas'
    return res.redirect('/recetas');
    }else{
      let alerta=true;
    return res.render('vistaPrincipal',{encabezado,alerta})
    }
});

}*/
/*function crearProfecional(req,res,mensajeExito){
  mensajeExito="";
  const profecionalCreado=req.body;
   //mensajeExito=agregarMedico(profecionalCreado);
   //console.log(profecionalCreado);

   //res.redirect("/medicos");
   agregarMedico(profecionalCreado, (error, resultado) => {
    if (error) {
        // Maneja el error aquí
        console.error(error);
    } else {
        // Maneja el resultado aquí
       // console.log(resultado);
        mensajeExito=resultado;
        // Puedes redirigir después de capturar la respuesta
        res.redirect("/medicos");
    }
});
}*/
/*async function buscarPacientes(req,res){
  try {
    let caracteres = req.body; 
   // console.log(caracteres);
    let pac = await buscarPacienteDni(caracteres);
   // console.log(pac);
    res.send(pac);
} catch (error) {
    console.error('Error al buscar pacientes:', error);
    res.status(500).send('Error interno del servidor');
}

}
async function busacrObraSocialPaciente(req,res){
  try {
    let caracteres = req.body; 
   // console.log(`idPaciente en ruta ${caracteres}`);
   // console.log(caracteres);
    let obra = await buscarOSIdPaciente(caracteres);
   // console.log(pac);
    res.send(obra);
} catch (error) {
    console.error('Error al buscar obre sociales:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function traerObras(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let obras = await todasObras(caracteres);
   // console.log(pac);
    res.send(obras);
} catch (error) {
    console.error('Error al buscar obras sociales:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function sexoTodos(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let sexos= await todosSexo(caracteres);
   // console.log(pac);
    res.send(sexos);
} catch (error) {
    console.error('Error al buscar en la tabla sexo:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function crearPaciente(req,res){
  try {
    
    const paciente = req.body; 
    //console.log(`paciente en el body ${paciente}`);
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
     const pacienteCreado=await createPaciente(paciente);
   // console.log(pac);
    res.send(pacienteCreado);
} catch (error) {
    console.error('Error al crear paciente:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function nombresGenericos(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let nombresGenericos= await todoGenericos(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(nombresGenericos);
} catch (error) {
    console.error('Error al buscar en la tabla sexo:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function administraciones(req,res){
  try {
    let caracteres = req.body; 
   // console.log(`caracter en manejador de rutas ruta ${caracteres}`);
   // console.log(caracteres);
    let administraciones= await todasAdministracion(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(administraciones);
} catch (error) {
    console.error('Error al buscar en la tabla administracion:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function traerPrestaciones(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let prestacionesTodas= await todasPrestaciones(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(prestacionesTodas);
} catch (error) {
    console.error('Error al buscar en la tabla prestaciones:', error);
    res.status(500).send('Error interno del servidor');
}
}
async function todosLados(req,res){
  try {
    let caracteres = req.body; 
    //console.log(`caracter en ruta en ruta ${caracteres}`);
   // console.log(caracteres);
    let lados= await ladoTodos(caracteres);
   // console.log(`remedios en el endpoin ${nombresGenericos}`);
    res.send(lados);
} catch (error) {
    console.error('Error al buscar en la tabla lado:', error);
    res.status(500).send('Error interno del servidor');
}
}*/
/*async function traerTodo(req,res,tabla){
  try {
    let aux;
    let caracteres = req.body; 
    switch (tabla) {
      case 'profecion':
         aux= await profecionesTodas(caracteres);
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
        break;
      default:
        break;
    }
    
   
    res.send(aux);
} catch (error) {
    console.error(`Error al buscar en la tabla ${tabla}`, error);
    res.status(500).send('Error interno del servidor');
}
}
async function crear(req,res,objeto){
 // console.log(objeto);
  try {
    
    let aux;
    let objet = req.body; 
    switch (objeto) {
      case 'Medico':
         aux= await verificarMedico(objet);
          if(!aux.err){
          aux=await crearMedico(objet);
          return aux;
         }
        break;
      case 'especialidad':
         aux=await especialidadesTodas(caracteres);
        break;
      default:
        break;
}
//res.send(aux);

}catch (error) {
    console.error(`Error al crear el ${objeto}`, error);
    res.status(500).send('Error interno del servidor');
}
}*/