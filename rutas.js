import express from 'express';
const ruta = express.Router();
let encabezado;
let mensajeExito;
let estadoSuces;
// Definir tus rutas aquí

ruta.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
     res.render('vistaPrincipal',{encabezado,mensajeExito,estadoSuces});
    //res.send('hola mundo');
   });
   
   
   
   /*app.get('/medicos',(req,res)=>{
     encabezado="Planilla para procesar medicos"
     res.render('medicos',{encabezado,mensajeExito,estadoSuces});
   });*/
   
 
/* ruta.post('/verificarAdministrativoR',(req,res)=>{
   // Obtener el ID del Profesional enviado desde el formulario
 const idProfecional = req.body.idAdministrativoR;
 if (idProfecional==="123") {
    encabezado="Planilla de profecionales";
   profecional="Alejandro";
   // Redirigir al usuario al endpoint 
 return res.redirect('/medicos');
 }else{
   let alerta=true;
  return res.render('vistaPrincipal',{encabezado,alerta})
 }
 
 });   */      
 /*
 app.post('/profeciones',async(req,res)=>{
 traerTodo(req,res,"profecion");
 });
 app.post('/especialidades',async(req,res)=>{
 traerTodo(req,res,"especialidad");
 });
 app.post('/crearMedico',async(req,res) =>{
 let sucess=await crear(req,res,"Medico");
 console.log('en ruta');
 console.log(sucess.success);
 //let suces=await JSON.parse(sucess);
  estadoSuces=sucess.success;
   res.redirect('/medicos');
 });*/


// Exportar el router
export {ruta};
