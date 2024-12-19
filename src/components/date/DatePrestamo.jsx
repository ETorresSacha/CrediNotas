import React, { useState } from "react";
import ModalDate from "../modalDate/ModalDate";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { formatDate } from "../../utils/thunks/Thunks";

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
      <View style={[styles.formItem, { paddingBottom: 20 }]}>
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
          <Text style={styles.legend}>Fecha de la primera cuota: </Text>
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
  },

  formItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },

  inputContainerDate: {
    width: 160,
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
    paddingLeft: 10,
    fontSize: 16,
    paddingRight: 40,
    color: "white",
  },
  legendContainer: {
    width: 180,
  },
});
