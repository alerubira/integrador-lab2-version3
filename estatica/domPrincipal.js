
 let formLogin=document.getElementById('formularioLogin');
let inputUsuario=document.getElementById('usuario');
let inputClave=document.getElementById('clave1');
pagina="Principal";
//limpiarCampos(limpiar);

formLogin.addEventListener('submit',async function(event) {
    let claveValue=inputClave.value ;
    let usuarioValue=inputUsuario.value ;
    validar(usuarioValue.length<1||usuarioValue.length>6,pagina,'El usuario es obligatorio y no debe superar los 6 caracteres',event);
    let cla=/^(?=(?:.*[A-Z]){1,})(?=(?:.*[a-zA-Z]){3,})(?=(?:.*\d){3,}).*$/;
    validar(claveValue.length<1||!cla.test(claveValue),pagina,'La clave debe contener 3 letras(minimo una mayuscula) y debe contener 3 numeros',event);


});

limpiarCampos(limpiar);
setTimeout(() => limpiarCampos(limpiar), 1000);
