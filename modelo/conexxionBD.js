
/*import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrodesalud2',
    port: 3306
});
function consulta1(query,caracter){
    return new Promise((resolve, reject) => {
        // console.log(`caracter entrando a la funsion ${caracter}`);
        // let aux = `${dni}%`;
        // console.log(`auxiliar ${aux}`);
         connection.connect(function(err) {
             if (err) {
                 return reject(err);
             }
             connection.query(query,caracter,
                 
                 function(err, result) {
                     if (err) {
                         return reject(err);
                     }
                    // let obra=result;
                    console.log(`en la coneexionBD ${result}`);
                     //console.log(result);
                     //let pacientes = result.map(pac => new Paciente(pac.nombre, pac.apellido, pac.dni_persona, pac.id_paciente, pac.fecha_nacimiento, pac.nombre_sexo));//like ?
                     resolve(result);
                 }
       );
         });
     });
}
export{connection,consulta1};*/
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'registrodesalud2',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
async function consulta1(query, ...params) {
    
    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query(query, params);
        
        return results;
    } catch (error) {
        console.error('Error en la consulta:', error);
       // throw error;
       return error;
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
async function existeBd(id,tabla,columna){
    /*let query='CALL VerificarID(?, ?,?,@existe)';
let existe=await consulta1(query,id,tabla,columna);
return existe ;*/
try {
    // Ejecuta el procedimiento almacenado
    let a=await consulta1('CALL VerificarEstaBd(?, ?, ?, @existe)', id ,tabla ,columna);
    if(a instanceof Error){return a}
    // Obtiene el valor del parámetro de salida
    const result = await consulta1('SELECT @existe AS existe');
    if(result instanceof Error){return result}
     // Verifica que el resultado esté en el formato esperado
     if (result && result.length > 0) {
        const existe = result[0].existe;
        return existe === 1;
    } else {
        return false;
    }
    
} catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado,existe id :', err.message);
    return err;
}
}
async function existeNombreBd(nombre,tabla,columna){
    
try {
    // Ejecuta el procedimiento almacenado
    //await consulta1('CALL VerificarEstaBd(?, ?, ?, @existe)',nombre,tabla ,columna);
  let a=  await consulta1('CALL VerificarEstaNombreBD(?, ?, ?, @resultado)',nombre,tabla,columna);
   /* CALL VerificarEstaNombreBD('valor_a_buscar', 'nombre_de_tabla', 'nombre_de_columna', @resultado);
SELECT @resultado; -- Para ver el resultado*/

if(a instanceof Error){return a}
    // Obtiene el valor del parámetro de salida
    const result = await consulta1('SELECT @resultado AS existe');
    if(result instanceof Error){return result}
     // Verifica que el resultado esté en el formato esperado
     if (result && result.length > 0) {
        const existe = result[0].existe;
        return existe === 1;
    } else {
        return false;
    }
    

} catch (err) {
    console.error('Error al ejecutar el procedimiento almacenado,existe nombre :', err.message);
    return err;
}
}
async function existeConjuntoBD(tabla,nombreId,tabla1,tabla2,id1,id2){
    try {
        
       let a= await consulta1(`CALL verificar_numeros_en_tabla(?, ?, ?, ?,?,?, @resultado); `,tabla,nombreId,tabla1,tabla2,id1,id2);
    if(a instanceof Error){return a}
        // Obtiene el valor del parámetro de salida
        const result = await consulta1('SELECT @resultado as resultado;');
        if (result instanceof Error){return result}
         // Verifica que el resultado esté en el formato esperado
        /* if (result && result.length > 0) {
            const existe = result[0].existe;
            return existe === 1;
        } else {
            return false;
        }*/
       
       return result;
        
    
    } catch (err) {
        console.error('Error al ejecutar el procedimiento almacenado,existe ConjuntoBD :', err.message);
        return err;
    }
}

export {pool,consulta1,existeBd,existeNombreBd,existeConjuntoBD} ;






 

