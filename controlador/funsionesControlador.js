function retornarError(res,mensaje){
    
    return res.status(500).send({
        success: false,
        message: mensaje,
    });
}
function retornarErrorSinRes(message) {
    console.log(message);
    return new Error(message);
}
export{retornarError,retornarErrorSinRes}