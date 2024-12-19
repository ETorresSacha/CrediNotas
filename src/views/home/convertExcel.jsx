import XLSX from "xlsx";
import RNFS from "react-native-fs";
import { Platform } from "react-native";

export const exportToExcel = async (dataArray, fileName) => {
  try {
    // Crear una hoja de cálculo con los datos del array
    const ws = XLSX.utils.aoa_to_sheet(dataArray);

    // Crear un libro de trabajo
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    // Convertir el libro de trabajo a un archivo binario
    const wbout = XLSX.write(wb, { type: "binary", bookType: "xlsx" });

    // Definir la ruta de destino para guardar el archivo
    const path = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;

    // Escribir el archivo en el sistema de archivos
    await RNFS.writeFile(path, wbout, "binary");

    // Abrir el archivo utilizando la aplicación predeterminada
    if (Platform.OS === "ios") {
      RNFS.downloadFile({
        fromUrl: `file://${path}`,
        toFile: `file://${path}`,
      }).promise.then(() => {
        RNFS.openURL(`file://${path}`);
      });
    } else {
      RNFS.openURL(`file://${path}`);
    }
  } catch (error) {
    console.error("Error al exportar a Excel:", error);
  }
};
