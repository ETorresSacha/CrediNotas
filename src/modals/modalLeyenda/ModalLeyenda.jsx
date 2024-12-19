import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import PieChart from "./PieChart";
import { filterCustomer } from "../../utils/thunks/Thunks";

const ModalLeyenda = ({ isVisible, setIsVisible, customer, day }) => {
  const data = [
    customer?.dataResult ? filterCustomer(customer, day).red : 0,
    customer?.dataResult ? filterCustomer(customer, day).yellow : 0,
    customer?.dataResult ? filterCustomer(customer, day).green : 0,
    customer?.dataResult ? filterCustomer(customer, day).white : 0,
  ];

  const colors = ["#FF0000", "#FFFF00", "rgb(66, 242, 46)", "#FFF8DC"]; // Colores para cada segmento

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
            INFORMACIÓN
          </Text>
        </View>

        <View style={styles.graficoContainer}>
          {/* Gráfico */}
          <PieChart data={data} colors={colors} size={170} />

          {/* Leyenda */}
          <View style={styles.containerLeyendaIcono}>
            {["Vencidos", "Hoy", "Mañana", "Al día"].map((element, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <FontAwesome
                  name="bell"
                  style={{ color: `${colors[index]}`, fontSize: 20 }}
                />

                <Text style={styles.leyenda}>{element}</Text>
                <View style={styles.containerTitleLeyenda}>
                  <Text style={styles.titleLeyenda}>{data[index]}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalLeyenda;

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
    left: "10%",
    right: "10%",
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
  },
  graficoContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    gap: 20,
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
    paddingTop: 5,
    paddingHorizontal: 5,
  },
  titleLeyenda: {
    display: "flex",
    flexDirection: "row",
    color: "orange",
    width: 15,
    height: 20,
    borderRadius: 5,
    justifyContent: "center",
    textAlign: "center",
    alignItems: "center",
    alignContent: "center",
  },
});
