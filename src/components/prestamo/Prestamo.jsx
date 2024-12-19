import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { View, StyleSheet, Text, TextInput } from "react-native";
import DatePrestamo from "../date/DatePrestamo";
import { useFocusEffect } from "@react-navigation/native";
import { RadioButton } from "react-native-paper";

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
          <Text style={styles.legend}>Periodo: </Text>
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
      </View>

      {/* ------------------ CAPITAL ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Capital: </Text>
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
      </View>

      {/* ------------------ TEA ó INTERES ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Interes</Text>
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
      </View>

      {/* ------------------ NÚMERO DE CUOTAS ------------------*/}
      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>N° Cuotas: </Text>
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
      </View>
      {/* ------------------ TIPO DE PAGO ------------------*/}

      <View style={styles.formItem}>
        <View style={styles.legendContainer}>
          <Text style={styles.legend}>Tipo de pago: </Text>
        </View>
        <View style={styles.inputContainer}>
          <RadioButton.Group
            onValueChange={(newValue) => {
              setTipoPago(newValue);
              setPrestamo({ ...prestamo, tipoPago: newValue });
            }}
            value={prestamo?.tipoPago}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {["Interes", "Fraccionado"].map((element, index) => {
                return (
                  <View
                    style={{ flexDirection: "row", alignItems: "center" }}
                    key={index}
                  >
                    <RadioButton value={element} uncheckedColor="white" />
                    <Text style={{ color: "white" }}>{element}</Text>
                  </View>
                );
              })}
            </View>
          </RadioButton.Group>
        </View>
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
  container: { flex: 1, paddingTop: 30, gap: 25 },

  formItem: {
    paddingHorizontal: 5,
    flexDirection: "row",
    alignItems: "center",
  },
  inputContainer: {
    flex: 1,
    paddingRight: 40,
    textAlign: "center",
    alignItems: "center",
  },

  input: {
    alignItems: "center",
    textAlign: "center",
    color: "cornsilk",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    width: 160,
    fontSize: 17,
  },

  legend: {
    fontWeight: "500",
    paddingLeft: 10,
    fontSize: 16,
    paddingRight: 40,
    color: "white",
  },
  legendContainer: {
    flex: 1,
  },
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
    height: 30,
    width: 170,
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
    //borderColor: "red",
  },
});
