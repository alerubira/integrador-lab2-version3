import * as yup from 'yup';  // Importa todas las exportaciones de yup
const domicilioY=yup.object().shape({
domicilioProfecional:yup.string()
     .required('El domocilio es obligatorio')
     .max(30,'El domocilio no debe superar los 30 caracteres')
})
const pacienteY=yup.object().shape({
dniPaciente: yup.string()
    .matches(/^\d{7,8}$/, 'El DNI debe ser un número de 7 u 8 caracteres')
    .required('El DNI es obligatorio'),
nombrePaciente: yup.string()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo debe contener letras')
    .max(30, 'El nombre debe tener como máximo 30 caracteres')
    .required('El nombre es obligatorio'),
apellidoPaciente: yup.string()
    .matches(/^[a-zA-Z]+$/, 'El apellido solo debe contener letras')
    .max(30, 'El apellido debe tener como máximo 30 caracteres')
    .required('El apellido es obligatorio'),

})
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
/*profecionProfecional: yup.string()
    .matches(/^[a-zA-Z]+$/, 'La profesión solo debe contener letras')
    .max(30, 'La profesión debe tener como máximo 30 caracteres')
    .required('La profesión es obligatoria'), */
 idEspecialidad:yup.string()
    .matches(/^\d+$/, 'El idEspecialidad debe ser un número')
    .max(30, 'El idEspecialidad debe tener como máximo 30 caracteres')
    .required('El idEspecialidad es obligatorio'),   
/*especialidadProfecional: yup.string()
    .matches(/^[a-zA-Z]+$/, 'La especialidad solo debe contener letras')
    .max(30, 'La especialidad debe tener como máximo 30 caracteres')
    .required('La especialidad es obligatoria'),*/
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
 const practicaY=yup.object().shape({
    nombrePractica:yup.string()
    .max(28,'El nombre de la Practica debe tener como maximo 28 caracteres')
    .required('El nombre de la practica es obligatorio')
 }) 
 const procedimientoY=yup.object().shape({
    nombreProcedimiento:yup.string()
    .max(28,'El nombre del procedimiento debe tener como maximo 28 caracteres')
    .required('El nombre del procedimiento es obligatorio')
 }) 
 const examenY=yup.object().shape({
    nombreExamen:yup.string()
    .max(28,'El nombre del Examen debe tener como maximo 28 caracteres')
    .required('El nombre del Examen es obligatorio')
 })  
 const profecionY=yup.object().shape({
    nombreProfecion:yup.string()
    .max(28,'El nombre de la Profecion debe tener como maximo 28 caracteres')
    .required('El nombre de la Profecion es obligatorio')
 })  
 const especialidadY=yup.object().shape({
    nombreEspecialidad:yup.string()
    .max(28,'El nombre de la Especialidad debe tener como maximo 28 caracteres')
    .required('El nombre de la Especialidad es obligatorio')
 })  
 const nombreGenericoY=yup.object().shape({
    nombreGenerico:yup.string()
    .required('El Nombre es Oblogatorio')
    .max(38,'El nombre no debe superar los 38 caracteres')
 })
 const nombreFamiliaY=yup.object().shape({
    nombreFamilia:yup.string()
    .required('El Nombre es Oblogatorio')
    .max(28,'El nombre no debe superar los 28 caracteres')
 })
 const nombreCategoriaY=yup.object().shape({
    nombreCategoria:yup.string()
    .required('El Nombre es Oblogatorio')
    .max(28,'El nombre no debe superar los 28 caracteres')
 })
 const nombreFormaY=yup.object().shape({
    nombreForma:yup.string()
    .required('El Nombre es Oblogatorio')
    .max(28,'El nombre no debe superar los 28 caracteres')
 })
 const nombrePresentacionY=yup.object().shape({
    nombrePresentacion:yup.string()
    .required('El Nombre es Oblogatorio')
    .max(28,'El nombre no debe superar los 28 caracteres')
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
              case 'domicilio':
                aux=await verificarY(objeto,domicilioY);
                return aux;
                break 
              case 'nombrePractica':
                aux=await verificarY(objeto,practicaY);
                return aux;
                break 
              case 'nombreProcedimiento':
                aux=await verificarY(objeto,procedimientoY);
                return aux;
                break;
              case 'nombreExamen':
                aux=await verificarY(objeto,examenY);
                return aux;
                break 
              case 'nombreProfecion':
                    aux=await verificarY(objeto,profecionY);
                    return aux;
                    break;
             case 'nombreEspecialidad':
                    aux=await verificarY(objeto,especialidadY);
                    return aux;
                    break
             case 'nombreGenerico':
                   aux=await verificarY(objeto,nombreGenericoY);
                   return aux;
                break; 
            case 'nombreFamilia':
                   aux=await verificarY(objeto,nombreFamiliaY);
                   return aux;
                break;
            case 'nombreCategoria':
                   aux=await verificarY(objeto,nombreCategoriaY);
                   return aux;
                break;
            case 'nombreForma':
                   aux=await verificarY(objeto,nombreFormaY);
                   return aux;
                break;
            case 'nombrePresentacion':
                   aux=await verificarY(objeto,nombrePresentacionY);
                   return aux;
                break; 
            case 'paciente':
                aux=await verificarY(objeto,pacienteY);
                return aux;
                break;                                
             default:
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