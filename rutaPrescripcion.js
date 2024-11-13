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
    try {
        console.log("Iniciando Puppeteer...");
        // Extraer el token del encabezado de la solicitud
        const token = req.query.token;
        
        if (!token) {
            // Si no hay token, responder con un error
            return res.status(401).json({ error: 'Token no proporcionado' });
        }
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        

        console.log("Página creada...");
        // Aquí se pasa el token como parámetro en la URL
        const url = `http://localhost:3000/prescripcion?token=${token}`;

       /* await page.goto('http://localhost:3000/prescripcionImpresa', {
            waitUntil: 'networkidle0'
        });*/
        await page.goto(url, {
            waitUntil: 'networkidle0'
        });
        page.on('console', msg => console.log('PAGE LOG:', msg.text()));
        console.log("Página cargada correctamente...");

        const pdf = await page.pdf({
            format: 'A4',   // O cualquier tamaño de página que necesites
            printBackground: true  // Asegúrate de incluir los fondos en el PDF
        });
        
        await browser.close();
         // Guardar el PDF generado en un archivo para verificar
         fs.writeFileSync('output.pdf', pdf);
         console.log('PDF guardado en output.pdf');
        if (pdf.length === 0) {
            console.error("PDF generado está vacío.");
            return res.status(500).json({ error: "PDF generado está vacío." });
        }
        console.log("Tamaño del PDF generado:", pdf.length);
       // const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
        //res.contentType('application/pdf');
        //res.send(pdfBlob);
        res.setHeader('Content-Disposition', 'attachment; filename="prescripcion.pdf"');
        res.contentType('application/pdf');
        res.send(pdf);
        console.log("PDF enviado al cliente.");
    } catch (error) {
        console.error('Error al generar el PDF:', error);
        res.status(500).json({ error: 'Error al generar el PDF' });
    }
});


export{rutaP}
    