import AsyncStorage from "@react-native-async-storage/async-storage";
//import { MY_DATA_KEY } from "@env";
const MY_DATA_KEY = "@data_customerr";

const UseStorage = () => {
  // GUARDAR INFORMACION
  const saveInfoStorage = async (storageKey, meal) => {
    try {
      const currentSave = await AsyncStorage.getItem(storageKey); // Trae los datos guardados

      // Si hay datos guardados
      if (currentSave !== null) {
        const currentSaveParsed = JSON.parse(currentSave);
        currentSaveParsed.push(meal);

        await AsyncStorage.setItem(
          storageKey,
          JSON.stringify(currentSaveParsed)
        );

        return Promise.resolve();
      }

      // Si la lista esta vacia
      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //TODO--> CRONOGRAMA DE PAGO
  //! POST AND UPDATE CUSTOMER
  const handleSaveCronograma = async (dataPerson, editValue) => {
    let indice;
    try {
      // importar data
      if (editValue) {
        let resultGet = await handleGetCronograma();
        if (editValue == "import") {
          await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(dataPerson));
          return Promise.resolve();
        }
        // Guardar mora
        if (editValue == "saveMora") {
          await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(dataPerson));
          return Promise.resolve();
        }
        // Editar
        else {
          resultGet?.find((element, index) => {
            if (element.uuid == dataPerson?.uuid) {
              indice = index;
            }
          });
          resultGet.splice(indice, 1, dataPerson);
          await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(resultGet));
          return Promise.resolve();
        }
      }
      // Nuevo cliente
      await saveInfoStorage(MY_DATA_KEY, dataPerson);
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //! GET
  const handleGetCronograma = async () => {
    //await AsyncStorage.clear();
    try {
      let result = await AsyncStorage.getItem(MY_DATA_KEY);

      if (result !== null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      } else return result;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //! DELETE
  const handleDeleteCustomer = async (uuid) => {
    try {
      const resultGet = await handleGetCronograma();

      const filterItem = resultGet?.filter((element) => {
        return element.uuid !== uuid;
      });
      await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(filterItem));

      return Promise.resolve();
    } catch (error) {
      return console.error(error);
    }
  };

  //! UPDATE
  // UPDATE STATUS DEL PRESTAMO
  const handleUpdateStatusPay = async (data) => {
    try {
      const resultGet = await handleGetCronograma();

      let indice;
      resultGet?.find((element, index) => {
        if (
          element.uuid == (data?.uuid == undefined ? data[0].uuid : data?.uuid)
        ) {
          indice = index;
        }
      });

      let newObjeto = data?.uuid == undefined ? data[0] : data;
      resultGet.splice(indice, 1, newObjeto);
      await AsyncStorage.setItem(MY_DATA_KEY, JSON.stringify(resultGet));

      return Promise.resolve();
    } catch (error) {
      return console.error(error);
    }
  };

  return {
    onSaveCronograma: handleSaveCronograma,
    onGetCronograma: handleGetCronograma,
    onDeleteCustomer: handleDeleteCustomer,
    onUpdateStatusPay: handleUpdateStatusPay,
  };
};

export default UseStorage;
