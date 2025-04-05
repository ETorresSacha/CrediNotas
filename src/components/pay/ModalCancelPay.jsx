import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

import { RFPercentage } from "react-native-responsive-fontsize";
import { calculoCanlelarDeuda } from "@/src/utils/calculoCuota/CalculosFuncionesCrediticios";
import { format } from "date-fns";

const ModalCancelPay = ({
  isVisible,
  setIsVisible,
  resultPrestamo,
  valueProps,
}) => {
  let day = new Date();

  let result = calculoCanlelarDeuda(
    resultPrestamo,
    day,
    valueProps?.dataConfiguration
  );
  // let cuotaPrePago = result.find((ele) => ele?.mora == 0);

  // console.log("cuotaPrePago: ", result);

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
        <View style={{ paddingBottom: 15, alignContent: "center" }}>
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            CANCELAR LA DEUDA
          </Text>
        </View>

        <View style={styles.graficoContainer}>
          <Text>cancelar el pago</Text>
        </View>
      </View>
    </Modal>
  );
};

export default ModalCancelPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(6, 18, 20, 0.836)",
    borderColor: "white",
    position: "absolute",
    top: "30%",
    left: "7%",
    right: "7%",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  containerLeyendaIcono: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: RFPercentage(15),
    gap: 7,
  },
  graficoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  containerTitleLeyenda: {
    alignContent: "center",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  leyenda: {
    display: "flex",
    flexDirection: "row",
    color: "white",
    width: 70,
    paddingHorizontal: 5,
    fontSize: RFPercentage(1.6),
  },
  titleLeyenda: {
    display: "flex",
    flexDirection: "row",
    color: "orange",
    width: 10,
    height: 20,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
