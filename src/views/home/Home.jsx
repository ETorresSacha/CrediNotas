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
import { orderData } from "@/src/utils/thunks/Thunks";
import { verifMora } from "./ThunksMora";
import {
  compareAsc,
  format,
  add,
  formatDistance,
  getDate,
  isFuture,
  isEqual,
  differenceInDays,
} from "date-fns";

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
  console.log("dataConfiguration: ", dataConfiguration);

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

  //! PRIMERO, DESPUES DE QUE SE CARGUE LOS DATOS TENEMOS QUE VERIFICAR QUE NO TENGA MORA, CASO CONTRARIO, PODEMOS RENDERIZAR.
  //! EN CASO EXISTE LA MORA, TENEMOS CALCULAR LA MORA Y GUARDARLO EN EL STORAGE (SE TIENE QUE AÑADIR EN UN ITEM PARA EL RESULTADO DE LA MORA, EN DONDE DESDE UN PRINCIPIO SERA CERO).
  //!  VAMOS A PROBAR EN ESTA PARTE, SI NO FUNCIONA PUEDE SER EN EL COMPONENTE DE CUSTOMER

  //************************************************ */

  // Trae los datos del local storage
  const [data, setData] = useState();

  const { onGetCronograma, onSaveCronograma } = UseStorage();

  const loadCustomer = async () => {
    try {
      let resultCustomer = await onGetCronograma();
      console.log("resultCustomer: ", resultCustomer);
      if (resultCustomer != null) {
        console.log("true");
        //resultCustomer = orderData("fecha", resultCustomer, false, enable); // ordena de forma ascendente de acuerdo a la fecha
        let newResult = verifMora(resultCustomer, dataConfiguration); //todo--> este es para verificar la mora
        // console.log("newResult:", newResult?.length);

        // setData({
        //   ...data,
        //   newResult,
        // });

        // //Guardamos los datos en el storage
        //await onSaveCronograma(newResult);
        //! no esta guardando correctamente, verifica eso-solucionar primero esto
      }
      //
      //! LA IDEA DE ESTA FUNCION ES QUE SOLO SE EJECUTE UNA VEZ AL DIA, PARA ESO TENEMOS QUE HACER UNA FUNCION EL CUAL
      //! VERIFIQUE QUE SI YA ESTA EJECUTADO YA NO LO VUELVA A HACER. ESTO PARA OPTIMIZAR EL RENDIMIENTO DEL APLICATIVO.
      //TODO--> PERO PODEMOS PROBAR ANTES EJECUTANDO PARA VER SI LA MORA SE REFLEA EN DETALLES Y EN CUSTOMER
      // TODO --> PRIMERO HAREMOS QUE FUNCIONE, SALIO ERROR, SOLUCIONAMOS ESO PARA HACER LO DE ROJO
    } catch (error) {
      console.error(error);
    }
  };
  // Renderiza
  useFocusEffect(
    React.useCallback(() => {
      loadCustomer();
      //loadCongiguration();

      //return () => unsubscribe();
    }, [])
  );
  // Renderiza
  useFocusEffect(
    React.useCallback(() => {
      //loadCustomer();
      loadCongiguration();

      //return () => unsubscribe();
    }, [setData])
  );

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
