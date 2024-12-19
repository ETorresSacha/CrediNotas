import { StyleSheet, Text, View, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { formatDate } from "../../utils/thunks/Thunks";
import UseStorageBusiness from "../hooks/UseHookDataNeg";
import {
  calculoMora,
  mora,
} from "../../utils/calculoCuota/CalculosFuncionesCrediticios";

const Notification = ({
  data,
  typeColor,
  dataNotification,
  dataConfiguration,
}) => {
  const { onGetBusiness } = UseStorageBusiness();
  const [message, setMessage] = useState("");
  const [dataNegocio, setDataNegocio] = useState({});
  const [cuot, setCuot] = useState("");

  // Iconos de notificacion
  const handleIconNotification = (value, messageValue) => {
    let aplication;
    const phoneNumber = data[0]?.celular;
    switch (value) {
      case "whatsapp":
        // aplication = `whatsapp://send?phone=${data[0]?.celular}&text=${messageValue}`;
        // break;
        // Verificar si el número de teléfono tiene un prefijo internacional
        const isInternational = phoneNumber.startsWith("+");

        // Si no tiene un prefijo internacional, agregar el código de país de WhatsApp
        const whatsappPhoneNumber = isInternational
          ? phoneNumber
          : `+51${phoneNumber}`;

        // Codificar el mensaje para enviarlo por WhatsApp
        const encodedMessage = encodeURIComponent(messageValue);

        // Construir el enlace para abrir WhatsApp con el mensaje predefinido
        aplication = `whatsapp://send?phone=${whatsappPhoneNumber}&text=${encodedMessage}`;
        break;

      case "phone-call":
        aplication = `tel:${data[0]?.celular}`;
        break;

      case "email-fast-outline":
        aplication = `mailto:${data[0]?.correo}?subject=Pago de la cuota N° ${dataNotification?.cuota}&body=${messageValue}`;
        break;
    }
    Linking.openURL(aplication);
  };

  // Cargar los datos del negocio
  const loadNegocio = async () => {
    try {
      const result = await onGetBusiness();
      setDataNegocio(result ? result : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNegocio();
  }, []);

  // Actualiza mensaje
  useEffect(() => {
    if (dataNotification != undefined) {
      const messagePredetermined = `Hola ${
        data[0]?.nombre?.split(" ")[0]
      }, tienes una deuda pendiente con la financiera "${
        dataNegocio[0]?.negocio ? dataNegocio[0]?.negocio : " La Financiera"
      }" de ${cuot} soles y ${
        typeColor == "red" ? "venció" : "vence"
      } el día ${formatDate(dataNotification?.fechaPago)}, ${
        typeColor == "red" ? "evita que suba tu mora" : "evita la mora"
      } y paga hoy. ¡Gracias!`;

      typeColor !== null ? setMessage(messagePredetermined) : setMessage(``);
    }
  }, [cuot, typeColor, , dataNegocio]);

  // Cuota
  useEffect(() => {
    // Con Mora
    if (typeColor == "red") {
      //! TENEMOS QUE CREAR UNA NUEVA FUNCION PARA EL CALCULO DE LA MORA PERO SOLO PARA EL PRESTAMO INDEPENDIENTE
      //! YA ESTA LA MORA, ESTE SERA SUMADO A AL CUOTA PARA CALCULAR LA NUEVA CUOTA.
      //! ES NECESARIO QUE CUANDO EXISTE MORA SE CAMBIE LA NUEVA CUOTA. ASI COMO LA FECHA CANBIA TAMHIEN EL MONTO DE LA DEUDA DEJE CAMHIAR
      let result = mora(dataNotification, dataConfiguration);

      setCuot(result);
    }
    //Sin mora
    else {
      setCuot(dataNotification?.montoCuota);
    }
  }, [typeColor, cuot]);

  return (
    <View style={styles.container}>
      <View style={styles.notificationTitle}>
        <Text style={styles.title}>NOTIFICACIÓN</Text>
      </View>
      <View style={styles.containerIcons}>
        <FontAwesome
          name="whatsapp"
          size={50}
          style={{ color: "rgb(66, 242, 46)" }}
          onPress={() => handleIconNotification("whatsapp", message)}
        />
        <Feather
          name="phone-call"
          size={50}
          style={{ color: "rgb(46, 164, 242)" }}
          onPress={() => handleIconNotification("phone-call", message)}
        />
        <MaterialCommunityIcons
          name="email-fast-outline"
          size={50}
          style={{ color: "rgb(224, 240, 242)" }}
          onPress={() => handleIconNotification("email-fast-outline", message)}
        />
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
  },

  notificationTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingHorizontal: 15,
  },
  title: {
    paddingVertical: 10,
    color: "cornsilk",
    fontSize: 17,
    fontWeight: "bold",
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingVertical: 30,
  },
});
