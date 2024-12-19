import * as XLSX from "xlsx";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import { Buffer } from "buffer";
import UseStorage from "../../components/hooks/UseHookStorage";

const { onGetCronograma } = UseStorage();

export const createExcel = async () => {

  // Traemos todos los datos guardados en el storage
  const resultCustomer = await onGetCronograma();

  // Convertimos el resultPrestamos de cada elemento a un string
  resultCustomer.map((element)=> element.resultPrestamo=JSON.stringify(element?.resultPrestamo))

  // Convertir el array de objetos a un array de arrays
  const worksheetData = [
     Object.keys(resultCustomer[0]), // Encabezados
    ...resultCustomer.map((item) => Object.values(item)), // Filas de datos
  ];

    // Crear una nueva hoja de cálculo
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

    // Crear un nuevo libro de trabajo
    const workbook = XLSX.utils.book_new();

    // Añadir la hoja de cálculo al libro de trabajo
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    // Generar el archivo Excel en formato binario
    const excelBinary = XLSX.write(workbook, {
      type: "binary",
      bookType: "xlsx",
    });

    // Convertir el binario a un buffer
    const buffer = Buffer.from(excelBinary, "binary");

    // Convertir el buffer a una cadena base64
    const excelBase64 = buffer.toString("base64");

    // Guardar el archivo en el sistema de archivos
    const filePath = FileSystem.documentDirectory + "data.xlsx";
    await FileSystem.writeAsStringAsync(filePath, excelBase64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Compartir el archivo
    await Sharing.shareAsync(filePath);
  };