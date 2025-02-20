import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import Customer from "../customer/Customer";

const CanceledCustomer = (props) => {
  const [enable, setEnable] = useState(true); //  Habilita el componente de los clientes cancelados
  console.log("holalaal");

  useEffect(() => {
    setEnable(props.route?.params?.data?.enable);
  }, []);

  return (
    <View style={styles.container}>{/* <Customer props={props} /> */}</View>
  );
};

export default CanceledCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});
