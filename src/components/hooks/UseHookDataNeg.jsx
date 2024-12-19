import AsyncStorage from "@react-native-async-storage/async-storage";
//import { MY_BUSINESS_KEY } from "@env";
const MY_BUSINESS_KEY = "@data_business";

const UseStorageBusiness = () => {
  // GUARDAR INFORMACION
  const saveInfoStorage = async (storageKey, meal) => {
    try {
      //await AsyncStorage.clear(MY_BUSINESS_KEY);

      await AsyncStorage.setItem(storageKey, JSON.stringify([meal]));

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };

  //TODO--> CRONOGRAMA DE PAGO

  //! POST
  const handleSaveBusiness = async ({ negocio, direccion, celular }) => {
    try {
      const result = await saveInfoStorage(MY_BUSINESS_KEY, {
        negocio,
        direccion,
        celular,
      });

      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //! GET
  const handleGetBusiness = async () => {
    try {
      let result = await AsyncStorage.getItem(MY_BUSINESS_KEY);
      if (result != null) {
        const parseCronograma = JSON.parse(result);

        return Promise.resolve(parseCronograma);
      }
    } catch (error) {
      return Promise.reject(error);
    }
  };
  //! DELETE
  const handleDeleteBusiness = async (celular) => {
    try {
      const resultGet = await handleGetCronograma();

      const filterItem = resultGet?.filter((element) => {
        return element.celular !== celular;
      });
      await AsyncStorage.setItem(MY_BUSINESS_KEY, JSON.stringify(filterItem));

      return Promise.resolve();
    } catch (error) {
      return console.error(error);
    }
  };

  return {
    onSaveDataBusiness: handleSaveBusiness,
    onGetBusiness: handleGetBusiness,
    onDeleteBusiness: handleDeleteBusiness,
  };
};
export default UseStorageBusiness;
