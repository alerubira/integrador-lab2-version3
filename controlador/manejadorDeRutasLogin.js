

import { verificar } from "./verificaryup.js";
import { encabezado } from "../rutas.js";
import { buscarLoginPorUsuario, modificarLogin } from "../modelo/loginData.js";
import { verificarHash,crearHash,Login,usuarioClave } from "../modelo/loginn.js";
import jwt from 'jsonwebtoken';
import { jwtSecret } from '../config.js';
import { retornarError } from "./funsionesControlador.js";
let errLogin;
let objetAux={};
let objet={};

async function manejadorLogin(req,res,objeto){
  try {
    let boolean;
    let login;
    let aux;
    let body=req.body;
  
    let usCl;
    let l;
    switch (objeto) {
      case 'verificarLogin':
       // console.log(body);
          usCl=new usuarioClave(body.usuario,body.clave1);  
         aux=await verificar(usCl,'usuarioClave');
         
         if(aux.errors){
          return  retornarError(res,`Error al verificar la tipologia del usuario:${aux.errors}`)
         }
         login=await buscarLoginPorUsuario(aux.usuario);
         if(login instanceof Error){return retornarError(res,`Error al buscar el Login:${login}`)}
         if(login.length<1){return retornarError(res,"El usuario no existe, intente nuevamente")}
          l=new Login(login[0].id_login,login[0].id_medico,login[0].usuario_login,login[0].clave_login,login[0].tipo_autorizacion,login[0].instancia,login[0].palabra_clave);
        // console.log(l);
         
          boolean=await verificarHash(usCl.clave,l.clave);
          if(boolean) {
              if(l.instancia===1){
                return res.status(200).json({
            
                  message: 'Login nuevo , modificar login',
                  codigoPersonalizado: 801
                }); 
               // return res.render('vistaPrincipal',{encabezado,instancia:true})
              }
              if(l.tipoAutorizacion===3||l.tipoAutorizacion===2){
                //generar token
                 // Datos que quieres almacenar en el token
                 const payload = {
                  username: l.usuario,
                  tipoAutorizacion: l.tipoAutorizacion, // Agregar tipo de autorización al payload
                  idSolicitante:l.idMedico
                };// Genera el token
                const token = jwt.sign(payload, jwtSecret, { expiresIn: '3h' });
                // Devuelve el token al cliente
              return  res.json({ token: token ,
                tipoAutorizacion: l.tipoAutorizacion, // Agregar tipo de autorización al payload});
                idSolicitante:l.idMedico
               //return res.redirect('/acceso');
              })}
              
           }else{
            return retornarError(res,"Clave o Usuario Incorrecta");
           }
         
        
        break;
      case 'modificarLogin':
        objet=req.body;
         
         usCl=new usuarioClave(objet.usuario2,objet.clave2);
        aux=await verificar(usCl,'usuarioClave');
         if(aux.errors){
          return retornarError(res,`Error en la tipologia del Login:${aux.errors}`)
         }
         if(objet.clave3!==objet.clave4){
          return retornarError(res,"La Confirmacion de la Clave debe ser igual a la Clave Nueva")
         }
         if(objet.palabraClave2!==objet.palabraClave3){return retornarError(res,'La Confirmacion de la Palabra Clave es distinta')}
         if(objet.palabraClave2.length<1||objet.palabraClave2.length>38){
          return retornarError(res,'La aplabra clave nueva es obligatoria y no debe superar los 38 caracteres')
         }
         usCl=new usuarioClave(objet.usuario2,objet.clave3);
         aux=await verificar(usCl,'usuarioClave');
         if(aux.errors){
          return  retornarError(res,`Error al verificar la tipologia del usuario:${aux.errors}`);
         }
         login=await buscarLoginPorUsuario(aux.usuario);
         
         if(login.length<1){
          return retornarError(res,"El usuario no se encuentra registrado");
         }
         
        boolean=await verificarHash(objet.clave2,login[0].clave_login);
          if(boolean) {
           
           let b=await crearHash(objet.clave3);
            //generar un objeto Login 
             l=new Login(login[0].id_login,login[0].id_medico,login[0].usuario_login,b,login[0].tipo_autorizacion,login[0].instancia+1,objet.palabraClave2);
            //res.send(l);
            let result=await modificarLogin(l);
            if(result instanceof Error){return retornarError(res,`Error al modificar el Login:${result}`)}
            if(result.affectedRows===1){
              return res.send(result);
            }
           }else{
           return retornarError(res,"La Clave no corresponde al usuario");
           }
         
         
        break;  
      case 'recuperarLogin':
        aux=await verificar(body,'usuarioPalabra');
        if(aux.errors){
          return  retornarError(res,`Error al verificar la tipologia del Usuario y la Palabra Clave:${aux.errors}`);
         }
         if(body.clave6!==body.clave7){return retornarError(res,"La confirmacion de la Clave es distinta a la clave Nueva")}
        login=await buscarLoginPorUsuario(body.usuario5);
        if(login instanceof Error){return retornarError(res,`Error al buscar el Usuario:${login}`)}
        if(login.length===1){
          l=new Login(login[0].id_login,login[0].id_medico,login[0].usuario_login,login[0].clave_login,login[0].tipo_autorizacion,login[0].instancia+1,login[0].palabra_clave);
       }else{
        return retornarError(res,"El Usuario no se encuentra Registrado");
       }
         if(l.palabraClave===body.palabraClave){
          let c=await crearHash(body.clave6);
          let l1=new Login(login[0].id_login,login[0].id_medico,login[0].usuario_login,c,login[0].tipo_autorizacion,login[0].instancia+1,login[0].palabra_clave);
          let result1=await modificarLogin(l1);
          if(result1 instanceof Error){return retornarError(`Error al modificar el Login:${result1}`)}
          if(result1.affectedRows===1){
            return res.send(result1);          }
         }else{
          return retornarError(res,"La palabra clave no corresponde al Usuario");
         }
        break;  
      
      default:
        break;
}
//res.send(aux);

}catch (error) {
    console.error(`Error al Procesar ${objeto}`, error);
    return retornarError(res,`Èrror en el Manejador Login:${error}`)
}
}
// Middleware para verificar el token
const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
  if (!token) {
    return res.status(403).json({ message: 'Token no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.user = decoded;
    next();
  });
};
const verifyToken = (token, callback) => {
  if (!token) {
    return callback({ status: 403, message: 'Token no proporcionado' });
  }

  jwt.verify(token, jwtSecret, (err, decoded) => {
    if (err) {
      return callback({ status: 401, message: 'Token inválido' });
    }

    callback(null, decoded);
  });
};

export{manejadorLogin ,verifyToken,verificarToken};
 
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