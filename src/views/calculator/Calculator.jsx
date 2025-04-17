import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
} from "react-native";
import Prestamo from "../../components/prestamo/Prestamo";
import DetailCalculator from "../../components/detailCalculator/DetailCalculator";
import { useFocusEffect } from "@react-navigation/native";
import { validationDataPrestamo } from "../../utils/validation/Validation";
import { cuotaIndependiente } from "../../utils/calculoCuota/CalculosCuota";
import Cuota from "../../components/cuota/Cuota";
import Header from "../../components/header/Header";
import equal from "deep-equal";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import fondoCalculadora from "../../../assets/fondoCalculadora.jpg";

const Calculator = ({
  errorsP,
  setErrorsP,
  clean,
  setClean,
  dataPerson,
  setDataPerson,
  valuePrest,
  setValueError,
  setValuePrest,
  editValue,
  user,
  dataConfiguration,
  valueProps,
}) => {
  const [resultCuota, setResultCuota] = useState(""); // Útil para la vista de la calculadora
  const [enabled, setEnabled] = useState(false); // Habilita el resultado del componente NEWFORM
  const [errorsPrestamo, setErrorsPrestamo] = useState([]);
  const [copyDataPrestamo, setCopyDataPrestamo] = useState([]); // Copia los datos iniciales del prestamo
  const [changeValue, setChangeValue] = useState(false); // Cuando cambian los valores del prestamo
  const [cleanCalculator, setCleanCalculator] = useState(false); // Limpia solo del componente Calculator
  const [resultView, setResultView] = useState(true);
  const [valueTPM, setValueTPM] = useState("");
  const [cuota, setCuota] = useState();

  const [prestamo, setPrestamo] = useState({
    periodo: !dataPerson ? "" : dataPerson.periodo,
    capital: !dataPerson ? "" : dataPerson.capital,
    interes: !dataPerson ? "" : dataPerson.interes,
    cuotas: !dataPerson ? "" : dataPerson.cuotas,
    fechaDesembolso: !dataPerson ? "" : dataPerson.fechaDesembolso,
    fechaPrimeraCuota: !dataPerson ? "" : dataPerson.fechaPrimeraCuota,
  });

  // Todo--> COMPONENTE NEWFORM
  useFocusEffect(
    React.useCallback(() => {
      setCopyDataPrestamo(prestamo);
      setValueTPM(dataPerson?.tasaPrimaMensual);
      setCuota(dataPerson?.resultPrestamo[0]?.cuotaNeto);

      if (valuePrest) {
        setErrorsPrestamo(validationDataPrestamo(prestamo));
      }
    }, [valuePrest, setValueError, copyDataPrestamo])
  );

  // Valida los datos de forma continua, útil en el componente NEWFORM
  useEffect(() => {
    if (errorsP !== undefined) {
      setErrorsP(validationDataPrestamo(prestamo));

      let resultError = validationDataPrestamo(prestamo);
      let resultVal = Object.values(resultError);

      if (resultVal.some((error) => error !== "")) {
        setEnabled(false);
        setValueError(false);
        setValuePrest(false);
      } else {
        if (editValue) {
          let prestamoCopy = { ...prestamo };
          let copyDataPrestamoCopy = {
            ...copyDataPrestamo,
          };

          if (equal(prestamoCopy, copyDataPrestamoCopy)) {
            setChangeValue(true);
          } else {
            setChangeValue(false);
          }
        }
        setResultView(false);

        setEnabled(true);
        setValueError(true);
      }
      if (!resultView) {
        handleCalcular(prestamo);
      }
    }
  }, [prestamo, changeValue, copyDataPrestamo, valueTPM, resultView]);

  //Limpia el estado
  useEffect(() => {
    if (clean !== undefined || cleanCalculator != undefined) {
      if (clean || cleanCalculator) {
        setPrestamo({
          capital: "",
          cuotas: "",
          interes: "",
          fechaDesembolso: "",
          fechaPrimeraCuota: "",
          periodo: "",
        });
        setResultView(true);
        setClean ? setClean(false) : setCleanCalculator(false);
        setEnabled(false);
      }
    }
  }, [clean, cleanCalculator]);

  // Todo--> COMPONENTE CALCULATOR
  useEffect(() => {
    if (dataPerson == undefined) {
      let resultError = validationDataPrestamo(prestamo);
      let valuesText = Object.values(resultError);
      if (enabled == true && valuesText.some((error) => error !== "")) {
        setEnabled(false);
      }
      // Para cuando se modifica algún dato del préstamo, el resultado de la cuota ya no será visible
      if (!editValue && !dataPerson) {
        if (!equal(prestamo, copyDataPrestamo)) {
          setEnabled(false);
        }
      }
    }
  }, [prestamo]);

  // Todo--> PARA AMBOS COMPONENTES
  const handleCalcular = async (data) => {
    // Crea una copia de los datos del préstamo sólo cuando esta en uso el componente CALCULATOR
    if (!editValue && !dataPerson) {
      setCopyDataPrestamo(prestamo);
    }

    // Valida
    setErrorsPrestamo(validationDataPrestamo(data));
    let resultError = validationDataPrestamo(data);
    let valuesText = Object.values(resultError);

    if (valuesText.some((error) => error !== "")) {
      let typeError = valuesText.find((element) => element != ""); // Busca el tipo de error que existe

      setEnabled(false);

      Alert.alert(typeError);
    }
    // Calcula la cuota
    else {
      //todo-- Aplicable cuando se trabaja con una financiera
      // const result = changeValue
      //   ? user[0].resultPrestamo
      //   : resultCronograma({
      //       ...data,
      // tasaPrimaMensual: !route
      //   ? dataConfiguration?.tpm
      //   : route.params.data?.tpm,
      //     });
      //todo.................................................
      const result = changeValue
        ? user[0].resultPrestamo
        : cuotaIndependiente(data);

      if (dataPerson != undefined) {
        setDataPerson({
          ...dataPerson,
          capital: prestamo?.capital,
          cuotas: prestamo?.cuotas,
          interes: prestamo?.interes,
          fechaDesembolso: prestamo?.fechaDesembolso,
          fechaPrimeraCuota: prestamo?.fechaPrimeraCuota,
          periodo: prestamo?.periodo,
          resultPrestamo: result,
        });
      } else {
        setResultCuota(result);
      }

      setEnabled(true);
    }
  };

  return (
    <ImageBackground
      source={errorsP == undefined ? fondoCalculadora : null}
      style={styles.container}
    >
      {errorsP == undefined ? <Header title={"Evaluar"} back={"Home"} /> : null}
      <View style={styles.titleEvaluar}>
        <Text style={styles.title}>PRÉSTAMO</Text>

        {!dataPerson ? (
          <TouchableOpacity onPress={() => setCleanCalculator(true)}>
            <FontAwesome5
              style={styles.icon}
              color="#FFF"
              name="eraser"
              size={30}
            />
          </TouchableOpacity>
        ) : null}
      </View>

      <ScrollView>
        <Prestamo
          errorsPrestamo={errorsPrestamo}
          setErrorsPrestamo={setErrorsPrestamo}
          prestamo={prestamo}
          setPrestamo={setPrestamo}
          valuePrest={valuePrest}
          cleanCalculator={cleanCalculator}
          clean={clean}
        />
        <View>
          {/* ------------------ CALCULAR ------------------*/}
          {dataPerson !== undefined ? null : (
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.btnCalcular}
                onPress={() => handleCalcular(prestamo)}
              >
                <Text style={styles.text}>Calcular</Text>
              </TouchableOpacity>
            </View>
          )}
          {/* ------------------ RESULTADO ------------------*/}
          {dataPerson !== undefined ? (
            dataPerson ? (
              enabled ? (
                <Cuota
                  cuota={cuota}
                  changeValue={changeValue}
                  dataPerson={dataPerson}
                  editValue={valueProps?.editValue}
                  user={dataPerson}
                  id={valueProps?.id}
                  typeColor={valueProps?.typeColor}
                  enable={valueProps?.enable}
                  dataConfiguration={dataConfiguration}
                />
              ) : null
            ) : null
          ) : enabled ? (
            <DetailCalculator
              resultCuota={resultCuota}
              periodo={prestamo.periodo}
              prestamo={prestamo}
            />
          ) : null}
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

export default Calculator;
const styles = StyleSheet.create({
  container: {
    flex: 3,
    resizeMode: "cover", // o 'contain' según tu preferencia
  },
  titleEvaluar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 12,
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    paddingTop: 30,
  },
  btnCalcular: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#4ecb71",
    width: 300,
    height: 40,
    borderRadius: 15,
  },
  text: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
    textAlign: "center",
  },

  title: {
    fontSize: 17,
    color: "white",
    paddingVertical: 5,
    fontWeight: "bold",
  },
  icon: {
    marginRight: 5,
  },
});
