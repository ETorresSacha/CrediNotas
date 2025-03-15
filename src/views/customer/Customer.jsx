import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { customerData, orderData } from "../../utils/thunks/Thunks";
import Header from "../../components/header/Header";
import RenderCustomer from "./RenderCustomer";
import UseStorageConfiguration from "@/src/components/hooks/UseHookConfiguration";
import Loading from "@/src/components/loading/Loading";
import { format } from "date-fns";
const Customer = (props) => {
  let enable = props?.route?.params?.data?.enable; // Habilita el componente de los clientes cancelados

  const { onGetCronograma } = UseStorage();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [dataConfiguration, setDataConfiguration] = useState({}); // Datos de la configuración
  const [valueImport, setValueImport] = useState(false); // Necesario para importar la data
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });

  const [dataCustomer, setDataCustomer] = useState();
  const [day, setDay] = useState("");
  const [inicio, setInicio] = useState();
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
  //!!!!!!!!!!!

  // clasificación de los clientes de acuerdo a la fecha de pago
  const resultCustomer = () => {
    setInicio(false);

    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    // Habilitamos el texto si no existe datos guardados
    if (
      !enable
        ? result?.resultDataResult.length == 0
        : result?.resultCustomerCancelled.length == 0
    ) {
      setInicio(true);
    }

    //Seteamos los datos del dataCustomer
    setDataCustomer({
      ...dataCustomer,
      customerCancelled: result?.resultCustomerCancelled,
      dataResult: result.resultDataResult,
    });
  };
  // Renderiza
  useEffect(() => {
    resultCustomer();
  }, [data, setDataCustomer, inicio, day]); //! esta para evluar si se agrega en esta parte setCustomer e inicio

  return (
    <View style={styles.container}>
      {inicio == true ? (
        <Loading />
      ) : (
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
            dataCustomer={dataCustomer}
            day={day}
            inicio={inicio}
          />
        </View>
      )}
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
