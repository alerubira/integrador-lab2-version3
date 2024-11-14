
async function traerPrescripciones(event){
    event.preventDefault;
   
    eliminarHijos(divPrescripcionesA);
    bandera=true;
    let medicoPaciente={};
   // console.log(paciente);
    medicoPaciente.idProfecional=parseInt(idProfecional.value);
    medicoPaciente.idPaciente=paciente.idPaciente;
    
if(!Number.isInteger(medicoPaciente.idProfecional) || !Number.isInteger(medicoPaciente.idPaciente)) {
    alerta( pagina, 'No se puede traer Prescripciones porque falta el Medico o el Paciente o no son números enteros');
    bandera = false;
}
if (bandera){
        aux=await fechProtegidoPost('/traerPrescripciones',medicoPaciente);
        console.log(aux.prescripciones);
        //controlar si no hay prescripciones qu alerte y no ejecute
    if(aux.prescripciones.length<1)
        {alerta(pagina,'El Paciente no tiene Prescripciones anteriores con este Medico');

        }else{
     mostrarPrescripciones(aux.prescripciones);
        
    }  
   
}
}
async function mostrarPrescripciones(arrayPrescripciones){
    let idPresPres=[];
    for(let pre of arrayPrescripciones){ 
        let divPre=document.createElement('div');
        divPre.classList.add('divAuxiliar');
        let h5=document.createElement('h5');
        let fechaP=convertirFechaISOaFechaLocal(pre.fecha_prescripcion,true);
        let fechaVP=convertirFechaISOaFechaLocal(pre.vigencia_prescripcion,true);
        h5.textContent=`Prescripcion numero : ${pre.id_prescripcion}// Fecha :${fechaP}// fecha de vencimiento :${fechaVP}`
        divPre.appendChild(h5);
        let h5_0=document.createElement('h5');
        h5_0.textContent=`Diagnostico :${pre.diagnostico_prescripcion}`;
        divPre.appendChild(h5_0);
        for(let med of pre.medicamentos){
        //crear un div(class divMed)
        //crear p ,cargarlr los datos,agregarlo a divMed
        //agregar divMed a divPre
        let divMed=document.createElement('div');
        let h6_1=document.createElement('h6');
        h6_1.textContent=`Medicamento:${med.nombre.nombre_generico},${med.nombre.nombre_forma},${med.nombre.nombre_presentacion}//Nombre Comercial :${med.nombre_comercial} //Administarcion :${med.administracion.nombre_administracion_medicamento}`;
        divMed.appendChild(h6_1);
        divPre.appendChild(divMed);
        }
        for(let pr of pre.prestaciones){
        let divPr=document.createElement('div');
        divPr.classList.add('divPr');
        let h6_2=document.createElement('h6');
        let lado;
        if(pr.lado){lado=pr.lado.nombre_lado}else{lado='No Requerido'}
        h6_2.textContent=`Prestacion:${pr.nombre_prestacion.nombre_practica},${pr.nombre_prestacion.nombre_procedimiento},${pr.nombre_prestacion.nombre_examen},Lado :${lado}`
    
        divPr.appendChild(h6_2);
        let h6_3=document.createElement('h6');
        h6_3.textContent=`Indicacion :${pr.indicacion}`;
        divPr.appendChild(h6_3);
        let h6_4=document.createElement('h6');
        h6_4.textContent=`Justificacion :${pr.justificacion}`;
        divPr.appendChild(h6_4);
        let inputPrestacionPrescripcion=document.createElement('input');
        inputPrestacionPrescripcion.type='hidden';
        inputPrestacionPrescripcion.value=pr.id_prestacion_prescripcion;
        idPresPres.push(pr.id_prestacion_prescripcion);
        divPr.appendChild(inputPrestacionPrescripcion);
        let lblObservacion=document.createElement('label');
        lblObservacion.textContent='Observacion';
        divPr.appendChild(lblObservacion);
        let inputObservacion=document.createElement('input');
        if(!pr.observacion){inputObservacion.textContent=""}else{
            inputObservacion.textContent=pr.observacion;
            inputObservacion.value=pr.observacion;
        }
        
        divPr.appendChild(inputObservacion);
        let btn=document.createElement('button');
        btn.textContent = 'Agregar Observacion';
        btn.addEventListener('click', (event) => {
            event.preventDefault();
            let idPrescripcionPrestacion = inputPrestacionPrescripcion.value;
            let observacion = inputObservacion.value;
            console.log(`ID Prestacion: ${idPrescripcionPrestacion}, Observacion: ${observacion}`);
            modificarObservacion(idPrescripcionPrestacion,observacion,idPresPres);
        });
        divPr.appendChild(btn);
        divPre.appendChild(divPr);
        }
        divPrescripcionesA.appendChild(divPre);
       }
       let btn2=document.createElement('button');
       btn2.textContent = 'Cerrar pestaña Prescripciones anteriores';
       btn2.classList.add('boton');
       btn2.addEventListener('click', (event) => {
           event.preventDefault();
           eliminarHijos(divPrescripcionesA);
       });
       divPrescripcionesA.appendChild(btn2);    
}
async function modificarObservacion(idPrestacionPrescripcion,observacion,idPresPres){
bandera=true;
let a=parseInt(idPrestacionPrescripcion)
aux =await idPresPres.some(id => id === a);
if(!validar(!aux,pagina,'La seleccion no contiene una Prestacion o no Existe la Prestacion')){bandera=false}
if(!validar(observacion.length>48,pagina,'La Oservacion no debe superar los 48 caracteres')){bandera=false}
if(bandera){
    let preMod={};
    preMod.idPrestacionPrescripcion=a;
    preMod.observacion=observacion;
   fechProtegidoPost('/modificarPrestacionPrescripcion',preMod);
}
}
function realizarNuevaPrescripcion(){
    limpiarCampos(limpiarP);
    fOcultar();
    eliminarHijos(divMedicamentoPrestacion);
    obraSocialSelec.value='j';
    planSelec.value='h';
    inputSexoP.placeholder="";
}
async function imprimirPrescripcion() {
    capturarEstadoYGenerarPDF();
    /*const token = localStorage.getItem('token');
    
    try {
        const response = await fetch(`/generarPDF?token=${token}`, { method: 'GET' });
        console.log("Content-Type:", response.headers.get('Content-Type'));
        if (response.ok) {
            const pdfBlob = await response.blob();
            console.log("Tamaño del Blob:", pdfBlob.size);

            if (pdfBlob.size > 0) {
                const url = URL.createObjectURL(pdfBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'prescripcion.pdf';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } else {
                console.error("El PDF generado está vacío.");
            }
        } else {
            const errorData = await response.json();
            console.error('Error en la respuesta:', errorData.error);
        }
    } catch (error) {
        console.error('Error al acceder al endpoint protegido:', error);
    }*/
}
async function capturarEstadoYGenerarPDF() {
    const token = localStorage.getItem('token');
// Ocultar los botones temporalmente 
const buttons = document.querySelectorAll('button,.boton,#tipo'); 
buttons.forEach(button => button.style.display = 'none');
    // Capturar el HTML completo junto con los estilos
    let htmlContent = `
        <html>
            <head>
                ${document.head.innerHTML}
                <style>
                    ${Array.from(document.styleSheets).map(sheet => {
                        try {
                            return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
                        } catch (e) {
                            console.warn('No se pueden leer reglas de estilos desde:', sheet.href, e);
                            return '';
                        }
                    }).join('\n')}
                </style>
            </head>
            <body>
                ${document.body.outerHTML}
            </body>
        </html>
    `;

   
    // Restaurar la visibilidad de los botones 
    buttons.forEach(button => button.style.display = '');
   // Capturar los valores de los inputs, textareas y selects 
   const inputValues = Array.from(document.querySelectorAll('input, textarea, select')).map(element => 
    ({ selector: `${element.tagName.toLowerCase()}[name="${element.name}"]`,
     type: element.type,
      value: element.value,
       checked: element.checked }));
    try {
        const response = await fetch('/generarPDF', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token, htmlContent, inputValues })
        });

        if (response.ok) {
            const pdfBlob = await response.blob();
            const url = URL.createObjectURL(pdfBlob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'prescripcion.pdf';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            console.error('Error en la respuesta:', response.statusText);
        }
    } catch (error) {
        console.error('Error al generar el PDF:', error);
    }
}

