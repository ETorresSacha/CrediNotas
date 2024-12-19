import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Users from "../../components/users/Users";
import { orderData } from "../../utils/thunks/Thunks";
import ModalLeyenda from "../../modals/modalLeyenda/ModalLeyenda";
import Entypo from "react-native-vector-icons/Entypo";
import Fontisto from "react-native-vector-icons/Fontisto";

const DataCustomer = ({
  data,
  setData,
  customer,
  enable,
  dataConfiguration,
  day,
}) => {
  const [order, setOrder] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Ordenar
  const handleSort = (type, value) => {
    // dataFilter toma los valores dependiendo de que componente es llamado la función, "clientes" o "clientes cancelados"
    let dataFilter = !enable
      ? customer?.dataResult
      : customer?.customerCancelled;

    let result = orderData(type, dataFilter, value, enable);
    setData({ ...data, dataResult: result });
    setOrder(!value);
  };

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
        {
          // Cuando no existe ningun cliente guardado
          data.dataResult == undefined ||
          (enable
            ? customer?.customerCancelled?.length == 0
            : customer?.dataResult?.length == 0) ? (
            <View style={styles.containerNoCustomers}>
              <Text style={{ color: "cornsilk" }}>
                {enable
                  ? "No hay clientes cancelados"
                  : "No hay clientes guardados"}
              </Text>
            </View>
          ) : !enable ? (
            //  clienteS guardados
            <View>
              <Users
                data={customer?.dataResult}
                dataConfiguration={dataConfiguration}
                day={day}
              />
            </View>
          ) : (
            <Users
              data={customer?.customerCancelled}
              dataConfiguration={dataConfiguration}
              enable={enable}
            />
          )
        }
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
                ? customer.dataResult.length
                : customer.customerCancelled.length}
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
        customer={customer}
        day={day}
      />
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
    marginHorizontal: 5,
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
