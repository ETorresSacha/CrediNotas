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
import equal from "deep-equal";
import React from "react";
import { validationConfiguration } from "../../../utils/validation/Validation";
import UseStorageConfiguration from "../../../components/hooks/UseHookConfiguration";
import { RFPercentage } from "react-native-responsive-fontsize";

const Configuration = ({
  enablerConf,
  setEnableConf,
  dataConfiguration,
  setDataConfiguration,
  copy,
}) => {
  const { onSaveDataConfiguration } = UseStorageConfiguration();

  const handleKeep = async (value) => {
    // Validando
    let error = validationConfiguration(value);
    let valuesError = Object.values(error);

    if (valuesError.some((error) => error != "")) {
      let typeError = valuesError.find((element) => element != ""); // Busca el tipo de error que existe
      Alert.alert(typeError);
    } else {
      await onSaveDataConfiguration(value);
      setEnableConf(false);
    }
  };

  // Modificaión de la tasa moratoria
  const onPressConfig = () => {
    if (!equal(copy, dataConfiguration)) {
      Alert.alert("GUARDAR", "¿Desea guardar los cambios?", [
        {
          text: "Si",
          onPress: async () => {
            handleKeep(dataConfiguration);
            setDataConfiguration(dataConfiguration);
            //setEnableConf(false);
          },
          style: "destructive",
        },
        {
          text: "No",
          style: "destructive",
          onPress: async () => {
            setEnableConf(false);
            setDataConfiguration(copy);
          },
        },
      ]);
    } else {
      setEnableConf(false);
    }
  };
  return (
    <Modal
      style={styles.container}
      transparent={true}
      visible={enablerConf}
      onRequestClose={() => setEnableConf(false)}
    >
      <TouchableWithoutFeedback onPress={() => onPressConfig()}>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.modalContent}>
        <View style={{ paddingBottom: 10 }}>
          <Text
            style={{
              color: "black",
              textAlign: "center",
              fontSize: 20,
              fontWeight: "bold",
            }}
          >
            INTERÉS MORATORIO
          </Text>
        </View>

        {/* Tasa Prima Mensual */}
        {/* <View style={styles.containerInput}>
          <Text>Tasa Prima Mensual</Text>
          <View style={styles.inputView}>
            <TextInput
              value={dataConfiguration.tpm}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setDataConfiguration({ ...dataConfiguration, tpm: text });
              }}
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20 }}>%</Text>
          </View>
        </View> */}

        {/* Comisión de Cobranza Variable */}
        {/* <View style={styles.containerInput}>
          <Text>Comisión de Cobranza Variable</Text>
          <View style={styles.inputView}>
            <TextInput
              value={dataConfiguration.ccv}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setDataConfiguration({ ...dataConfiguration, ccv: text });
              }}
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20 }}>%</Text>
          </View>
        </View> */}

        {/* Interés Moratorio */}
        <View style={{ paddingTop: 10 }}>
          <Text style={{ color: "gray" }}>
            Aplicable solo cuando existe mora
          </Text>
        </View>
        <View style={styles.containerInput}>
          <Text>Interés Moratorio</Text>
          <View style={styles.inputView}>
            <TextInput
              value={dataConfiguration?.intMoratorio}
              style={styles.input}
              placeholderTextColor="gray"
              onChangeText={(text) => {
                setDataConfiguration({
                  ...dataConfiguration,
                  intMoratorio: text,
                });
              }}
              keyboardType="numeric"
            />
            <Text style={{ fontSize: 20 }}>%</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnCalcular}
            onPress={() => handleKeep(dataConfiguration)}
          >
            <Text style={styles.textBtn}>Guardar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Configuration;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  containerInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  inputView: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 5,
    alignItems: "flex-end",
  },
  input: {
    alignItems: "center",
    textAlign: "center",
    color: "black",
    borderBottomColor: "black",
    borderBottomWidth: 1,
    width: 60,
    fontSize: 17,
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 30,
    alignItems: "center",
  },
  btnCalcular: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecb71",
    width: RFPercentage(32),
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
