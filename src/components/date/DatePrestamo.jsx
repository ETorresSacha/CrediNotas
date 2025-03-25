import React, { useState } from "react";
import ModalDate from "../modalDate/ModalDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatDate } from "../../utils/thunks/Thunks";
import { RFPercentage } from "react-native-responsive-fontsize";

const DatePrestamo = ({
  prestamo,
  setPrestamo,
  setErrorsPrestamo,
  errorsPrestamo,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [typeDatePrestamo, setTypeDatePrestamo] = useState("");

  // setea los errores
  const handleTypeDatePrestamo = (element) => {
    setErrorsPrestamo((errorsPrestamo) => ({
      ...errorsPrestamo,
      [element]: "",
    }));
    setShowModal(true);
    setTypeDatePrestamo(element);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.formItem]}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de desembolso: </Text>
        </View>
        <View style={styles.inputContainerDate}>
          <Text
            style={
              !errorsPrestamo.fechaDesembolso
                ? [styles.textDate, { borderColor: "white" }]
                : [styles.textDate, { borderColor: "red" }]
            }
            defaultValue={prestamo?.fechaDesembolso}
          >
            {!prestamo.fechaDesembolso
              ? null
              : formatDate(prestamo?.fechaDesembolso)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleTypeDatePrestamo("fechaDesembolso")}
          style={styles.inputDateContainer}
        >
          <Ionicons name="calendar" size={32} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Fecha de la 1° cuota: </Text>
        </View>
        <View style={styles.inputContainerDate}>
          <Text
            style={
              !errorsPrestamo.fechaPrimeraCuota
                ? [styles.textDate, { borderColor: "white" }]
                : [styles.textDate, { borderColor: "red" }]
            }
            defaultValue={prestamo?.fechaPrimeraCuota}
          >
            {!prestamo?.fechaPrimeraCuota
              ? null
              : formatDate(prestamo?.fechaPrimeraCuota)}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleTypeDatePrestamo("fechaPrimeraCuota")}
          style={styles.inputDateContainer}
        >
          <Ionicons name="calendar" size={32} color="white" />
        </TouchableOpacity>
      </View>
      <ModalDate
        visible={showModal}
        setShowModal={setShowModal}
        setPrestamo={setPrestamo}
        prestamo={prestamo}
        typeDatePrestamo={typeDatePrestamo}
      />
    </View>
  );
};

export default DatePrestamo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    gap: 15,
    paddingTop: RFPercentage(1),
  },

  formItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },

  inputContainerDate: {
    width: RFPercentage(20),
  },
  input: {
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
  },
  textDate: {
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    height: 30,
    fontSize: 17,
  },

  alertError: {
    textAlign: "center",
    color: "cornsilk",
    borderColor: "red",
    borderBottomWidth: 1,
  },
  inputDateContainer: {
    backgroundColor: "rgb(68, 132, 222)",
    borderRadius: 10,
    width: 40,
    alignItems: "center",
  },
  legend: {
    fontWeight: "500",
    fontSize: 16,
    color: "white",
    paddingHorizontal: 5,
  },
  legendContainer: {
    width: RFPercentage(14),
  },
});
