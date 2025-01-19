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
import { RFPercentage } from "react-native-responsive-fontsize";

const ModalLeyenda = ({ isVisible, setIsVisible, clientes, day }) => {
  const data = [
    clientes?.dataResult ? filterCustomer(clientes, day).red : 0,
    clientes?.dataResult ? filterCustomer(clientes, day).yellow : 0,
    clientes?.dataResult ? filterCustomer(clientes, day).green : 0,
    clientes?.dataResult ? filterCustomer(clientes, day).white : 0,
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
          <PieChart data={data} colors={colors} size={RFPercentage(23)} />

          {/* Leyenda */}
          <View style={styles.containerLeyendaIcono}>
            {["Vencidos", "Hoy", "Mañana", "Al día"].map((element, index) => (
              <View
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: RFPercentage(13.5),
                  justifyContent: "space-evenly",
                }}
              >
                <FontAwesome
                  name="bell"
                  style={{
                    color: `${colors[index]}`,
                    fontSize: RFPercentage(2.5),
                  }}
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
