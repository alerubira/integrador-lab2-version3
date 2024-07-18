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

});
const loginY= yup.object().shape({
    
    usuario: yup.string()
        .max(6, 'El usuario debe tener como máximo 6 caracteres')
        .required('El usuario es obligatorio'),
    clave1: yup.string()
        .matches(/^(?=.*[A-Z])(?=.*[a-zA-Z]{2})(?=.*\d{3}).*$/, 'La clave debe tener al menos una mayúscula, tres letras y tres números')
        .min(6, 'La clave debe tener como mínimo 6 caracteres')
        .max(6, 'La clave debe tener como máximo 6 caracteres')
        .required('La clave es obligatoria'),
    
    });

//console.log(medicamentos);
//console.log(profecionales);
async function verificar(objeto,nombre){
    let aux;
        
            
           switch (nombre) {
             case 'Login':
                aux=await verificarY(objeto,loginY);
                return aux;
               break;
             case 'especialidad':
                aux=await especialidadesTodas(caracteres);
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
        console.error("Errores de validación:", err.errors);
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