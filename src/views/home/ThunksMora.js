import { calculoMoraSimple } from "@/src/utils/calculoCuota/CalculosFuncionesCrediticios";

export const verifMora = (data, mora)=>{

    let result;

    if (data != undefined) {
      data?.map(element=>{
        result = element?.resultPrestamo?.find(ele => ele.statusPay == false); // Busca la cuota que esta esta en deuda
        let indice = element?.resultPrestamo?.findIndex(e=> e.statusPay == false); // Busca el índice de la cuota que se encuetra en deuda
        let resltadoMora = calculoMoraSimple(result,mora) // Calcula la mora
        let newData = {...result,mora:resltadoMora} // Es agregado la mora dentro del objeto en el que se encuentra la deuda
        element?.resultPrestamo.splice(indice,1,newData) // Reemplaza el objeto con los datos de la mora en el índice correspondiente
        
      })}
      
      return data
      
  }