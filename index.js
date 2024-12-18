import express, { json } from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from'body-parser';
//import { logins } from '../modelo/loginData.js';
import {ruta} from './rutas.js';
import { rutaP } from './rutaPrescripcion.js';


let profecionales;
let profecional;


  
const app = express();

// Convierte import.meta.url a __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const staticOptions = {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
};

const port = 3000;
app.use(express.static(path.join(__dirname, 'estatica'), staticOptions));
app.use(bodyParser.text({ type: 'text/plain' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.text());
// Configurar Express para servir archivos estáticos desde la carpeta 'public'
app.use(serveStatic(path.join(__dirname, '..','estatica')));
// Configuración del directorio de archivos estáticos
app.use(express.static(path.join(__dirname, 'estatica')));

app.use(express.urlencoded({ extended: true }))
// Configurar Express para usar Pug como motor de plantillas y establecer la carpeta de vistas
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..','vistas'));
app.set('views', path.join(__dirname, 'vistas'));
app.use(express.json());
// Definir una ruta para renderizar una vista Pug
//app.use('/', ruta);

// Definir tus rutas aquí
app.use('/', ruta);
app.use('/verificarLogin',ruta);
app.use('/protected',ruta);
app.use('/acceso',ruta);
app.use('/modificarLogin',ruta);
app.use('/recuperarLogin',ruta);
app.use('/medicos',ruta);
app.use('/medicamentos',ruta);
app.use('/profeciones',ruta);
app.use('/especialidades',ruta);
app.use('/crearMedico',ruta);
app.use('/traertodosMedicos',ruta);
app.use('/cambiarEstado',ruta);
app.use('/cambiarEspecialidad',ruta);
app.use('/cambiarDireccion',ruta);
app.use('/cambiarDni',ruta);
app.use('/cambiarNombre',ruta);
app.use('/cambiarApellido',ruta);
app.use('/cambiarFechaN',ruta);
app.use('/agregarOSP',ruta);
app.use('/practica',ruta);
app.use('/prestaciones',ruta);
app.use('/examen',ruta);
app.use('/procedimiento',ruta);
app.use('/crearPrestacion',ruta);
app.use('/traerTodasPrestaciones',ruta);
app.use('/cambiarEstadoPrestacion',ruta);
app.use('/modificarProcedimiento',ruta);
app.use('/modificarExamen',ruta);
app.use('/afregarPractica',ruta);
app.use('/agregarProcedimiento',ruta);
app.use('/agregarExamen',ruta);
app.use('/agregarProfecion',ruta);
app.use('/agregarEspecialidad',ruta);
app.use('/nombresGenericos',ruta);
app.use('/formas',ruta);
app.use('/presentaciones',ruta);
app.use('/familias',ruta);
app.use('/categorias',ruta);
app.use('/crearMedicamento',ruta);
app.use('/agregarNombreGenerico',ruta);
app.use('/agregarFamilia',ruta);
app.use('/agregarCategoria',ruta);
app.use('/agregarForma',ruta);
app.use('/agregarPresentacion',ruta);
app.use('/medicamentosTodos',ruta);
app.use('/modificarCategoria',ruta);
app.use('/modificarFamilia',ruta);
app.use('/modificarEstadoNG',ruta);
app.use('/modificarEstadoMedicamento',ruta);
app.use('/modificarPresentacion',ruta);
app.use('/modificarNombreGenerico',ruta);
app.use('/modificarForma',ruta);
app.use('/verificarREFEPS_Argentino',ruta);
app.use('/',rutaP);
app.use('/buscarPacientes',rutaP);
app.use('/traerObras',rutaP);
app.use('/traerSexos',rutaP);
app.use('/generarPaciente',rutaP);
app.use('/obraSocialPaciente',rutaP);
app.use('/generarPrescripcion',rutaP);
app.use('/traerPrescripciones',rutaP);
app.use('/modificarPrestacionPrescripcion',rutaP);
app.use('/prescripcionImpresa1',rutaP);
app.use('/generarPDF',rutaP);
/*app.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
     res.render('vistaPrincipal',{encabezado,mensajeExito,estadoSuces});
    //res.send('hola mundo');
   });*/

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });


