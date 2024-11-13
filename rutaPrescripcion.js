import express from 'express';
import { manejadorAccesoPrescripcion,manejadorPrescripcion } from './controlador/manejadorRutaPrescripcion.js';
import { verificarToken } from './controlador/manejadorDeRutasLogin.js';
const rutaP = express.Router();
import puppeteer from 'puppeteer'; // Importa Puppeteer
import fs from 'fs';  // Asegúrate de que esta importación sea compatible con tu entorno
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
rutaP.get('/prescripcionImpresa',async(req,res)=>{
    try{
res.render('prescripcionImpresa1')
    }catch(error){
console.error(`Error al renderizar la pagina a imprimir:${error}`);
    }
})
// Ruta para generar el PDF
rutaP.get('/generarPDF', async (req, res) => {
    let browser;
    try {
        // Extraer el token del encabezado de la solicitud
        const token = req.query.token;
        
        if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' });
        }

        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        
        // Aquí se pasa el token como parámetro en la URL
        const url = `http://localhost:3000/prescripcion?token=${token}`;
        await page.goto(url, { waitUntil: 'networkidle0' });

        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        // Verificar si el PDF está vacío
        if (pdf.length === 0) {
            return res.status(500).json({ error: "PDF generado está vacío." });
        }

        // Enviar el PDF como respuesta
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="prescripcion.pdf"');
        res.send(pdf); // Enviar el archivo PDF

    } catch (error) {
        console.error('Error al generar el PDF:', error);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Error al generar el PDF' });
        }
    } finally {
        // Asegurar que el navegador se cierra
        if (browser) {
            await browser.close();
        }
    }
});

export{rutaP}
    