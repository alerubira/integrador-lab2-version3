/*document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('/acceso', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Acceso autorizado') {
          // Lógica para mostrar la página de acceso
          console.log('Acceso autorizado:', data);
          // Agregar una nueva entrada al historial sin recargar la página
           // history.pushState({key: 'valor1'}, 'acceso', '/acceso');
        } else {
          console.error('Error al acceder al endpoint protegido:', data);
        }
      })
      .catch(error => {
        console.error('Error al acceder al endpoint protegido:', error);
      });
    } else {
      console.error('Token no encontrado');
    }
  });*/
  function redireccionarMedicos(){
    console.log('derireccionar medicos');
   // console.log(localStorage);
    const token = localStorage.getItem('token');
    const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
    //console.log(token);
    if (tipoAutorizacion === '3') {
     console.log('dentro del if');
        //const token = data.token;
         window.location.href = `/medicos?token=${token}`;
       
        }
  }
  /*fetch('/medicos', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      //return response.text();
      history.forward();
    } else {
      return response.json().then(data => {
        throw new Error(data.message);
      });
    }
  })
  /*.then(html => {
    //document.body.innerHTML = html;
    document.documentElement.innerHTML = html;
    const script1 = document.createElement('script');
            script1.src = 'domMedicos.js';
            script1.textContent = script1.textContent;
            document.head.appendChild(script1);
  })*/
  /*.catch(error => {
    console.error('Error al acceder al endpoint protegido Medicos:', error);
  });
  }
  // Función para cargar el contenido de la página de acceso
/*function cargarContenidoAcceso() {
  const token = localStorage.getItem('token');
  fetch('/acceso', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => {
    if (response.ok) {
      return response.text();
    } else {
      return response.json().then(data => {
        throw new Error(data.message);
      });
    }
  })
  .then(html => {
    document.body.innerHTML = html;
    document.documentElement.innerHTML = html;
    const script1 = document.createElement('script');
            script1.src = 'domAcceso1.js';
            script1.textContent=script1.textContent;
            document.head.appendChild(script1);
    const script2=document.createElement('script');
            script2.src='domFunsiones.js';
            script2.textContent=script2.textContent;
            document.head.appendChild(script2);
  })
  .catch(error => {
    console.error('Error al acceder al endpoint protegido:', error);
  });
}

// Llama a la función para acceder al endpoint protegido si estamos en la página de acceso
if (window.location.pathname === '/acceso') {
  cargarContenidoAcceso();
}*/
function redireccionarMedicamentos(){
  console.log('medicamntos en construccion');
}
  
  
  