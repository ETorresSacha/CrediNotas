import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { orderData } from "../../utils/thunks/Thunks";
import { format } from "date-fns";
import Header from "../../components/header/Header";
import RenderCustomer from "./RenderCustomer";
import UseStorageConfiguration from "@/src/components/hooks/UseHookConfiguration";

const Customer = (props) => {
  let enable = props?.route?.params?.data?.enable; // Habilita el componente de los clientes cancelados
  let valueConfigure = props?.route?.params?.data;

  const { onGetCronograma } = UseStorage();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [dataConfiguration, setDataConfiguration] = useState({}); // Datos de la configuración
  const [valueImport, setValueImport] = useState(false); // Necesario para importar la data
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });

  // Trae los datos del local storage
  const loadCustomer = async () => {
    try {
      let resultCustomer = await onGetCronograma();

      resultCustomer = orderData("fecha", resultCustomer, false, enable); // ordena de forma ascendente de acuerdo a la fecha

      setData({
        ...data,
        dataResult: resultCustomer,
        dataResultCopy: resultCustomer,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar los datos de la configuración
  const loadCongiguration = async () => {
    try {
      let result = await onGetConfiguration();
      setDataConfiguration(
        result == undefined ? { intMoratorio: "0.00" } : result[0] // "undefined" ocurre solo cuando no se guarda el interes en el storage
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Renderiza
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      loadCongiguration();

      //return () => unsubscribe();
    }, [setData, setDataConfiguration])
  );

  return (
    <View style={styles.container}>
      <Header
        title={!enable ? "Clientes" : "Clientes cancelados"}
        setValueImport={setValueImport}
      />
      <NavBar
        data={data}
        setData={setData}
        enable={enable}
        dataConfiguration={dataConfiguration}
      />

      <RenderCustomer
        data={data}
        setData={setData}
        enable={enable}
        dataConfiguration={dataConfiguration}
        valueImport={valueImport}
        setValueImport={setValueImport}
      />
    </View>
  );
};
//
export default Customer;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
});

//! CONCIDERO QUE COMO ES UN PRESTAMO INDIVIDUAL, LO QUE SE TIENE QUE HACER EL EL INTERES

//! MORATORIO INGRESE A ESTA PARTE Y DE AHI AL COMPONENTE NECESARIO PARA CALCULAR EL INTERS MORATORIO
//! PARA QUE SE VISUALICE LA CUOTA CON LA MORA
