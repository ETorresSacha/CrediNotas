import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Customer from "../customer/Customer";

const CanceledCustomer = (props) => {
  const [enable, setEnable] = useState(true); //  Habilita el componente de los clientes cancelados
  //! ESTE COMPONENTE NO SE ESTA USANDO , VAMOS A EVALUAR PARA ELIMINARLO AL FINAL DEL PROYECTO, CLARO SI NO ES UTIL

  useEffect(() => {
    setEnable(props.route?.params?.data?.enable);
  }, []);

  return (
    <View style={styles.container}>
      <Customer props={props} />{" "}
    </View>
  );
};

export default CanceledCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});
