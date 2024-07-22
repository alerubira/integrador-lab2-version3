import { genSalt, hash as _hash, compare } from 'bcrypt';
class Login {
    constructor(idLogin,idMedico,usuario, clave,tipoAutorizacion,instancia) {
        this.idLogin=idLogin;
        this.idMedico=idMedico;
        this.usuario = usuario;
        this.clave = clave;
        this.tipoAutorizacion=tipoAutorizacion;
        this.instancia=instancia;
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

export{crearHash,verificarHash,Login};