import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import ItemsHome from "../../components/itemsHome/ItemsHome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import ModalConfigPersonal from "../../modals/modalConfigPersonal/ModalConfigPersonal";

import UseStorageConfiguration from "../../components/hooks/UseHookConfiguration";
import UseStorageBusiness from "../../components/hooks/UseHookDataNeg";
import fondoHome from "../.././../assets/fondoHome.jpg";
import logo from "../../../assets/icon.png";
import UseStorage from "../../components/hooks/UseHookStorage";
import { verifMora } from "./ThunksMora";

const Home = () => {
  const { onGetBusiness } = UseStorageBusiness();
  const { onGetConfiguration } = UseStorageConfiguration();
  const [isVisible, setIsVisible] = useState(false);
  const [enable, setEnable] = useState(false); // Para visualizar los cambios en el home
  const [dataBusiness, setDataBusiness] = useState([]); // Para los datos de la informacion del negocio
  const [dataConfiguration, setDataConfiguration] = useState({}); //Datos de la configuración
  const [copy, setCopy] = useState({}); // Sirve para verificar si se nota el cambio del interes moratorio

  // Cargar los datos de la financiera
  const loadNegocio = async () => {
    try {
      const result = await onGetBusiness();
      setDataBusiness(result == undefined ? dataBusiness : result);
      setEnable(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Cargar los datos de la configuración
  const loadCongiguration = async () => {
    try {
      let result = await onGetConfiguration();

      //copia
      setCopy({
        ...dataConfiguration,
        intMoratorio: !result ? "0" : result[0]?.intMoratorio,
      });

      setDataConfiguration({
        ...dataConfiguration,
        intMoratorio: !result ? "0" : result[0]?.intMoratorio,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Cerrar el modal
  const handleModalClose = async (shouldUpdate) => {
    if (shouldUpdate) {
      Alert.alert("Se guardó correctamente");
    }
    setIsVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      loadNegocio();
      loadCongiguration();
    }, [enable, setDataConfiguration])
  );

  //************************************************ */

  // Trae los datos del local storage
  const [data, setData] = useState();

  const { onGetCronograma, onSaveCronograma } = UseStorage();

  const loadCustomer = async () => {
    try {
      let resultCustomer = await onGetCronograma();
      if (resultCustomer != null) {
        let newResult = verifMora(resultCustomer, dataConfiguration); //todo--> este es para verificar la mora
        await onSaveCronograma(newResult, "saveMora");
      }
      //todo--> ya esta funcionando, el detalle es que cuando se sgrega un nuevo cliente que esta en mora, en la visualizacion de customer sale en rojo
      //todo--> pero no se actualiza el dato, tenemos que verificar si esta funcion va aqui o en customer, DETERMIAR EN QUE COMPONENTE IRÁ
    } catch (error) {
      console.error(error);
    }
  };
  // Cargamos los datos y actualizamos las moras
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //return () => unsubscribe();
    }, [dataConfiguration])
  );

  // Trae el valor del interes moratorio
  useFocusEffect(
    React.useCallback(() => {
      loadCongiguration();

      //return () => unsubscribe();
    }, [setData])
  );
  //todo--> estamos quedando en la prueba de la funcion que se realiza en forma automatica,
  // todo -->cuando funciona probar con los datos de mora y que mande la notificacion correcta
  return (
    <ImageBackground source={fondoHome} style={styles.background}>
      {/* HEADER */}
      <View style={styles.conteinerHeader}>
        <View style={styles.rightConteiner}>
          <Image source={logo} style={styles.profileImage}></Image>
        </View>
        <Pressable
          style={styles.leftConteiner}
          onPress={() => setIsVisible(true)}
        >
          <SimpleLineIcons
            name="options-vertical"
            style={{ color: "cornsilk", fontSize: 25 }}
          />
        </Pressable>
      </View>

      {/* MODAL OPCIONES */}
      <ModalConfigPersonal
        visible={isVisible}
        onClose={handleModalClose}
        setDataHome={setDataBusiness}
        setEnable={setEnable}
        dataConfiguration={dataConfiguration}
        setDataConfiguration={setDataConfiguration}
        copy={copy}
      />

      {/* BIENVENIDO */}
      <View style={{ paddingTop: 20 }}>
        <View style={styles.institutionTitle}>
          <Text style={styles.title}>BIENVENIDO</Text>
        </View>
        <View style={styles.containerSwitch}>
          <View style={{ display: "flex", flexDirection: "row" }}>
            <Text style={styles.subTitle}>
              {!dataBusiness[0]?.negocio
                ? "Tu Financiera"
                : dataBusiness[0]?.negocio}
            </Text>
          </View>
        </View>
      </View>

      {/* ITEMS DE LAS OPCIONES */}
      <ItemsHome dataConfiguration={dataConfiguration} />
    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // o 'contain' según tu preferencia
    padding: 12,
  },
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: "rgb(31, 36, 36)",
  },
  conteinerHeader: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
    fontSize: 17,
    fontWeight: "bold",
  },

  institutionTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  containerSwitch: {
    display: "flex",
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  subTitle: {
    fontSize: 35,
    color: "white",
    fontWeight: "bold",
  },
  leftConteiner: {
    justifyContent: "center",
    marginLeft: 10,
  },
  rightConteiner: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
});
