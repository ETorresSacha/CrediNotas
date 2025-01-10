import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { StyleSheet, View } from "react-native";
import Header from "../../components/header/Header";

const VerCronograma = (props) => {
  const user = props.route.params?.user; //para detalle el segundo
  //props.route.params?.user?.resultPrestamo || props.route.params?.user; //! comparar con el newform
  const id = props.route.params?.id;
  const enable = props.route.params?.enable;
  const editValue = props.route.params?.editValue;
  const typeColor = props.route.params?.typeColor;
  const dataConfiguration = props.route.params?.dataConfiguration;

  const ccv = props.route.params?.valueProps?.dataConfiguration;
  console.log("propsconograma: ", props.route.params);

  console.log("userCRONGRAMA: ", user);

  return (
    <View style={styles.container}>
      <Header
        title={"Cronograma"}
        back={
          !dataConfiguration
            ? "Nuevo cliente"
            : editValue
            ? "Nuevo cliente"
            : "Detalle"
        }
        //back={editValue ? "Nuevo cliente" : "Detalle"}
        //back={"Nuevo cliente"}
        data={{
          editValue,
          user: user,
          id,
          typeColor,
          enable,
          dataConfiguration,
        }}
        //data={{ user: user }}

        // data={{
        //   editValue,
        //   user,
        //   id,
        //   typeColor,
        //   enable,
        //   dataConfiguration,
        // }}
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
