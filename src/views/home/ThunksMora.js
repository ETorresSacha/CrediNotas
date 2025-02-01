export const verifMora = (data, mora,day)=>{

    let result;
    let color
    //let [anioToDay, mesToDay, diaToDay] = day.split("-");
    console.log("datad: ",data[0]?.resultPrestamo);
    
    if (data != undefined) { // Calcula la fecha de pago
      result = data[0]?.resultCustomer?.resultPrestamo?.find(
        (element) => element.statusPay == false
      );


      //! NO QUIERE RECORRE EL ARRAY, NO SE ENCUENTRA RESULTADO, VERIFICAR DESDE ESRA PARTE
      
      
  
       // let [anio, mes, dia] = result.fechaPago.split("-");

        // Cálculo de la mora
        
        // Clasifica el color de las alertas, de acuerdo a la fecha de pago
        // if (differenceInDays(new Date(anio, mes - 1, dia),new Date(anioToDay, mesToDay - 1, diaToDay)) < 0) {color = "red"} 
        // else if (day == result.fechaPago) {color = "yellow"} 
        // else if (differenceInDays(new Date(anio, mes - 1, dia),new Date(anioToDay, mesToDay - 1, diaToDay)) == 1) {color = "rgb(66, 242, 46)"} 
        // else {color = "cornsilk"}
      }
      console.log("resultt: ",result);
      return console.log(result);
      
      //return result == undefined ? null : {fecha:formatDate(result.fechaPago),color:color};
  }