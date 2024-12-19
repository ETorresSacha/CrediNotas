//Todo--> Validación

//! Validación de los datos del cliente
export const validationDataPerson = (dataPerson) =>{
    let error = {
     nombre:"",
     apellidos:"",
     dni:"",
     dniError:"",
     correoError:"",
     direccion:"",
     celular:"",
     celularError:""

    }
    //Expresión Regular Email
    let ExpRegEmail=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    let ExpRegNumEnt=/^[0-9]+$/;
    // Datos en blanco
    if(dataPerson.nombre.trim() === "" ) {
        error = {...error,nombre:"Nombre incompleto."}
   }
   if(dataPerson.apellido.trim() === ""  ) {
    error = {...error,apellidos:"Apellidos incompletos."}
    }
    if(  dataPerson.dni.trim() === ""  ) {
       error = {...error,dni:"DNI incompleto."}
   }

   if(dataPerson.dni.trim().length == 8){
    if(dataPerson.dni.match(ExpRegNumEnt)==null ){
        error={...error, dniError:"El número de DNI debe tener valores enteros"}
       } 
   }
   if(dataPerson.dni.trim().length !== 8){
        error = {...error,dniError : "Se aceptan únicamente ocho caracteres para el número de DNI."}
    }
       
   if(  dataPerson.correo.trim() != ""  ) {
    if(dataPerson.correo.match(ExpRegEmail) == null ){
        error = {...error, correoError:"No es una dirección de correo electrónico válido."}
    }
   }

   if(  dataPerson.direccion.trim() === ""  ) {
       error = {...error,direccion:"Dirección incompleto."}
   }
   if(  dataPerson.celular.trim() === ""  ) {
       error = {...error,celular:"Celular incompleto"}
       }

   if(dataPerson.celular.trim().length == 9){
    if(dataPerson.celular.match(ExpRegNumEnt)==null){
        error={...error, celularError:"El número de celular debe tener valores enteros"}
       }
   }
   if(dataPerson.celular.trim().length !== 9){
    error = {...error,celularError : "Se aceptan únicamente nueve caracteres para el número de celular."}
   }

    return error
}

//! Validación de los datos del préstamo
export const validationDataPrestamo = (dataPrestamo) =>{

    let ExpRegNumDec=/^[0-9]+(\.[0-9]+)?$/; // Expresión regular para aceptar solo números decimales
    let ExpRegNumEnt=/^[0-9]?$/; // Expresión regular para aceptar solo números enteros <= 9
    let ExpRegEnt=/^\d*$/ // Expresión regular para aceptar solo números enteros
    let fechaInicio = new Date(dataPrestamo.fechaDesembolso).getTime()
    let fechaFinal = new Date(dataPrestamo.fechaPrimeraCuota).getTime()

    let error = {
     periodo:"",
     capital:"",
     //tea:"",
     //teaInvalido:"",
     interes:"",
     interesInvalido:"",
     cuotas:"",
     cuotaCero:"",
     cuotaInvalido:"",
     fechaDesembolso:"",
     fechaPrimeraCuota:"",
     fechaIncorrecta:""
    }

      if(dataPrestamo.periodo.trim() === ""  ) {
          error = {...error,periodo:"Periodo incompleto"}
      }
      if(dataPrestamo.capital?.trim() === ""  ) {
          error = {...error,capital:"Capital incompleto"}
      }
      if (dataPrestamo?.tipo == "Independiente"){

      }
      //TODO-- Es aplicable para una entidad financiera
    //   if(dataPrestamo.tea.trim() === "" ) {
    //       error = {...error,tea:"TEA incompleto"}
    //   }
    //   if(dataPrestamo.tea.match(ExpRegNumDec)==null){
    //     error={...error, teaInvalido:"El valor de la TEA es inválido"}
    //    }
    //TODO ----------------------------------------------------------

    if(dataPrestamo.interes.trim() === "" ) {
          error = {...error,interes:"Interes incompleto"}
      }
    if(dataPrestamo.interes.match(ExpRegNumDec)==null){
        error={...error, interesInvalido:"El valor del interes es inválido"}
       }
    if(dataPrestamo.cuotas?.trim() === ""  ) {
          error = {...error,cuotas:"Cuota incompleto"}
      }
      if(dataPrestamo.cuotas?.trim() <= 0  ) {
        if(dataPrestamo.cuotas?.trim() < 0){
            error = {...error,cuotaCero:"No existe una cuota negativa"}
        }
        else
        error = {...error,cuotaCero:"Debe existir por lo menos una cuota"}
        }
      if(!dataPrestamo.cuotas.match(ExpRegEnt)){
        error={...error, cuotaInvalido:"El número de las cuotas debe ser un número entero"}
       }
      if(dataPrestamo.fechaDesembolso.trim() === "" ) {
          error = {...error,fechaDesembolso:"La fecha del desembolso incompleto"}
      }
      if(dataPrestamo.fechaPrimeraCuota.trim() === "" ) {
          error = {...error,fechaPrimeraCuota:"La fecha de la primera cuota incompleto"}
      }
      if(fechaFinal - fechaInicio <= 0){
        error = {...error,fechaIncorrecta:"La fecha de la primera cuota debe ser posterior a la fecha de desembolso"}

      }

    return error
}

//! Validación de los datos del préstamo

export const validationInfNegocios = (data) =>{
    let error = {
     celular:""
    }
    // Datos en blanco
    if (data.celular) {      
        if (data.celular?.trim().length != 9){
            error = {...error,celular : "Solo se acepta 9 caracteres"}
        }  
    }
    return error
}


//! Validación de la tasa prima media
export const validationTPM = (data)=>{

    let ExpRegNumDec=/^[0-9]+(\.[0-9]+)?$/;
    let error = {
        errorTPM:""
       }
       if( parseFloat(data) < 0 ){
        error={...error, errorTPM:"Dato inválido"}
       }
       if(data.match(ExpRegNumDec)==null){
        error={...error, errorTPM:"Dato inválido"}
       }
    
    return error
}

export const validationConfiguration = (data)=>{

    const ExpRegNumDec = /^(0(\.[1-9]\d*)?|[1-9]\d*(\.\d*)?)$/;
    let error = {
        errorTPM:"",
        errorTPMCero:"",
        errorTPMDecimal:"",
        errorccv:"",
        errorccvCero:"",
        errorccvDecimal:"",
        errorIntMoratorio:"",
        errorIntMoratorioCero:"",
        errorIntMoratorioDecimal:""
       }
    //    if( data?.tpm.trim() ==  "" ){
    //     error={...error, errorTPM:"Tasa Prima Mensual vacio "}
    //    }
    //    if( parseFloat(data?.tpm.trim()) <=0 ){
    //     error={...error, errorTPMCero:"Tasa Prima Mensual: \n El valor debe de ser mayor que cero "}
    //    }
    //    if(data?.tpm.match(ExpRegNumDec)==null){
    //     error={...error, errorTPMDecimal:"Tasa Prima Mensual: \n Dato inválido"}
    //    }

       
       if( data?.intMoratorio?.trim() == "" ){
        error={...error, errorIntMoratorio:'No se admite un valor vacio, en su defecto asigne "0"'}
       }
    //    if( parseFloat(data?.intMoratorio.trim()) <= 0 ){
    //     error={...error, errorIntMoratorioCero:"Interés Moratorio Anual: \n El valor debe de ser mayor que cero "}
    //    }

       if(data?.intMoratorio.match(ExpRegNumDec)==null){
        error={...error, errorIntMoratorioDecimal:"Dato inválido"}
       }

    //    if( data?.ccv.trim() == "" ){
    //     error={...error, errorccv:"Comisión de Cobranza Variable vacio "}
    //    }
    //    if( parseFloat(data?.ccv.trim()) <= 0 ){
    //     error={...error, errorccvCero:"Comisión de Cobranza Variable:\n El valor debe de ser mayor que cero "}
    //    }
    //    if(data?.ccv.match(ExpRegNumDec)==null){
    //     error={...error, errorccvDecimal:"Comisión de Cobranza Variable: \nDato inválido"}
    //    }
    return error
}

