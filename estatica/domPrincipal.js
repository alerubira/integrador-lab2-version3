
 let formLogin=document.getElementById('formularioLogin');
let inputUsuario=document.getElementById('usuario');
let inputClave=document.getElementById('clave1');
let errLogin=document.getElementById('errLogin');
let instancia=document.getElementById('instancia');
let exito=document.getElementById('exito');
let exitoValue=exito.textContent;
let errLoginValue=errLogin.textContent;
let instanciaValue=instancia.textContent;
let formModificarLogin=document.getElementById('formularioModificarLogin');
let formRecuperarLogin=document.getElementById('formularioRecuperarLogin');
let inputUsuari2=document.getElementById('usuario2');
let inputClave2=document.getElementById('clave2');
let inpuClave3=document.getElementById('clave3');
let inputClave4=document.getElementById('clave4');
let inputUsuario5=document.getElementById('usuario5');
let inputPalabraClave=document.getElementById('palabraClave');
pagina="Principal";
//limpiarCampos(limpiar);
//console.log(instanciaValue);
if(exitoValue==='true'){
    cartelExito(pagina,'La modificacion de la clave fue realizada con exito')
}
 if(errLoginValue==='false'){
        alerta(pagina,'Algo esta mal con el login');
    }
 if(instanciaValue==='true'){
    alerta(pagina,'Para continuar,deve modificar su clave');
    mostrar();
 }
function mostrar(){
    limpiarCampos(limpiar);
    fOcultar();
    formModificarLogin.style.display = 'block';

}
function mostrar1(){
    limpiarCampos(limpiar);
fOcultar();    
formRecuperarLogin.style.display='block';
}
formRecuperarLogin.addEventListener('submit',async function(event){
let usuario5Value=inputUsuario5.value;
let palabraClaveValue=inputPalabraClave.value;
validar(usuario5Value.length<1||usuario5Value.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
validar(palabraClaveValue.length<1||palabraClaveValue.length>35,pagina,'La palabra clave es obligatorio y no debe superar los 35 caracteres',event);
});
formLogin.addEventListener('submit',async function(event) {
    let claveValue=inputClave.value ;
    let usuarioValue=inputUsuario.value ;
    validar(usuarioValue.length<1||usuarioValue.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
    
    validar(claveValue.length<1||!cla.test(claveValue),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
});
formModificarLogin.addEventListener('submit',async function(event){
let usuario2Value=inputUsuari2.value;
let clave2Value=inputClave2.value;
let clave3Value=inpuClave3.value;
let clave4Value=inputClave4.value;
validar(usuario2Value.length<1||usuario2Value.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
validar(clave2Value.length<1||!cla.test(clave2Value),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
validar(clave3Value.length<1||!cla.test(clave3Value),pagina,'La nueva clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);
validar(clave3Value!==clave4Value,pagina,'La confirmacion de la clave no es igual a la clave nueva',event);
});

limpiarCampos(limpiar);
setTimeout(() => limpiarCampos(limpiar), 1000);
