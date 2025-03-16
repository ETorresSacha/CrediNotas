import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";

const NavBar = ({ data, setData, enable, dataConfiguration }) => {
  const navigation = useNavigation();
  const [textSearch, setText] = useState("");

  // Direcciona para crear un nuevo cliente
  const handleAddPress = () => {
    navigation.navigate("Nuevo cliente", {
      dataConfiguration: dataConfiguration,
    });
  };

  //BUSCAR
  // Busqueda por nombre y dni
  const handleSearch = (text) => {
    let busqueda = parseInt(text);

    // DNI
    if (busqueda / busqueda === 1) {
      let resulSearch = data?.dataResultCopy.filter((element) =>
        element.dni.includes(text)
      );
      setData({ ...data, dataResult: resulSearch });
    }
    // NOMBRE
    else {
      let resulSearch = data?.dataResultCopy.filter((element) =>
        element.nombre.includes(text)
      );
      setData({ ...data, dataResult: resulSearch });
    }
  };
  useEffect(() => {
    handleSearch(textSearch);
  }, [textSearch]);

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={styles.input}
          value={textSearch}
          placeholder="Buscar"
          errorMessage="Error"
          defaultValue={textSearch}
          onChangeText={(text) => {
            setText(text);
          }}
        />
        <View style={styles.icon}>
          <Ionicons
            onPress={() => handleSearch(textSearch)}
            name="search"
            size={25}
            color="black"
          />
        </View>
      </View>
      {!enable ? (
        <TouchableOpacity style={styles.button} onPress={handleAddPress}>
          <Entypo name="add-user" size={25} color="white" />
          <Text style={styles.text}>Nuevo</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default NavBar;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  containerInput: {
    borderColor: "white",
    borderWidth: 2,
    borderRadius: 15,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignContent: "center",
  },
  button: {
    alignItems: "center",
    width: 50,
    height: 50,
    justifyContent: "center",
    borderRadius: 10,
    elevation: 3,
    backgroundColor: "orange",
  },
  text: {
    fontSize: 10,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
  input: {
    backgroundColor: "beige",
    paddingHorizontal: 8,
    height: 45,
    width: 240,
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  icon: {
    backgroundColor: "beige",
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    height: 45,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderBottomRightRadius: 15,
    borderTopRightRadius: 15,
  },
});
