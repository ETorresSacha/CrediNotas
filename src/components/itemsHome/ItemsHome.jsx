import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const ItemsHome = ({ dataConfiguration }) => {
  const navigation = useNavigation();

  const handleOnPress = (value, data) => {
    navigation.navigate(value, { data: data ? data : null });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => handleOnPress("Clientes")}
        style={styles.item}
      >
        <FontAwesome name="users" size={100} color="rgb(36, 224, 58)" />
        <Text style={styles.text}> Clientes Pendientes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleOnPress("Clientes", { enable: true })}
        style={styles.item}
      >
        <MaterialCommunityIcons
          name="account-cancel"
          size={100}
          color="rgb(36, 224, 221)"
        />
        <Text style={styles.text}> Clientes Cancelados</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => handleOnPress("Calculadora", dataConfiguration)}
        style={styles.item}
      >
        <Ionicons name="calculator" size={100} color="rgb(224, 205, 36)" />
        <Text style={styles.text}> Evaluar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemsHome;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // width: 330,
    justifyContent: "center",
    alignContent: "center",
    padding: 20,
    marginTop: "20%",
    //marginLeft: 30,
    borderRadius: 20,
    gap: 30,
  },

  text: {
    fontWeight: "bold",
    color: "cornsilk",
    textAlign: "center",
    width: "90%",
  },
  item: {
    justifyContent: "center",
    display: "flex",
    alignItems: "center",
  },
});
