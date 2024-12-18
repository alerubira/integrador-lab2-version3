import express from 'express';
import { manejadorAccesoPrescripcion,manejadorPrescripcion } from './controlador/manejadorRutaPrescripcion.js';
import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
import { generarPdf } from './controlador/manejadorRutaPdf.js';
const rutaP = express.Router();

rutaP.get('/prescripcion',(req,res)=>{
    manejadorAccesoPrescripcion(req,res);
   })
rutaP.post('/buscarPacientes',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'buscarPacientes');
})
rutaP.get('/traerObras',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'traerObras');
})
rutaP.get('/traerSexos',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'traerSexos');
})
rutaP.post('/generarPaciente',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'generarPaciente');
})
rutaP.post('/obraSocialPaciente',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'traerOSP');
})
rutaP.post('/generarPrescripcion',verificarToken,async(req,res)=>{
     manejadorPrescripcion(req,res,'generarPrescripcion');
})
rutaP.post('/traerPrescripciones',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'traerPrescripciones');
})
rutaP.post('/modificarPrestacionPrescripcion',verificarToken,async(req,res)=>{
    manejadorPrescripcion(req,res,'modificarPrestacionPrescripcion');
})


rutaP.post('/generarPDF', async (req, res) => {
   generarPdf(req,res);
});


export{rutaP}
    