import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { customerData, orderData } from "../../utils/thunks/Thunks";
import { format } from "date-fns";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import DataCustomer from "./DataCustomer";
import Alerta from "../alert/Alerta";
import { renderImportData } from "./renderImportData";

const Customer = (props) => {
  let enable = props?.route?.params?.data?.enable; // Habilita el componente de los clientes cancelados
  let valueProps = props?.route?.params?.data; // Valores para la configuración del prestamo

  const { onGetCronograma } = UseStorage();
  const [dataConfiguration, setDataConfiguration] = useState({}); // Datos de la configuración
  const [day, setDay] = useState("");
  const [on, setOn] = useState(false);
  const [data, setData] = useState({
    dataResult: [],
    dataResultCopy: [],
  });
  const [customer, SetCustomer] = useState({
    customerCancelled: [],
    dataResult: [],
  });
  const [valueImport, setValueImport] = useState(false); // Necesario para importar la data

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

  // clasificación de los clientes de acuerdo a la fecha de pago
  const resultCustomer = () => {
    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    if (result?.resultDataResult) {
      SetCustomer({
        ...customer,
        customerCancelled: result?.resultCustomerCancelled,
        dataResult: result.resultDataResult,
      });
    }
  };

  // Cargar los datos de la configuración
  const loadCongiguration = async () => {
    try {
      // let result = await onGetConfiguration();
      //!!!!! QUEDA PENDIENTE
      //!todo--> NOTA: VERIFICAR SI CUANDO SE BORRA TODO LOS VALORES EN EL STORAGE DE LA CONFICGURACION Y NO HAY DATOS
      //TODO--> SALE ERROR, DE LO CONTRARIO YA NO SERIA NECESARIO CREAR UNA VARIABLE CON USE STATE, SOLO SERIA CONFIGURAR A PARTIR DE LAS
      // TODOS--> PROPS
      setDataConfiguration({
        ...dataConfiguration,
        intMoratorio: valueProps?.intMoratorio,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Renderiza
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      setTimeout(setOn, 1, true);
      loadCongiguration();

      //return () => unsubscribe();
    }, [])
  );
  useEffect(() => {
    resultCustomer();
  }, [data]);

  // Función para importar data
  useFocusEffect(
    React.useCallback(() => {
      //Función
      renderImportData(
        valueImport,
        setValueImport,
        data,
        setData,
        customer?.dataResult
      );
    }, [valueImport])
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

      {/* Notificaciones de los clientes por cobrar */}
      {customer.customerYellow?.length != 0 ||
      customer.customerRed?.length != 0 ? (
        <Alerta
          dataRed={customer.customerRed}
          dataYellow={customer.customerYellow}
        />
      ) : null}

      {on == false ? (
        <Loading />
      ) : (
        <DataCustomer
          data={data}
          setData={setData}
          customer={customer}
          enable={enable}
          dataConfiguration={dataConfiguration}
          day={day}
        />
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
