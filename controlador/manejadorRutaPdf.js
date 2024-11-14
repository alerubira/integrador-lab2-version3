import puppeteer from 'puppeteer'; // Importa Puppeteer
import fs from 'fs';  // Asegúrate de que esta importación sea compatible con tu entorno
async function generarPdf(req,res){
    let browser;
    try { const
        { token, htmlContent, inputValues } = req.body; if (!token) {
            return res.status(401).json({ error: 'Token no proporcionado' }); }
      browser = await puppeteer.launch({ headless: true, 
                            args: ['--no-sandbox', '--disable-setuid-sandbox'] });
       const page = await browser.newPage(); 
       await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
       // Inyectar script para rellenar los valores de los inputs, textareas y selects 
       await page.evaluate(inputValues => { inputValues.forEach(({ selector, type, value, checked }) => 
       { const element = document.querySelector(selector);
        if (element) { if (type === 'checkbox' || type === 'radio') 
           { element.checked = checked; } else { element.value = value; } } });
        }, inputValues);       
       const pdf = await page.pdf({
                 format: 'A4', printBackground: true,
                  margin: { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' } });
        if (pdf.length === 0) { return res.status(500).json({ error: "PDF generado está vacío." }); 
       } 
       res.setHeader('Content-Type', 'application/pdf'); 
       res.setHeader('Content-Disposition', 'attachment; filename="prescripcion.pdf"');
        res.end(pdf); } catch (error) { console.error('Error al generar el PDF:', error); 
            if (!res.headersSent) { res.status(500).json({ error: 'Error al generar el PDF' });
         } } finally {
             if (browser) { await browser.close(); } }
}
export {generarPdf}