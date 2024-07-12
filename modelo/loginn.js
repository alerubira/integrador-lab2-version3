import { genSalt, hash as _hash, compare } from 'bcrypt';

// Función para hashear una contraseña
async function crearHash(hashear) {
    const saltRounds = 10; // Número de rondas de sal
    const salt = await genSalt(saltRounds);
    const hash = await _hash(hashear, salt);
    return hash;
}

// Función para verificar una contraseña
async function verificarHash(plainPassword, hashedPassword) {
    const match = await compare(plainPassword, hashedPassword);
    return match; // Devuelve true si la contraseña coincide, de lo contrario false
}

export{crearHash,verificarHash};