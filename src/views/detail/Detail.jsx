import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import UseStorage from "../../components/hooks/UseHookStorage";
import { useNavigation } from "@react-navigation/native";
import Pay from "../../components/pay/Pay";
import Notification from "../../components/notification/Notification";
import Header from "../../components/header/Header";
import Loading from "../../components/loading/Loading";
import Entypo from "@expo/vector-icons/Entypo";
import { mora } from "../../utils/calculoCuota/CalculosFuncionesCrediticios";
import { diffDay } from "../../utils/thunks/Thunks";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Detail = (props) => {
  console.log(props?.route?.params);

  const { onGetCronograma, onDeleteCustomer } = UseStorage();
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const [valueProps, setValueProps] = useState({
    typeColor: "",
    id: "",
    enable: "",
    dataConfiguration: "",
  });
  const [intMora, setIntMora] = useState(0);
  const [indice, setIndice] = useState(0); // Para modificar el índice correcto cuando se realiza un pago
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo
  const [modify, setModify] = useState([]); // Para editar el status del pago
  const [dataSee, setDataSee] = useState([]); // Datos que se renderizará
  const [cancelledShare, setCancelledShare] = useState(false); // Cuota cancelada

  useEffect(() => {
    setIntMora(0);
    setModify(user);
    setUpdatePrestamo(user[0]?.resultPrestamo);

    let result = user[0]?.resultPrestamo.find(
      (element) => element.statusPay == false
    );
    // Para pagar la cuota
    if (result != undefined) {
      setDataSee(result);

      setIndice(dataSee?.cuota == undefined ? null : dataSee?.cuota - 1);
      setCancelledShare(false);
    }

    // Cuando la cuota ya esta cancelado
    if (result == undefined) {
      setIndice(user[0]?.resultPrestamo.length);
      setDataSee(user[0]?.resultPrestamo[user[0]?.resultPrestamo.length - 1]);
      setCancelledShare(true);
    }

    // Cálculo de la mora

    let diaRetraso = diffDay(dataSee?.fechaPago);
    if (diaRetraso < 0) {
      let resultMora = mora(result, valueProps?.dataConfiguration);
      setIntMora(resultMora);
      //! primero hacer que el color de rojo cuando existe la mora y no se habilid¿te dependiendo de su valor
      //! cuando se quiere guardar la mora como parte del array, sale error en el monto de la mora
      //! se hace una resta suceciva de la mora, por lo que tenemos que ver como cambiaar eso
      // let objeto = {
      //   ...dataSee,
      //   cuotaNeto: (
      //     parseFloat(dataSee?.cuotaNeto) + parseFloat(resultMora)
      //   ).toFixed(2),
      // };
      // console.log("objeto: ", objeto);
      // updatePrestamo?.splice(indice, 1, objeto);
      //   // console.log(result);
    }
  }, [user, indice, modify, cancelledShare]); //! tener en cuenta, se esta eliminando el dataSee, si algo no funciona puede ser por esto

  // Actualiza los valores de valueProps
  useFocusEffect(
    React.useCallback(() => {
      setValueProps({
        ...valueProps,
        id: props?.route?.params?.id,
        typeColor: props?.route?.params?.typeColor,
        enable: props?.route?.params?.enable,
        dataConfiguration: props?.route?.params?.dataConfiguration,
      });

      //return () => unsubscribe();
    }, [])
  );

  // Trae los datos guardados del local storage
  const loadCustomerId = async (id) => {
    try {
      const resultCustomer = await onGetCronograma();
      const result = resultCustomer.filter((element) => element.uuid == id);
      setUser(result);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      loadCustomerId(valueProps?.id);
      //return () => unsubscribe();
    }, [valueProps])
  );

  // Editar
  const edit = (value) => {
    navigation.navigate("Nuevo cliente", {
      editValue: true,
      user: value,
      id: valueProps?.id,
      typeColor: valueProps?.typeColor,
      enable: valueProps?.enable,
      dataConfiguration: valueProps?.dataConfiguration,
    });
  };

  // Eliminar
  const handleDelete = async (data) => {
    try {
      const result = await onDeleteCustomer(data);
      navigation.navigate(
        !valueProps?.enable ? "Clientes" : "Clientes cancelados"
      );
    } catch (error) {
      console.error();
    }
  };

  const alertDelete = (data) => {
    Alert.alert("Eliminar", "¿Desea continuar?", [
      {
        text: "Si",
        onPress: () => handleDelete(data),
        style: "destructive",
      },
      {
        text: "No",
        style: "destructive",
      },
    ]);
  };
  // //console.log("userEDIT: ", user);

  return (
    <View style={styles.container}>
      {user.length == 0 ? (
        <Loading />
      ) : (
        <ScrollView>
          <View>
            <Header
              title={"Detalle"}
              back="Clientes"
              data={
                !valueProps?.enable
                  ? valueProps?.dataConfiguration
                  : { enable: valueProps?.enable }
              }
            />
            <View style={styles.containerData}>
              <View style={styles.containerTitle}>
                <Text style={styles.title}>DATOS DEL CLIENTE</Text>
                <View style={styles.iconos}>
                  {valueProps?.enable ? null : (
                    <TouchableOpacity
                      style={styles.icon}
                      onPress={() => edit(user[0])}
                    >
                      <Entypo name="pencil" size={30} color="cornsilk" />
                    </TouchableOpacity>
                  )}
                  <TouchableOpacity
                    style={styles.icon}
                    onPress={() => alertDelete(valueProps?.id)}
                  >
                    <Entypo name="trash" size={30} color="cornsilk" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.Data}>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>Nombres: </Text>
                  <Text style={styles.itemText}>{user[0]?.nombre}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>Apellidos: </Text>
                  <Text style={styles.itemText}>{user[0]?.apellido}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>DNI: </Text>
                  <Text style={styles.itemText}>{user[0]?.dni}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>Celular: </Text>
                  <Text style={styles.itemText}>{user[0]?.celular}</Text>
                </View>
                <View style={styles.item}>
                  <Text style={styles.itemTitle}>Correo: </Text>
                  <Text style={styles.itemText}>{user[0]?.correo}</Text>
                </View>
              </View>
            </View>
            <Pay
              data={user}
              indice={indice}
              setIndice={setIndice}
              modify={modify}
              dataSee={dataSee}
              cancelledShare={cancelledShare}
              setCancelledShare={setCancelledShare}
              updatePrestamo={updatePrestamo}
              intMora={intMora}
              color={valueProps?.typeColor}
              valueProps={valueProps}
              setValueProps={setValueProps}
            />
            <Notification
              data={user}
              typeColor={valueProps?.typeColor}
              dataNotification={dataSee} //
              dataConfiguration={valueProps?.dataConfiguration}
            />
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                style={styles.verCronograma}
                onPress={() =>
                  navigation.navigate("Cronograma", {
                    user: user[0],
                    id: valueProps?.id,
                    typeColor: valueProps?.typeColor,
                    enable: valueProps?.enable,
                    dataConfiguration: valueProps?.dataConfiguration,
                  })
                }
              >
                <Text style={styles.subTitle}> Ver conograma</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    verticalAlign: "middle",
  },

  containerData: {
    borderBottomColor: "white",
  },
  containerTitle: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
    fontSize: RFValue(14),
    fontWeight: "bold",
  },
  Data: {
    padding: 15,
    gap: 5,
  },
  item: {
    display: "flex",
    flexDirection: "row",
  },
  itemTitle: {
    width: 90,
    color: "cornsilk",
    fontSize: RFValue(13.5),
    fontWeight: "bold",
  },
  itemText: {
    color: "white",
    fontSize: RFValue(14),
  },
  iconos: {
    gap: 5,
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  verCronograma: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    width: RFPercentage(40),
    justifyContent: "center",
    borderRadius: 10,
    elevation: 5,
    borderWidth: 1,
    backgroundColor: "orange",
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
