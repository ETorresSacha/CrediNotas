import * as DocumentPicker from 'expo-document-picker';
import * as XLSX from 'xlsx';
import { editImportData } from '../../views/customer/editImportData';
import { Alert } from "react-native";
import UseStorage from '../../components/hooks/UseHookStorage';
const {  onSaveCronograma } = UseStorage();

export const importExcel = async (data,setData) => {
  try {
    // Permitir al usuario seleccionar un archivo
    const result = await DocumentPicker.getDocumentAsync({
      type: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/vnd.ms-excel'],
    });
    
    if (result.canceled === true) {
      console.log('User cancelled the picker');
      return;
    }
    const  uri   = result.assets[0].uri;

    // Leer el archivo usando fetch
    const response = await fetch(uri);
    const blob = await response.blob();
    const reader = new FileReader();

    reader.onload = (e) => {
      const arrayBuffer = e.target.result;
      const binaryStr = new Uint8Array(arrayBuffer)
        .reduce((data, byte) => data + String.fromCharCode(byte), '');
      const workbook = XLSX.read(binaryStr, { type: 'binary' });

      // Convertir el primer sheet a JSON
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(worksheet);

      //todo--> Edita los valores que son de tipo string a json
      const resultData = editImportData(json)

      //todo--> Guarda los datos importados en el storage y setea es estado
      const saveImport = async () => {
          await onSaveCronograma(resultData, "import"); // guarda en el storage

          setData({                                    // Setea el estado
            ...data,
            dataResult: resultData,
            dataResultCopy: resultData,
          });
      };

      if (resultData.length != 0) {
        if (resultData.error) {                        // Cuando ocurre un error
          return Alert.alert("Los datos no son válidos");
        } else {
          saveImport();                                // Guarda
        }
      }
      //     todo--------------------------*-----------------------todo
    };

    reader.readAsArrayBuffer(blob);
  } catch (error) {
    console.error('Error:', error);
  }
};

