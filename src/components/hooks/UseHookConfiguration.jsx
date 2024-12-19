import AsyncStorage from "@react-native-async-storage/async-storage";
//import { TASA_PRIMA_KEY } from "@env";
const TASA_PRIMA_KEY = "@data_tasaPrima";

const UseStorageConfiguration = () => {
  // GUARDAR INFORMACION
  const saveInfoStorage = async (storageKey, meal) => {
    try {
      //await AsyncStorage.clear(TASA_PRIMA_KEY);

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //TODO--> TASA PRIMA MENSUAL

  //! POST
  const handleSaveConfiguration = async (data) => {
    try {
      await saveInfoStorage(TASA_PRIMA_KEY, data);

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //! GET
  const handleGetConfiguration = async () => {
    try {
      let result = await AsyncStorage.getItem(TASA_PRIMA_KEY);

      if (result != null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };

  return {
    onSaveDataConfiguration: handleSaveConfiguration,
    onGetConfiguration: handleGetConfiguration,
  };
};
export default UseStorageConfiguration;
