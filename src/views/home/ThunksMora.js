import UseStorage from "@/src/components/hooks/UseHookStorage";
import { calculoMoraSimple } from "@/src/utils/calculoCuota/CalculosFuncionesCrediticios";

const { onGetCronograma, onSaveCronograma } = UseStorage();

export const verifMora = (data, mora)=>{

    let result;

    if (data != undefined) {
      data?.map(element=>{
        
        // solo para los clientes que no han cancelado la deuda
      if(element?.cancelled == false){
        result = element?.resultPrestamo?.find(ele => ele.statusPay == false); // Busca la cuota que esta esta en deuda
        let indice = element?.resultPrestamo?.findIndex(e=> e.statusPay == false); // Busca el índice de la cuota que se encuetra en deuda
        let resultadoMora = calculoMoraSimple(result,mora) // Calcula la mora
        let newData = {...result,mora:resultadoMora} // Es agregado la mora dentro del objeto en el que se encuentra la deuda
        element?.resultPrestamo?.splice(indice,1,newData) // Reemplaza el objeto con los datos de la mora en el índice correspondiente
      }
        
      })}
      
      return data
      
  }

  //!esta función es par calcular la mora, sin embargo esta para evaluar si sera necesrio o no, esta función se usaba en el componente HOME
  export const loadCustomer = async (dataConfiguration) => {
    
      try {
        let resultCustomer = await onGetCronograma();
  
        if (resultCustomer != null) {
          
          let newResult = verifMora(resultCustomer, dataConfiguration); // verifica la mora
         return  await onSaveCronograma(newResult, "saveMora");

        } else return;
      } catch (error) {
        console.error(error);
      }
    };