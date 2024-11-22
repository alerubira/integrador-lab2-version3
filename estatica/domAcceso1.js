
  function redireccionarMedicos(){
    //console.log('derireccionar medicos');
    //console.log(localStorage);
    const token = localStorage.getItem('token');
    const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
    const idSolicitante=localStorage.getItem('idSolicitante');
    //console.log(token);
    if (tipoAutorizacion === '3') {
     //console.log('dentro del if');
        //const token = data.token;
         //window.location.href = `/medicos?token=${token}`;
         let toke={};
         toke.tipoAutorizacion=parseInt(tipoAutorizacion);
         toke.idSolicitante=parseInt(idSolicitante);
         let tokeJ=JSON.stringify(toke);
         let cadena=encodeURIComponent(tokeJ);
         window.location.href = `/medicos?datos=${cadena}`;
       //window.location.href = '/medicos';
        }
  }
  
function redireccionarMedicamentos(){
    const token = localStorage.getItem('token');
    const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
    const idSolicitante=localStorage.getItem('idSolicitante');
  if (tipoAutorizacion === '3') {
   
     let toke={};
         toke.tipoAutorizacion=parseInt(tipoAutorizacion);
         toke.idSolicitante=parseInt(idSolicitante);
         let tokeJ=JSON.stringify(toke);
         let cadena=encodeURIComponent(tokeJ);
         window.location.href = `/medicamentos?datos=${cadena}`;
     
      }

}
function redireccionarPrestaciones(){
     const token = localStorage.getItem('token');
    const tipoAutorizacion=localStorage.getItem('tipoAutorizacion');
    const idSolicitante=localStorage.getItem('idSolicitante');
  if (tipoAutorizacion === '3') {
   
     let toke={};
         toke.tipoAutorizacion=parseInt(tipoAutorizacion);
         toke.idSolicitante=parseInt(idSolicitante);
         let tokeJ=JSON.stringify(toke);
         let cadena=encodeURIComponent(tokeJ);
         window.location.href = `/prestaciones?datos=${cadena}`;
     
      }

 }

  
  
  