document.addEventListener('DOMContentLoaded', () => {
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
  });
  function redireccionar(){
    console.log('hola');
  }
  
  console.log('hola');
  