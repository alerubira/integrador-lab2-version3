
 let formLogin=document.getElementById('formularioLogin');
let inputUsuario=document.getElementById('usuario');
let inputClave=document.getElementById('clave1');
let errLogin=document.getElementById('errLogin');
let errLoginValue=errLogin.textContent;
let formModificarLogin=document.getElementById('formularioModificarLogin');
let inputUsuari2=document.getElementById('usuario2');
let inputClave2=document.getElementById('clave2');
let inpuClave3=document.getElementById('clave3');
let inputClave4=document.getElementById('clave4');
pagina="Principal";
//limpiarCampos(limpiar);
console.log(errLoginValue);
 if(errLoginValue==='false'){
        alerta(pagina,'Algo esta mal con el login');
    }

function mostrar(){
    formModificarLogin.style.display = 'block';

}
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
