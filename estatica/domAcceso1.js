
  function redireccionarMedicos(){
    console.log('derireccionar medicos');
   // console.log(localStorage);
    const token = localStorage.getItem('token');
    const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
    //console.log(token);
    if (tipoAutorizacion === '3') {
     console.log('dentro del if');
        //const token = data.token;
         //window.location.href = `/medicos?token=${token}`;
       window.location.href = '/medicos';
        }
  }
  
function redireccionarMedicamentos(){
  console.log('medicamntos en construccion');
  const token = localStorage.getItem('token');
  const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
  //console.log(token);
  if (tipoAutorizacion === '3') {
   console.log('dentro del if');
      //const token = data.token;
       //window.location.href = `/medicamentos?token=${token}`;
       window.location.href = '/medicamentos'
     
      }

}
function redireccionarPrestaciones(){
  console.log('derireccionar prestaciones');
  // console.log(localStorage);
   const token = localStorage.getItem('token');
   const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
   //console.log(token);
   if (tipoAutorizacion === '3') {
    console.log('dentro del if');
       //const token = data.token;
        //window.location.href = `/prestaciones?token=${token}`;
      window.location.href = '/prestaciones';
       }
 }

  
  
  