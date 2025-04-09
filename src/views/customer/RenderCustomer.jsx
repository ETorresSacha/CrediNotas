import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import Users from "../../components/users/Users";
import ModalLeyenda from "../../modals/modalLeyenda/ModalLeyenda";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";
import { orderData } from "../../utils/thunks/Thunks";
import { renderImportData } from "./renderImportData";
import MessageNotification from "../notificacionExpo/MessageNotification";
const RenderCustomer = ({
  data,
  setData,
  enable,
  dataConfiguration,
  valueImport,
  setValueImport,
  dataCustomer,
  day,
  inicio,
}) => {
  const [order, setOrder] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Ordenar
  const handleSort = (type, value) => {
    // dataFilter toma los valores dependiendo de que componente es llamado la función,
    // "clientes" o "clientes cancelados"
    let dataFilter = !enable
      ? dataCustomer?.dataResult
      : dataCustomer?.customerCanceled;

    let result = orderData(type, dataFilter, value, enable);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

  useFocusEffect(
    React.useCallback(() => {
      //Función
      renderImportData(
        valueImport,
        setValueImport,
        data,
        setData
        //dataCustomer?.dataResult //! este dato es importante, asi que veamos donde hacemos que funcione la funcion( esta parte verifica el funcionamiento de la funcion import)
      );
    }, [valueImport])
  );

  return (
    <View style={styles.container}>
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
        {!enable ? ( //  clientes guardados
          <View>
            <Users
              data={dataCustomer?.dataResult}
              dataConfiguration={dataConfiguration}
              day={day}
            />
          </View>
        ) : (
          // Cuando no existe ningun cliente guardado
          <View>
            <Users
              data={dataCustomer?.customerCanceled}
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
                : dataCustomer?.customerCanceled?.length}
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

      {/* Notificaciones de los clientes por cobrar */}
      {!inicio ? <MessageNotification data={dataCustomer} day={day} /> : null}
    </View>
  );
};

export default RenderCustomer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "rgba(36, 146, 224, 0.625)",
    marginHorizontal: 7,
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
