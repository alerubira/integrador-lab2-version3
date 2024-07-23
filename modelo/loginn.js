import { genSalt, hash as _hash, compare } from 'bcrypt';
class usuarioClave{
    constructor(usuario,clave){
        this.usuario=usuario;
        this.clave=clave;
    }
}
class Login extends usuarioClave{
    constructor(idLogin,idMedico,usuario, clave,tipoAutorizacion,instancia,palabraClave) {
        super(usuario,clave);
        this.idLogin=idLogin;
        this.idMedico=idMedico;
        this.tipoAutorizacion=tipoAutorizacion;
        this.instancia=instancia;
        this.palabraClave=palabraClave;
    }
}

// Función para hashear una contraseña
async function crearHash(hashear) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await genSalt(saltRounds);
    const hash = await _hash(hashear, salt);
    return hash;
}

// Función para verificar una contraseña
async function verificarHash(password, hashedPassword) {
    
    const match = await compare(password, hashedPassword);
    return match; // Devuelve true si la contraseña coincide, de lo contrario false
}

export{crearHash,verificarHash,Login,usuarioClave};