import * as yup from 'yup';  // Importa todas las exportaciones de yup
import { retornarErrorSinRes } from './funsionesControlador.js';
const domicilioY=yup.object().shape({
domicilioProfecional:yup.string()
     .required('El domocilio es obligatorio')
     .max(30,'El domocilio no debe superar los 30 caracteres')
})
const dniY=yup.object().shape({
    dni: yup.string()
        .matches(/^\d{7,8}$/, 'El DNI debe ser un número de 7 u 8 caracteres')
        .required('El DNI es obligatorio'),
})
const nombreY=yup.object().shape({

    nombre: yup.string()
        .matches(/^[a-zA-Z]+$/, 'El nombre solo debe contener letras')
        .max(30, 'El nombre debe tener como máximo 30 caracteres')
        .required('El nombre es obligatorio'),
})
const apellidoY=yup.object().shape({
    apellido: yup.string()
        .matches(/^[a-zA-Z]+$/, 'El apellido solo debe contener letras')
        .max(30, 'El apellido debe tener como máximo 30 caracteres')
        .required('El apellido es obligatorio'),
}) 
const fechaNY=yup.object().shape({
    fechaN: yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .typeError('La fecha de nacimiento debe ser válida'),
}) 

const pacienteY=yup.object().shape({

nombre: yup.string()
    .matches(/^[a-zA-Z]+$/, 'El nombre solo debe contener letras')
    .max(30, 'El nombre debe tener como máximo 30 caracteres')
    .required('El nombre es obligatorio'),
apellido: yup.string()
    .matches(/^[a-zA-Z]+$/, 'El apellido solo debe contener letras')
    .max(30, 'El apellido debe tener como máximo 30 caracteres')
    .required('El apellido es obligatorio'),
dni: yup.string()
    .matches(/^\d{7,8}$/, 'El DNI debe ser un número de 7 u 8 caracteres')
    .required('El DNI es obligatorio'),    
estado: yup.boolean()
    .required('El estado es obligatorio'),
fechaNacimiento: yup.date()
    .required('La fecha de nacimiento es obligatoria')
    .typeError('La fecha de nacimiento debe ser válida'),
idPlanObraSocial: yup.number()
    .integer('El ID del plan debe ser un número entero')
    .min(1, 'El ID del plan debe ser mayor que 0')
    .required('El ID del plan es obligatorio'),
  
sexo: yup.number()
    .integer('El sexo debe ser un número entero')
    .min(1, 'El sexo debe ser mayor que 0')
    .required('El sexo es obligatorio'),
      

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
    .max(98,'El nombre de la Practica debe tener como maximo 98 caracteres')
    .required('El nombre de la practica es obligatorio')
 }) 
 const procedimientoY=yup.object().shape({
    nombreProcedimiento:yup.string()
    .max(198,'El nombre del procedimiento debe tener como maximo 198 caracteres')
    .required('El nombre del procedimiento es obligatorio')
 }) 
 const examenY=yup.object().shape({
    nombreExamen:yup.string()
    .max(198,'El nombre del Examen debe tener como maximo 198 caracteres')
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
 const prescripcionY=yup.object().shape({
    idProfecional:yup.number()
    .required('La Prescripcion deve contener un Profecional'),
    fechaA:yup.date()
    .required('La fecha de vencimiento en la Prescripcion es obligatoria')
    .typeError('La fecha actual en la Prescripcion debe ser válida'),
    idPaciente:yup.number()
    .required('La prescripcion deve contener un paciente'),
    idPlanObraSocial:yup.number()
    .required('La Prescripcion deve contener una Obra Social y su Plan'),
    diagnostico:yup.string()
    .required('La Prescripcion deve tener un diagnostico')
    .max(298,'El Diagnostico no deve superar los 298 caracteres'),
    fechaVC:yup.date()
    //.nullable(true)
    .notRequired()
    .typeError('La fecha de vencimiento en la Prescripcion debe ser válida'),
 })
 
const prestacionesY=yup.object().shape({
    idPrestacion:yup.number()
    .required('La Prestacion es obligatoria'),
    idLado: yup.number()
    .nullable(true)
    .notRequired()
    .typeError('El idLado debe ser un número'),
    indicacion:yup.string()
    .required('La Prestacion deve contener una Indicacion')
    .max(38,'La Indicacion no deve superar los 38 caracteres'),
    justificacion:yup.string()
    .required('La prestacion deve tener una justificacion')
    .max(38,'La Justificacion no debe superar los 38 caracteres'),
    observacion: yup.string()
    .nullable(true)
    .max(38, 'La observación no debe superar los 38 caracteres'),
})
const medicamentosY=yup.object().shape({
    idNGP:yup.number()
    .required('La Prescripcion deve contener un Medicamento')
    .typeError('El Medicamento debe ser un numero'),
    idAdministracion:yup.number()
    .required('El Medicamento deve contener una Administracion')
    .typeError('La administarcion debe ser un numero'),
    idDuracionAdministracion:yup.number()
    .required('El Medicamento deve contener una Duracion de la Adminstarcion')
    .typeError('La Duracion debe ser un numero'),
    nombreComercial:yup.string()
    .nullable(true)
    .max(298, 'El nombre comercial del Medicamento no debe superar los 298 caracteres'),
})
const observacionY=yup.object().shape({
    observacion:yup.string()
    .required('La observacion es Obligatoria')
    .max(38,'La oservacion debe contener como maximo 38 caracteres')
})
//
//console.log(medicamentos);
//console.log(profecionales);
async function verificar(objeto,nombre){
    let aux;
        //console.log(objeto);
    try{

           
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
            case 'prescripcion':
                aux=await verificarY(objeto,prescripcionY);
                return aux;
                break;
            case 'prestaciones':
                aux=await verificarY(objeto,prestacionesY);
                return aux;
                break;
            case 'medicamentos':
                aux=verificarY(objeto,medicamentosY);
                return aux;
                break; 
            case 'observacion':
                aux=verificarY(objeto,observacionY);
                return aux;
                break;
            case 'dni':
                aux=verificarY(objeto,dniY);
                return aux;
                break;
            case 'nombre':
                aux=verificarY(objeto,nombreY);
                return aux;
                break;     
            case 'apellido':
                aux=verificarY(objeto,apellidoY);
                return aux;
                break; 
            case 'fechaN':
                aux=verificarY(objeto,fechaNY);
                return aux;
                break;               
             default:
                return retornarErrorSinRes('Seleccion no valida en verificar para yup');
       }
       
    }catch(error){
        console.error(`Error en verificar yups:${error}`)
        return retornarErrorSinRes(`Erro en verificar para yup :${error}`)
    }
       
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