import * as yup from 'yup';  // Importa todas las exportaciones de yup

const MedicoY = yup.object().shape({
dniProfecional: yup.string()
    .matches(/^\d{7,8}$/, 'El DNI debe ser un número de 7 u 8 caracteres')
    .required('El DNI es obligatorio'),
nombreProfecional: yup.string()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo debe contener letras')
    .max(30, 'El nombre debe tener como máximo 30 caracteres')
    .required('El nombre es obligatorio'),
apellidoProfecional: yup.string()
    .matches(/^[a-zA-Z]+$/, 'El apellido solo debe contener letras')
    .max(30, 'El apellido debe tener como máximo 30 caracteres')
    .required('El apellido es obligatorio'),
idProfecion:yup.string()
     .matches(/^\d+$/, 'El idProfecion debe ser un número')
     .max(30, 'El idProfecion debe tener como máximo 30 caracteres')
     .required('El idProfecion es obligatorio'),
profecionProfecional: yup.string()
    .matches(/^[a-zA-Z]+$/, 'La profesión solo debe contener letras')
    .max(30, 'La profesión debe tener como máximo 30 caracteres')
    .required('La profesión es obligatoria'), 
 idEspecialidad:yup.string()
    .matches(/^\d+$/, 'El idEspecialidad debe ser un número')
    .max(30, 'El idEspecialidad debe tener como máximo 30 caracteres')
    .required('El idEspecialidad es obligatorio'),   
especialidadProfecional: yup.string()
    .matches(/^[a-zA-Z]+$/, 'La especialidad solo debe contener letras')
    .max(30, 'La especialidad debe tener como máximo 30 caracteres')
    .required('La especialidad es obligatoria'),
domicilioProfecional: yup.string()
    .max(30, 'El domicilio debe tener como máximo 30 caracteres')
    .required('El domicilio es obligatorio'),
refepsProfecional: yup.string()
    .matches(/^\d+$/, 'El REFEPS debe ser un número')
    .required('El REFEPS es obligatorio'),
matriculaProfecional: yup.string()
    .matches(/^\d+$/, 'La matrícula debe ser un número')
    .required('La matrícula es obligatoria'),
usuarioProvisorio: yup.string()
    .max(6, 'El usuario debe tener como máximo 6 caracteres')
    .required('El usuario es obligatorio'),
claveProvisoria: yup.string()
    .matches(/^(?=.*[A-Z])(?=.*[a-zA-Z]{2})(?=.*\d{3}).*$/, 'La clave debe tener al menos una mayúscula, tres letras y tres números')
    .min(6, 'La clave debe tener como mínimo 6 caracteres')
    .max(6, 'La clave debe tener como máximo 6 caracteres')
    .required('La clave es obligatoria'),
nivelAutorizacion: yup.string()
     .oneOf(['1', '2', '3'], 'El nivel debe ser 1, 2 o 3')
     .required('El nivel de autorizacion es obligatorio obligatorio'),
palabraClave: yup.string()
     .max(35,'La palabra clave no deve superar los 35 caracteres')
     .required('La palabra clave es obligatoria')
});
const usuarioClaveY= yup.object().shape({
    
    usuario: yup.string()
        .max(6, 'El usuario debe tener como máximo 6 caracteres')
        .required('El usuario es obligatorio'),
    clave: yup.string()
        .matches(/^(?=.*[A-Z])(?=.*[a-zA-Z]{2})(?=.*\d{3}).*$/, 'La clave debe tener al menos una mayúscula, tres letras y tres números')
        .min(6, 'La clave debe tener como mínimo 6 caracteres')
        .max(6, 'La clave debe tener como máximo 6 caracteres')
        .required('La clave es obligatoria'),
    
    });
 const usuarioPalabraY= yup.object().shape({
    usuario5: yup.string()
        .max(6, 'El usuario debe tener como máximo 6 caracteres')
        .required('El usuario es obligatorio'),
    palabraClave: yup.string()
        .max(35, 'Lapalabra clave debe tener como máximo 35 caracteres')
        .required('La palabra clave es obligatorio'),
    clave6: yup.string()
        .matches(/^(?=.*[A-Z])(?=.*[a-zA-Z]{2})(?=.*\d{3}).*$/, 'La clave debe tener al menos una mayúscula, tres letras y tres números')
        .min(6, 'La clave debe tener como mínimo 6 caracteres')
        .max(6, 'La clave debe tener como máximo 6 caracteres')
        .required('La clave es obligatoria'),        
 })   

//console.log(medicamentos);
//console.log(profecionales);
async function verificar(objeto,nombre){
    let aux;
        //console.log(objeto);
            
           switch (nombre) {
             case 'usuarioClave':
                aux=await verificarY(objeto,usuarioClaveY);
                return aux;
               break;
             case 'usuarioPalabra':
                aux=await verificarY(objeto,usuarioPalabraY);
                return aux;
                break;  
             case 'medico':
                aux=await verificarY(objeto,MedicoY);
                return aux;
               break;
             default:

               break;
       }
       
       return aux;
       
       }
  function verificarY(objeto,nombre){
    return nombre.validate(objeto)
    .then(validData => {
        
        return validData;
    })
    .catch(err => {
        console.error("Errores de validación en yup:", err.errors);
        return err;
    });
  }     

 function verificarMedico(objeto){
    //console.log(objeto);
   return MedicoY.validate(objeto)
    .then(validData => {
        
        return validData;
    })
    .catch(err => {
        console.error("Errores de validación:", err.errors);
        return err;
    });
}
export{verificarMedico,verificar};