import express, { json } from 'express';
import path from 'path';
import serveStatic from 'serve-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bodyParser from'body-parser';
//import { logins } from '../modelo/loginData.js';
import {ruta} from './rutas.js';
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
/*app.get('/', (req, res) => {
    encabezado="Bienvenido al Ministerio de Salud";
     res.render('vistaPrincipal',{encabezado,mensajeExito,estadoSuces});
    //res.send('hola mundo');
   });*/

  // Iniciar el servidor
  app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  });


