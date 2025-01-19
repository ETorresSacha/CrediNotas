import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Users from "../../components/users/Users";
import ModalLeyenda from "../../modals/modalLeyenda/ModalLeyenda";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import Loading from "@/src/components/loading/Loading";
import { RFPercentage } from "react-native-responsive-fontsize";
import { format } from "date-fns";
import { customerData, orderData } from "../../utils/thunks/Thunks";
const DataCustomer = ({
  data,
  setData,
  //dataCustomer,
  enable,
  dataConfiguration,
  //day,
  //inicio,
}) => {
  const [order, setOrder] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [dataCustomer, setDataCustomer] = useState();
  const [inicio, setInicio] = useState();
  const [day, setDay] = useState("");

  // clasificación de los clientes de acuerdo a la fecha de pago
  const resultCustomer = () => {
    setInicio(false);

    setDay(format(new Date(), "yyyy-MM-dd"));
    let result = customerData(data.dataResult, day);

    // Habilitamos el texto si no existe datos guardados
    if (
      !enable
        ? result?.resultDataResult.length == 0
        : result?.resultCustomerCancelled.length == 0
    ) {
      setInicio(true);
    }

    //Seteamos los datos del dataCustomer
    setDataCustomer({
      ...dataCustomer,
      customerCancelled: result?.resultCustomerCancelled,
      dataResult: result.resultDataResult,
    });
  };

  // Renderiza
  useEffect(() => {
    //setTimeout(resultCustomer, 300);
    resultCustomer();
  }, [data, setDataCustomer, inicio]); //! esta para evluar si se agrega en esta parte setCustomer e inicio

  // Ordenar
  const handleSort = (type, value) => {
    // dataFilter toma los valores dependiendo de que componente es llamado la función, "clientes" o "clientes cancelados"
    let dataFilter = !enable
      ? dataCustomer?.dataResult
      : dataCustomer?.customerCancelled;

    let result = orderData(type, dataFilter, value, enable);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };
  // console.log(
  //   "dataCustomer?.dataResult?.length: ",
  //   dataCustomer?.dataResult?.length
  // );
  console.log("dataCustomer: ", dataCustomer);

  return (
    <View style={styles.container}>
      {dataCustomer == undefined ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <View
            style={
              !enable
                ? [styles.containerTitle]
                : [styles.containerTitle, { justifyContent: "space-around" }]
            }
          >
            <TouchableOpacity
              style={
                !enable
                  ? [styles.title, { width: 50 }]
                  : [styles.title, { width: 80 }]
              }
              onPress={() => handleSort("dni", order, enable)}
            >
              <Text style={styles.texTitle}>DNI</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.title, { paddingLeft: 10, width: 90 }]}
              onPress={() => handleSort("nombre", order)}
            >
              <Text style={styles.texTitle}>NOMBRE</Text>
            </TouchableOpacity>
            {!enable ? (
              <TouchableOpacity
                style={[styles.title, { width: 80 }]}
                onPress={() => handleSort("fecha", order)}
              >
                <Text style={styles.texTitle}>FECHA DE PAGO</Text>
              </TouchableOpacity>
            ) : null}

            <TouchableOpacity
              style={[styles.title]}
              onPress={() => handleSort("cuota", order)}
            >
              <Text style={[styles.texTitle, { width: enable ? 100 : null }]}>
                {!enable ? "CUOTA" : "MONTO DEL PRÉSTAMO"}
              </Text>
            </TouchableOpacity>

            {!enable ? (
              <View style={[styles.title, {}]}>
                <Text style={styles.texTitle}>ALERTA</Text>
              </View>
            ) : null}
          </View>
          {/* Renderiza los datos  */}

          <ScrollView style={styles.containerCuotas}>
            {inicio == true ? (
              <View
                style={{
                  alignItems: "center",
                  top: RFPercentage(30),
                }}
              >
                <Text style={{ color: "cornsilk" }}>
                  No hay clientes {enable ? "cancelados" : "guardados"}
                </Text>
              </View>
            ) : !enable ? (
              //  clientes guardados
              <View>
                <Users
                  data={dataCustomer?.dataResult}
                  dataConfiguration={dataConfiguration}
                  day={day}
                  inicio={inicio}
                />
              </View>
            ) : (
              // Cuando no existe ningun cliente guardado
              <View>
                <Users
                  data={dataCustomer?.customerCancelled}
                  dataConfiguration={dataConfiguration}
                  enable={enable}
                />
              </View>
            )}
          </ScrollView>

          <View style={[styles.piePagina]}>
            <View style={styles.iconoAllUser}>
              <Entypo
                name={!enable ? "user" : "remove-user"}
                style={{ color: "rgb(250, 191, 15)", fontSize: 30 }}
              ></Entypo>
              <View style={{ display: "flex", alignItems: "center" }}>
                <Text style={styles.piePaginaText}>
                  {!enable
                    ? dataCustomer?.dataResult?.length
                    : dataCustomer?.customerCancelled?.length}
                </Text>
                <Text style={styles.textPiePagina}>Clientes</Text>
              </View>
            </View>

            {/* Ícono de la leyenda */}
            {!enable ? (
              <TouchableOpacity
                style={[styles.title]}
                onPress={() => setIsVisible(true)}
              >
                <Fontisto
                  name="pie-chart-2"
                  style={{ color: "rgb(207, 250, 15)", fontSize: 21 }}
                />
                <Text style={styles.textPiePagina}>Leyenda</Text>
              </TouchableOpacity>
            ) : null}
          </View>
          {/* Modal de la leyenda */}
          <ModalLeyenda
            isVisible={isVisible}
            setIsVisible={setIsVisible}
            clientes={dataCustomer}
            day={day}
          />
        </View>
      )}
    </View>
  );
};

export default DataCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(36, 146, 224, 0.625)",
    marginHorizontal: 8,
    marginTop: 15,
    marginBottom: 5,
  },
  containerTitle: {
    borderTopStartRadius: 13,
    borderTopEndRadius: 13,
    paddingHorizontal: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    height: 50,
  },
  title: {
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  texTitle: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 13,
    color: "white",
  },
  containerCuotas: {
    borderColor: "rgb(198, 198, 198)",
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  containerNoCustomers: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 200,
  },
  piePagina: {
    display: "flex",
    borderBottomStartRadius: 13,
    borderBottomEndRadius: 13,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    height: 37,
  },
  iconoAllUser: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    gap: 5,
  },
  piePaginaText: {
    fontSize: 17,
    color: "white",
  },
  textPiePagina: {
    fontSize: 9,
    color: "white",
    fontWeight: "bold",
  },
});
