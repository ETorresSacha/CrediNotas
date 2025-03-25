import React from "react";
import Cronograma from "../../components/cronograma/Cronograma";
import { StyleSheet, View } from "react-native";
import Header from "../../components/header/Header";

const VerCronograma = (props) => {
  const user = props.route.params?.user;
  const id = props.route.params?.id;
  const enable = props.route.params?.enable;
  const editValue = props.route.params?.editValue;
  const typeColor = props.route.params?.typeColor;
  const dataConfiguration = props.route.params?.dataConfiguration;

  return (
    <View style={styles.container}>
      <Header
        title={"Cronograma"}
        back={!id ? "Nuevo cliente" : editValue ? "Nuevo cliente" : "Detalle"}
        data={{
          editValue,
          user: user,
          id,
          typeColor,
          enable,
          dataConfiguration,
        }}
      />
      <Cronograma data={user} dataConfiguration={dataConfiguration} />
    </View>
  );
};

export default VerCronograma;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181b21",
  },
});
