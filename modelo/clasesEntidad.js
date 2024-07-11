class Persona {
    constructor(nombre, apellido, dni) {
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      
    }
  
    
  }
  class Medico extends Persona {
    constructor(idMedico,nombre, apellido, dni, domicilio, profesion, especialidad, matriculaProfesional) {
      super(nombre, apellido, dni);
      this.idMedico=idMedico;
      this.domicilio = domicilio;
      this.profesion = profesion;
      this.especialidad = especialidad;
      this.matriculaProfesional = matriculaProfesional;
      
    }
   }
  class Paciente extends Persona{
    constructor(nombre,apellido,dni,idPaciente,fechaNacimiento,sexo){
      super(nombre,apellido,dni);
      this.idPaciente=idPaciente;
      this.fechaNacimiento=fechaNacimiento;
      this.sexo=sexo;
      
    }
  } 
  class MedicamentoPrescripcion{
    constructor(nombreGenerico,concentracion,forma,presentacion,familia,categoria,administracion){
        this.nombreGenerico=nombreGenerico;
        this.concentracion=concentracion;
        this.forma=forma;
        this.presentacion=presentacion;
        this.familia=familia;
        this.categoria=categoria;
        this.administracion=administracion;
    }
  }
  class PrestacionPrescripcion{
    constructor(practica,procedimiento,examen,lado,indicacion,justificacion,observacion){
        this.practica=practica;
        this.procedimiento=procedimiento;
        this.examen=examen;
        this.lado=lado,
        this.indicacion=indicacion;
        this.justificacion=justificacion;
        this.observacion=observacion;
    }
  }
  class Prescripcion{
    constructor(medico,paciente,diagnostico,fecha,vigencia,medicamentos,prestaciones){
        this.medico=medico;
        this.paciente=paciente;
        this.diagnostico=diagnostico;
        this.fecha=fecha;
        this.vigencia=vigencia;
        this.medicamentos=medicamentos;
        this.prestaciones=prestaciones;
    }
  }
  class Login{
    constructor(idLogin,idMedico,usuarioLogin,claveLogin,tipoAutorizacion,instancia){
      this.idLogin=idLogin;
      this.idMedico=idMedico;
      this.usuarioLogin=usuarioLogin;
      this.claveLogin=claveLogin;
      this.tipoAutorizacion=tipoAutorizacion;
      this.instancia=instancia;
    }
  }
  export{Login,Medico,Paciente};