import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import NavBar from "../../components/navBar/NavBar";
import { customerData, orderData } from "../../utils/thunks/Thunks";
import { format } from "date-fns";
import Header from "../../components/header/Header";
import DataCustomer from "./DataCustomer";
import Alerta from "../alert/Alerta";
import { renderImportData } from "./renderImportData";
import MessageNotification from "../notificacionExpo/MessageNotification";

const Customer = (props) => {
  let enable = props?.route?.params?.data?.enable; // Habilita el componente de los clientes cancelados
  let valueProps = props?.route?.params?.data; // Valores para la configuración del prestamo

  const { onGetCronograma } = UseStorage();
  const [dataConfiguration, setDataConfiguration] = useState({}); // Datos de la configuración
  const [valueImport, setValueImport] = useState(false); // Necesario para importar la data
  // const [day, setDay] = useState("");
  // const [inicio, setInicio] = useState();
  // const [dataCustomer, setDataCustomer] = useState();
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

  // clasificación de los clientes de acuerdo a la fecha de pago
  // const resultCustomer = () => {
  //   setInicio(false);

  //   setDay(format(new Date(), "yyyy-MM-dd"));
  //   let result = customerData(data.dataResult, day);

  //   // Habilitamos el texto si no existe datos guardados
  //   if (
  //     !enable
  //       ? result?.resultDataResult.length == 0
  //       : result?.resultCustomerCancelled.length == 0
  //   ) {
  //     setInicio(true);
  //   }

  //   //Seteamos los datos del dataCustomer
  //   setDataCustomer({
  //     ...dataCustomer,
  //     customerCancelled: result?.resultCustomerCancelled,
  //     dataResult: result.resultDataResult,
  //   });
  // };

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
      loadCongiguration();

      //return () => unsubscribe();
    }, [setData])
  );

  // useEffect(() => {
  //   //setTimeout(resultCustomer, 1000);
  //   resultCustomer();
  // }, [data, setDataCustomer, inicio]); //! esta para evluar si se agrega en esta parte setCustomer e inicio

  // Función para importar data
  // useFocusEffect(
  //   React.useCallback(() => {
  //     //Función
  //     renderImportData(
  //       valueImport,
  //       setValueImport,
  //       data,
  //       setData
  //       //dataCustomer?.dataResult //! este dato es importante, asi que veamos donde hacemos que funcione la funcion
  //     );
  //   }, [valueImport])
  // );

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

      <DataCustomer
        data={data}
        setData={setData}
        //dataCustomer={dataCustomer}
        enable={enable}
        dataConfiguration={dataConfiguration}
        // day={day}
        // inicio={inicio}
        valueImport={valueImport}
        setValueImport={setValueImport}
      />

      {/* Notificaciones de los clientes por cobrar */}
      {/* <Alerta dataRed={8} dataYellow={5} /> */}
      <MessageNotification />
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
// {/* Notificaciones de los clientes por cobrar */}
// {dataCustomer?.customerYellow?.length != 0 ||
//   dataCustomer?.customerRed?.length != 0 ? (
//     <Alerta
//       dataRed={dataCustomer?.customerRed}
//       dataYellow={dataCustomer?.customerYellow}
//     />
//   ) : null}
