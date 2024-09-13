function retornarError(res,mensaje){
    return res.status(500).send({
        success: false,
        message: mensaje,
    });
}
export{retornarError}