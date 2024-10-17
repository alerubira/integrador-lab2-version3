import express from 'express';
import { manejadorAccesoPrescripcion,manejadorPrescripcion } from './controlador/manejadorRutaPrescripcion.js';
import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
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
export{rutaP}
    