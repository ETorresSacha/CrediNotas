import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { calculoCanlelarDeuda } from "@/src/utils/calculoCuota/CalculosFuncionesCrediticios";
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

  let montoTotal = (
    parseFloat(deuda?.capitalMora) +
    parseFloat(deuda?.mora) +
    parseFloat(deuda?.capitalPendiente) +
    parseFloat(deuda?.interes)
  ).toFixed(2);

  let data = [
    { "Cuotas Pendientes": deuda?.capitalMora },
    { Mora: deuda?.mora },
    { "Capital restante": deuda?.capitalPendiente },
    { "Interes generado": deuda?.interes },
  ];
  const funcionPagar = () => {
    console.log("pagar");
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
        <View style={{ paddingBottom: 15, alignContent: "center" }}>
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            CANCELAR LA DEUDA
          </Text>
        </View>

        <View style={styles.graficoContainer}>
          <View style={styles.item}>
            <Text style={styles.itemTitle}>Capital: </Text>
            <Text style={styles.itemText}>S/ {dataSee?.capital}</Text>
          </View>
          <View style={{ display: "flex", flexDirection: "column" }}>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Cuotas cancelados: </Text>
              <Text style={styles.itemText}>{dataSee?.cuota - 1}</Text>
            </View>
            <View style={styles.item}>
              <Text style={styles.itemTitle}>Cuotas pendientes: </Text>
              <Text style={styles.itemText}>{resultPrestamo?.length}</Text>
            </View>
          </View>
        </View>
        <View style={{ paddingVertical: 10 }}>
          <Text style={styles.itemTitle}>Deducción de la cuenta a saldar</Text>
        </View>
        {/* detalle de la cuenta a pagar */}
        <View style={{ paddingHorizontal: 10 }}>
          {data.map((objeto, index) => {
            return Object.entries(objeto).map(([llave, valor]) => {
              return (
                <View
                  style={[styles.item, { width: RFPercentage(28) }]}
                  key={index}
                >
                  <Text style={styles.itemTitleDetalle}>{llave} </Text>
                  <View style={styles.conteinerDato}>
                    <Text style={[styles.itemText]}>S/</Text>
                    <Text
                      style={[styles.itemText, { justifyContent: "flex-end" }]}
                    >
                      {valor}
                    </Text>
                  </View>
                </View>
              );
            });
          })}
          {/* monto a cancelar */}
          <View style={[styles.item, { width: RFPercentage(28) }]}>
            <Text style={[styles.itemTitleDetalle, { color: "orange" }]}>
              Monto a cancelar
            </Text>
            <View style={styles.conteinerDato}>
              <Text
                style={[
                  styles.itemText,
                  { color: "orange", fontWeight: "bold" },
                ]}
              >
                S/
              </Text>
              <Text
                style={[
                  styles.itemText,
                  {
                    justifyContent: "flex-end",
                    color: "orange",
                    fontWeight: "bold",
                  },
                ]}
              >
                {montoTotal}
              </Text>
            </View>
          </View>
        </View>

        {/* botón de cancelar la deuda */}
        <View style={{ alignItems: "center", paddingVertical: 10 }}>
          <TouchableOpacity
            style={styles.btnPagar}
            onPress={() => funcionPagar()}
          >
            <Text style={styles.subTitle}> Pagar la deuda</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 20,
  },
  graficoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  itemTitle: {
    color: "cornsilk",
    fontWeight: "bold",
  },
  itemTitleDetalle: {
    color: "cornsilk",
    width: RFPercentage(16),
    fontWeight: "bold",
  },
  itemText: {
    color: "white",
    fontSize: RFValue(12),
  },
  conteinerDato: {
    flexDirection: "row",
    width: RFPercentage(11),
    justifyContent: "space-between",
  },
  btnPagar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: RFPercentage(5),
    width: RFPercentage(30),
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: "orange",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
