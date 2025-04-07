import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";

import { calculoCanlelarDeuda } from "@/src/utils/calculoCuota/CalculosFuncionesCrediticios";
import { format } from "date-fns";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const ModalCancelPay = ({
  isVisible,
  setIsVisible,
  resultPrestamo,
  valueProps,
  interes,
  dataSee,
}) => {
  let deuda = calculoCanlelarDeuda(
    resultPrestamo,
    valueProps?.dataConfiguration,
    interes
  );
  console.log(dataSee);
  console.log(deuda);

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
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Capital: </Text>
            <Text style={styles.itemText}>{dataSee?.capital}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemTitle}>Cuotas cancelados: </Text>
            <Text style={styles.itemText}>{dataSee?.cuota - 1}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.itemTitle}>Deduccioón de la cuenta a saldar</Text>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Cuotas Pendientes: </Text>
            <Text style={styles.itemText}>S/ {deuda?.capitalMora}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Mora: </Text>
            <Text style={styles.itemText}>S/ {deuda?.mora}</Text>
          </View>
          <View style={styles.item}>
            <Text style={[styles.itemTitle, { backgroundColor: "green" }]}>
              Capital restante:{" "}
            </Text>
            <Text style={styles.itemText}>S/ {deuda?.capitalPendiente}</Text>
          </View>

          <View style={styles.item}>
            <Text style={styles.itemTitle}>Interes generado: </Text>
            <Text style={styles.itemText}>S/ {deuda?.interes}</Text>
          </View>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Monto a cancelar: </Text>
            <Text style={styles.itemText}>
              S/{" "}
              {parseFloat(deuda?.capitalMora) +
                parseFloat(deuda?.mora) +
                parseFloat(deuda?.capitalPendiente) +
                parseFloat(deuda?.interes)}
            </Text>
          </View>
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
    alignItems: "stretch",
    backgroundColor: "rgba(6, 18, 20, 0.836)",
    borderColor: "white",
    position: "absolute",
    top: "30%",
    left: "7%",
    right: "7%",
    borderRadius: 15,
    borderWidth: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "blue",
    //sjustifyContent: "space-around",
  },
  graficoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "red",
  },

  item: {
    display: "flex",
    flexDirection: "row",
  },
  itemTitle: {
    //width: 100,
    color: "cornsilk",
    // fontSize: RFValue(13.5),
    fontWeight: "bold",
  },
  itemText: {
    color: "white",
    fontSize: RFValue(14),
  },
});
