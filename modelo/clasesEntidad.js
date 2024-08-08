class Persona {
    constructor(idPersona,nombre, apellido, dni) {
      this.idPersona=idPersona;
      this.nombre = nombre;
      this.apellido = apellido;
      this.dni = dni;
      
    }
  
    
  }
  class Medico extends Persona {
    constructor(idMedico,idPersona,nombre, apellido, dni, domicilio,idProfecion, profesion,idEspecialidad, especialidad, matriculaProfesional) {
      superidPersona,(nombre, apellido, dni);
      this.idMedico=idMedico;
      this.domicilio = domicilio;
      this.idProfecion=idProfecion;
      this.profesion = profesion;
      this.idEspecialidad=idEspecialidad;
      this.especialidad = especialidad;
      this.matriculaProfesional = matriculaProfesional;
      
    }
   }
  class Paciente extends Persona{
    constructor(idPersona,nombre,apellido,dni,idPaciente,fechaNacimiento,sexo){
      super(idPersona,nombre,apellido,dni);
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
 
  
  export{Medico,Paciente};