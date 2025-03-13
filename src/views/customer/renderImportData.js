// Función para importar y renderizar la data

import { Alert } from "react-native";
import { importExcel } from "../../modals/modalOptionsCustomer/importExcel";

export const renderImportData =(valueImport,setValueImport, data,setData,customer)=>{

    if (valueImport) {
      if (data?.dataResult != null && data?.dataResult?.length != 0) {
        const customerText = customer?.length !== 0 ? "Clientes" : "Clientes cancelados";
        Alert.alert(
          "¡ALERTA!",
          `Existen ${customerText} guardados. Si continúa, se borrarán los datos actuales.\n ¿Desea continuar?`,
          
          [
            {
              text: "Si",
              onPress: async () => importExcel(data,setData),
              style: "destructive",
            },
            {
              text: "No",
              style: "destructive",
            },
          ]
        );
      } else {
        importExcel(data,setData); // importa
      }
      setValueImport(false);
    }
  }