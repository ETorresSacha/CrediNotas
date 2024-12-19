import {
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { validationTPM } from "../../utils/validation/Validation";

const ModalCofigTPM = ({
  isVisible,
  setIsVisible,
  editValue,
  prestamo,
  setPrestamo,
}) => {
  const { onSaveDataTPM } = UseStorageTPM();
  const [tpm, setTPM] = useState("");

  const handleKeepTPM = async (value) => {
    // Validando
    let error = validationTPM(value);
    let valuesError = Object.values(error);
    if (valuesError.some((error) => error != "")) {
      Alert.alert("Dato incorrecto");
    } else {
      if (editValue) {
        setPrestamo({ ...prestamo, tasaPrimaMensual: value });
      } else {
        await onSaveDataTPM(value);
      }
      setIsVisible(false);
    }
  };
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={isVisible}
      onRequestClose={() => setIsVisible(false)}
    >
      <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <Text style={styles.titleModal}>CONFIGURACIÓN</Text>
        <View style={styles.containerTPM}>
          <Text style={styles.text}>Tasa Prima Mensual: </Text>
          <TextInput
            style={styles.input}
            value={tpm}
            placeholder={"%"}
            placeholderTextColor="gray"
            onChangeText={(text) => {
              setTPM(text);
            }}
            keyboardType="numeric"
          ></TextInput>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnCalcular}
            onPress={() => handleKeepTPM(tpm)}
          >
            <Text style={styles.textBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCofigTPM;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "beige",
    borderRadius: 2,
    position: "absolute",
    top: "15%",
    left: "10%",
    right: "10%",
    borderRadius: 15,
    borderWidth: 1,
    padding: 10,
  },
  titleModal: {
    color: "black",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  containerTPM: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 20,
  },
  input: {
    height: 30,
    width: 120,
    borderBottomWidth: 1,
    padding: 2,
    paddingLeft: 10,
    textAlign: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 15,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 30,
  },
  btnCalcular: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecb71",
    width: 300,
    height: 40,
    borderRadius: 15,
  },
  textBtn: {
    fontSize: 19,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },
});
