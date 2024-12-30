import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, StyleSheet, Text, TextInput } from "react-native";
import DatePrestamo from "../date/DatePrestamo";
import { useFocusEffect } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";
import { RFPercentage } from "react-native-responsive-fontsize";

const infoPeriod = [
  { label: "Diario", value: "1" },
  { label: "Semanal", value: "2" },
  { label: "Quincenal", value: "3" },
  { label: "Mensual", value: "4" },
];

const Prestamo = ({
  errorsPrestamo,
  setErrorsPrestamo,
  prestamo,
  setPrestamo,
  valuePrest,
  cleanCalculator,
  clean,
  setTipoPago,
}) => {
  const [value, setValue] = useState("");
  const [placeholderNumCuotas, setPlaceholderNumCuotas] = useState("");

  const renderItem = (item) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
        {item.value === value && (
          <AntDesign
            style={styles.icon}
            color="rgb(68, 132, 222)"
            name="check"
            size={20}
          />
        )}
      </View>
    );
  };
  // Setea el estado y los errores
  const handleChangeData = (event, type) => {
    setPrestamo({ ...prestamo, [type]: event.nativeEvent.text });
    setErrorsPrestamo((errorsPrestamo) => ({
      ...errorsPrestamo,
      [type]: "",
    }));
  };

  useFocusEffect(
    React.useCallback(() => {
      setValue(""); // Para setear el periodo a un estado de inicio
    }, [valuePrest, cleanCalculator, clean])
  );

  return (
    <View style={styles.container}>
      {/* ------------------ PERIODO ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Periodo:</Text>
        </View>
        <View style={styles.inputContainer}>
          <Dropdown
            style={
              !errorsPrestamo.periodo
                ? [styles.dropdown, { backgroundColor: "white" }]
                : [styles.dropdown, { backgroundColor: "red" }]
            }
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={infoPeriod}
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={!prestamo.periodo ? "Seleccione" : prestamo.periodo}
            value={value}
            onChange={(item) => {
              setValue(item.value);
              setPrestamo({ ...prestamo, periodo: item.label });
              setPlaceholderNumCuotas(item.label);
              setErrorsPrestamo((errorsPrestamo) => ({
                ...errorsPrestamo,
                periodo: "",
              }));
            }}
            renderItem={renderItem}
          />
        </View>
        <View style={{ width: RFPercentage(6), backgroundColor: "red" }}></View>
      </View>

      {/* ------------------ CAPITAL ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Capital:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Soles"
            placeholderTextColor="gray"
            style={
              !errorsPrestamo.capital
                ? [styles.input, { borderBottomColor: "white" }]
                : [styles.input, { borderBottomColor: "red" }]
            }
            value={prestamo.capital}
            defaultValue={prestamo.capital}
            onChange={(event) => {
              handleChangeData(event, "capital");
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: RFPercentage(6), backgroundColor: "red" }}></View>
      </View>

      {/* ------------------ TEA ó INTERES ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Interes:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="%"
            placeholderTextColor="gray"
            style={
              !errorsPrestamo.interes
                ? [styles.input, { borderBottomColor: "white" }]
                : [styles.input, { borderBottomColor: "red" }]
            }
            value={prestamo?.interes}
            defaultValue={prestamo?.interes}
            onChange={(event) => {
              handleChangeData(event, "interes");
            }}
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: RFPercentage(6), backgroundColor: "red" }}></View>
      </View>

      {/* ------------------ NÚMERO DE CUOTAS ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>N° Cuotas:</Text>
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder={!value ? "" : placeholderNumCuotas}
            placeholderTextColor="gray"
            style={
              !errorsPrestamo.cuotas
                ? [styles.input, { borderBottomColor: "white" }]
                : [styles.input, { borderBottomColor: "red" }]
            }
            value={prestamo.cuotas}
            defaultValue={prestamo.cuotas}
            onChange={(event) => {
              handleChangeData(event, "cuotas");
            }}
            //onChangeText={(text) => setPrestamo({ ...prestamo, nCuotas: text })}
            keyboardType="numeric"
          />
        </View>
        <View style={{ width: RFPercentage(6), backgroundColor: "red" }}></View>
      </View>

      {/* ------------------ FECHA DE DESEMBOLSO ------------------*/}
      <DatePrestamo
        prestamo={prestamo}
        setPrestamo={setPrestamo}
        setErrorsPrestamo={setErrorsPrestamo}
        errorsPrestamo={errorsPrestamo}
      />
    </View>
  );
};

export default Prestamo;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 15, gap: 10 },

  formItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  inputContainer: {
    textAlign: "center",
    alignItems: "center",
  },

  input: {
    alignItems: "center",
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    fontSize: 15.5,
    width: RFPercentage(20),
  },

  legend: {
    paddingHorizontal: 5,
    width: RFPercentage(14),
    fontWeight: "500",
    fontSize: 16,
    color: "white",
  },
  legendContainer: {},
  icon: {
    marginRight: 5,
  },

  item: {
    padding: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  dropdown: {
    height: 27,
    width: RFPercentage(20),
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
