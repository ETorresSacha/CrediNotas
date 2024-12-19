import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { StyleSheet, View } from "react-native";
import Header from "../../components/header/Header";

const VerCronograma = (props) => {
  const user =
    props.route.params?.dataPerson?.resultPrestamo || props.route.params?.user;
  const id = props.route.params?.valueProps?.id || props.route.params?.id;
  const enable =
    props.route.params?.valueProps?.enable || props.route.params?.enable;
  const editValue =
    props.route.params?.valueProps?.editValue || props.route.params?.editValue;
  const typeColor =
    props.route.params?.valueProps?.typeColor || props.route.params?.typeColor;
  const dataConfiguration =
    props.route.params?.valueProps?.dataConfiguration ||
    props.route.params?.dataConfiguration;

  const ccv = props.route.params?.valueProps?.intMoratorio;

  return (
    <View style={styles.container}>
      <Header
        title={"Cronograma"}
        back={ccv ? "Nuevo cliente" : editValue ? "Nuevo cliente" : "Detalle"}
        data={
          props.route.params?.valueProps || {
            id,
            enable,
            typeColor,
            dataConfiguration,
          }
        }
      />
      <Cronograma data={user} />
    </View>
  );
};

export default VerCronograma;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
});
