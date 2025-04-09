import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DataCustomer from "../../components/dataCustomer/DataCustomer";
import UseStorage from "../../components/hooks/UseHookStorage";
import Calculator from "../calculator/Calculator";
import { useNavigation } from "@react-navigation/native";
import "react-native-get-random-values"; // generea valores aleatorios para que el uuid no se repita
import { v4 as uuidv4 } from "uuid";
import { validationDataPerson } from "../../utils/validation/Validation";
import Header from "../../components/header/Header";
import { RFPercentage } from "react-native-responsive-fontsize";

const NewForm = (props) => {
  const uuid = uuidv4();
  const navigation = useNavigation();
  const { onSaveCronograma } = UseStorage();
  const [errorsP, setErrorsP] = useState({});
  const [errores, setErrores] = useState({});
  const [clean, setClean] = useState(false);
  const [valuePrest, setValuePrest] = useState(false);
  const [valueError, setValueError] = useState(false);

  // TODO --> Editar los datos
  // *** Propiedades que se usan para editar ***
  const editValue = props.route.params ? props.route.params?.editValue : null;
  const user = props.route.params ? props.route.params?.user : null;
  const id = props.route.params ? props.route.params?.id : null;
  const typeColor = props.route.params ? props.route.params?.typeColor : null;
  const enable = props.route.params ? props.route.params?.enable : null;
  const dataConfiguration = props.route.params?.dataConfiguration; // Datos de la configuración

  // ****
  const [dataPerson, setDataPerson] = useState({
    uuid: !user ? uuid : user?.uuid,
    nombre: !user ? "" : user?.nombre,
    apellido: !user ? "" : user?.apellido,
    dni: !user ? "" : user?.dni,
    correo: !user ? "" : user?.correo,
    direccion: !user ? "" : user?.direccion,
    celular: !user ? "" : user?.celular,
    canceled: !user ? false : user?.canceled,
    // Datos del préstamo
    capital: !user ? "" : user?.capital,
    cuotas: !user ? "" : user?.cuotas,
    interes: !user ? "" : user?.interes,
    fechaDesembolso: !user ? "" : user?.fechaDesembolso,
    fechaPrimeraCuota: !user ? "" : user?.fechaPrimeraCuota,
    periodo: !user ? "" : user?.periodo,
    resultPrestamo: !user ? [] : user?.resultPrestamo,
  });

  useEffect(() => {
    // Limpia es estado
    if (clean) {
      setDataPerson({
        uuid,
        nombre: "",
        apellido: "",
        dni: "",
        correo: "",
        direccion: "",
        celular: "",
        canceled: false,
        capital: "",
        cuotas: "",
        interes: "",
        fechaDesembolso: "",
        fechaPrimeraCuota: "",
        periodo: "",
        resultPrestamo: [],
      });
    }
  }, [clean]);

  // TODO ---> Guardar los datos
  const handleDataKeep = async () => {
    // Validación
    setValuePrest(true);
    setErrores(validationDataPerson(dataPerson));

    //Guardar datos
    let errorCustomer = validationDataPerson(dataPerson);
    let valuesErrorDataCustomer = Object.values(errorCustomer); // Errores del componente DataCuatomer
    let valuesErrorPrestamos = Object.values(errorsP); // Errores del componente Prestamo

    if (valuesErrorDataCustomer.some((error) => error !== "") || !valueError) {
      let typeError = valuesErrorDataCustomer.find((element) => element != ""); // Busca el tipo de error que existe en dataCustomer
      let typeError2 = valuesErrorPrestamos.find((element) => element != ""); // Busca el tipo de error que existe en Prestamo

      Alert.alert(typeError ? typeError : typeError2);
    } else {
      try {
        Alert.alert("GUARDAR", "¿Desea continuar?", [
          {
            text: "Si",
            onPress: async () => {
              setValuePrest(false);
              await onSaveCronograma(dataPerson, editValue);
              if (editValue) {
                navigation.navigate("Detalle", {
                  id: id,
                  typeColor: typeColor,
                  enable: enable ? enable : null,
                  dataConfiguration: dataConfiguration,
                });
              } else {
                setClean(true);
              }
            },
            style: "destructive",
          },
          {
            text: "No",
            style: "destructive",
          },
        ]);
      } catch (error) {
        console.log(error);
        Alert.alert("Ocurrió un error");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Header
        title={editValue ? " Editar cliente" : "Nuevo cliente"}
        back={editValue ? "Detalle" : "Clientes"}
        data={
          !editValue
            ? dataConfiguration
            : { typeColor, editValue, id, enable, dataConfiguration }
        }
      />
      <ScrollView>
        <DataCustomer
          setErrores={setErrores}
          errores={errores}
          setDataPerson={setDataPerson}
          dataPerson={dataPerson}
          setClean={setClean}
          editValue={editValue}
        />
        <Calculator
          errorsP={errorsP}
          setErrorsP={setErrorsP}
          clean={clean}
          setClean={setClean}
          dataPerson={dataPerson}
          setDataPerson={setDataPerson}
          valuePrest={valuePrest}
          setValueError={setValueError}
          setValuePrest={setValuePrest}
          editValue={editValue}
          user={user}
          dataConfiguration={dataConfiguration}
          valueProps={props.route.params}
        />
      </ScrollView>
      <View
        style={{
          alignItems: "center",
          flex: 2,
        }}
      >
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={handleDataKeep}
        >
          <Text style={styles.text}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default NewForm;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#181b21",
    display: "flex",
  },
  buttonContainer: {
    alignItems: "center",
    width: 250,
    height: 40,
    borderRadius: 10,
    elevation: 3,
    justifyContent: "center",
    backgroundColor: "#4ecb71",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
