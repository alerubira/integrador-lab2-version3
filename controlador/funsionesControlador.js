function retornarError(res,mensaje){
    console.log(mensaje);
    return res.status(500).send({
        success: false,
        message: mensaje,
    });
}
export{retornarError}