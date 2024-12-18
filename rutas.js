import express from 'express';
import { manejadorLogin } from './controlador/manejadorDeRutasLogin.js';
import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
import { manejadorAcceso } from './controlador/manejadorRutaAcceso.js';
import { manejadorMedicos } from './controlador/manejadorRutaMedicos.js';
import { manejadorPrestaciones } from './controlador/manejadorRutaPrestaciones.js';
import { manejadorMedicamentos } from './controlador/manejadorRutasMedicamento.js';
import { verificarREFEPS } from './controlador/manejadorRutaREFEPS.js';

const ruta = express.Router();
let encabezado;
let mensajeExito;
let estadoSuces;
ruta.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
    let errLogin;
     res.render('vistaPrincipal',{encabezado,errLogin:true});
    
   });
ruta.post('/verificarLogin',(req,res) =>{
   manejadorLogin(req,res,'verificarLogin');
  });
ruta.post('/modificarLogin',(req,res)=>{
    manejadorLogin(req,res,'modificarLogin');
    }) ;
ruta.post('/recuperarLogin',(req,res)=>{
    manejadorLogin(req,res,'recuperarLogin');
    })  ;
//
ruta.get('/acceso',  (req, res) => {
  //manejadorAcceso(req,res);
    //encabezado = "Bienvenido a Accesos";
  //res.render('vistaAcceso', { encabezado });
  manejadorAcceso(req,res);
 });
ruta.get('/medicos',(req,res)=>{
    //encabezado="Planilla para procesar medicos";
    // manejadorMedicos(req,res,'ingresar');
    //res.render('vistaMedicos',{encabezado});
    manejadorMedicos(req,res,'ingresar')
    });
ruta.get('/medicamentos',(req,res)=>{
  //encabezado="Planilla para procesar Medicamentos";
  //manejadorMedicamentos(req,res,'ingresar');
  //res.render('vistaMedicamentos', { encabezado });
  manejadorMedicamentos(req,res,'ingresar');
})  
ruta.get('/prestaciones',(req,res)=>{
 // encabezado='Vienvenido a Prestaciones';
  //manejadorPrestaciones(req,res,'ingresar');
  //res.render('vistaPrestaciones',{encabezado});
  manejadorPrestaciones(req,res,'ingresar');
}) 
ruta.get('/profeciones',verificarToken,async(req,res)=>{
    manejadorMedicos(req,res,"profecion");
    
    });
ruta.get('/especialidades',verificarToken,async(req,res)=>{
  
    manejadorMedicos(req,res,"especialidad");
    }); 
ruta.get('/traertodosMedicos',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'traerTodosMedicos');
}) 
ruta.post('/verificarREFEPS_Argentino',verificarToken,async(req,res)=>{
  verificarREFEPS(req,res);
})
ruta.post('/crearMedico',verificarToken,async(req,res) =>{
  
    manejadorMedicos(req,res,'crearMedico')
     
   });  
ruta.post('/cambiarEstado',verificarToken,async(req,res)=>{
  
  manejadorMedicos(req,res,'cambiarEstado');
})     
ruta.post('/cambiarEspecialidad',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'cambiarEspecialidad');
}); 
ruta.post('/cambiarDireccion',verificarToken,async(req,res)=>{
manejadorMedicos(req,res,'cambiarDireccion');
});
ruta.post('/cambiarDni',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'cambiarDni');
  });
ruta.post('/cambiarNombre',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'cambiarNombre');
  });  
ruta.post('/cambiarApellido',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'cambiarApellido');
  });
ruta.post('/cambiarFechaN',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'cambiarFechaN');
})
ruta.post('/agregarOSP',verificarToken,async(req,res)=>{
  manejadorMedicos(req,res,'agregarOSP');
})  
ruta.get('/practica',verificarToken,async(req,res)=>{
  manejadorPrestaciones(req,res,"practica");
})
ruta.get('/examen',verificarToken,async(req,res)=>{
  
  manejadorPrestaciones(req,res,"examen");
  });
  ruta.get('/procedimiento',verificarToken,async(req,res)=>{
  
    manejadorPrestaciones(req,res,"procedimiento");
    });
 ruta.get('/traerTodasPrestaciones',verificarToken,async(req,res)=>{
  manejadorPrestaciones(req,res,'todasPrestaciones');
 })   
    ruta.post('/crearPrestacion',verificarToken,async(req,res) =>{
      manejadorPrestaciones(req,res,'crearPrestacion');
     });
 ruta.post('/cambiarEstadoPrestacion',verificarToken,async(req,res)=>{
 // console.log(req.body);
  manejadorPrestaciones(req,res,'modificarEsatdo');
 })  
 ruta.post('/modificarProcedimiento',verificarToken,async(req,res)=>{
  manejadorPrestaciones(req,res,'cambiarProcedimiemto');
 }) 
 ruta.post('/modificarExamen',verificarToken,async(req,res)=>{
  manejadorPrestaciones(req,res,'cambiarExamen');
 })
 ruta.post('/agregarPractica',verificarToken,async(req,res)=>{
  manejadorPrestaciones(req,res,'agregarPractica');
 })
 ruta.post('/agregarProcedimiento',verificarToken,async (req,res)=>{
  manejadorPrestaciones(req,res,'agregarProcedimiento');
 }) 
 ruta.post('/agregarExamen',verificarToken,async (req,res)=>{
  manejadorPrestaciones(req,res,'agregarExamen');
 }) 
 ruta.post('/agregarProfecion',verificarToken,async (req,res)=>{
  manejadorMedicos(req,res,'agregarProfecion');
 }) 
 ruta.post('/agregarespecialidad',verificarToken,async (req,res)=>{
  manejadorMedicos(req,res,'agregarEspecialidad');
 }) 
 ruta.get('/nombresGenericos',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'nombresGenericos');
 })
 ruta.get('/formas',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'formas');
 })
 ruta.get('/presentaciones',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'presentaciones');
 })
 ruta.get('/familias',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'familias');
 })
 ruta.get('/categorias',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'categorias');
 })
 ruta.post('/crearMedicamento',verificarToken,async(req,res)=>{
manejadorMedicamentos(req,res,'crearMedicamento');
 })
 ruta.post('/agregarNombreGenerico',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'crearNombreGenerico');
 })
 ruta.post('/agregarFamilia',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'agregarFamilia');
 })
 ruta.post('/agregarCategoria',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'agregarCategoria');
 })
 ruta.post('/agregarForma',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'agregarForma');
 })
 ruta.post('/agregarPresentacion',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'agregarPresentacion');
 })
 ruta.get('/medicamentosTodos',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'medicamentos');
 });
 ruta.post('/modificarCategoria',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'modificarCategoria');
 })
 ruta.post('/modificarFamilia',verificarToken,async (req,res)=>{
  manejadorMedicamentos(req,res,'modificarFamilia');
 })
 ruta.post('/modificarEstadoNG',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'modificarEstadoNG');
 })
 ruta.post('/modificarEstadoMedicamento',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'modificarEstadoMedicamento');
 })
 ruta.post('/modificarPresentacion',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'modificarPresentacion');
 })
 ruta.post('/modificarForma',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'modificarForma');
 })
 ruta.post('/modificarNombreGenerico',verificarToken,async(req,res)=>{
  manejadorMedicamentos(req,res,'modificarNombreGenerico');
 })

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
export {ruta,encabezado};
