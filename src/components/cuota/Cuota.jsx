import React from "react";
import { View, StyleSheet, Alert, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RFPercentage } from "react-native-responsive-fontsize";

const Cuota = ({
  cuota,
  changeValue,
  editValue,
  dataPerson,
  user,
  id,
  typeColor,
  enable,
  dataConfiguration,
}) => {
  const navigation = useNavigation();

  const cuota2 = user.resultPrestamo[0]?.cuotaNeto;

  const handleRouteCronograma = () => {
    navigation.navigate("Cronograma", {
      editValue,
      user: dataPerson,
      id,
      typeColor,
      enable,
      dataConfiguration,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Pressable style={styles.button}>
          <Text style={styles.text}>{changeValue ? cuota : cuota2}</Text>
        </Pressable>
      </View>
      <View>
        <Pressable
          style={styles.buttonCronograma}
          onPress={handleRouteCronograma}
        >
          <Text style={styles.textCronograma}>Cronograma</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Cuota;
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: RFPercentage(2),
  },

  button: {
    alignItems: "center",
    width: RFPercentage(19),
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  buttonCronograma: {
    alignItems: "center",
    width: RFPercentage(19),
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  text: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },

  textCronograma: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
