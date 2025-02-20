import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import registerForPushNotificationsAsync from "./getToken";
import { useNavigation } from "@react-navigation/native";
import { filterCustomer } from "@/src/utils/thunks/Thunks";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MessageNotification = ({ data, day }) => {
  let dataRed = data?.dataResult ? filterCustomer(data, day).red : 0;
  let dataYellow = data?.dataResult ? filterCustomer(data, day).yellow : 0;
  let dataGreen = data?.dataResult ? filterCustomer(data, day).green : 0;

  // fecha actual
  let date = new Date();

  // la hora en tu zona horaria actual
  let hour = date.getHours();

  // actualizamos los datos de dataRed y dataYellow para la notificación diaria, cumpliendo esta restricción
  if (hour > 9) {
    dataRed = dataRed + dataYellow;
    dataYellow = dataGreen;
  }

  //! tenemos que hacer una logica para que los clientes que son amarillos sean correctos y mandado a la notificacion de manera correcta
  const [expoPushToken, setExpoPushToken] = useState("");

  // Redirigido al componente cuando la notificacion es llamado
  const navigation = useNavigation();
  Notifications.addNotificationResponseReceivedListener((response) => {
    const screenName = response.notification.request.content.data.screen;

    if (screenName) {
      // Navega a la pantalla especificada
      navigation.navigate(screenName);
    }
  });

  //! Mensaje de la notificación y repetir las notificaciones diariamente
  const scheduleTodoNotification = async () => {
    try {
      // Limpiar todas las notificaciones programadas existentes
      await Notifications.cancelAllScheduledNotificationsAsync();

      // Solicitar permiso para enviar notificaciones
      const { status } = await Notifications.requestPermissionsAsync();

      if (status === "granted") {
        // Configuramos la notificación para que se repita diariamente a las 9:00 AM

        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Clientes por cobrar",
            body: ` Para hoy  ${dataYellow}, vencidos ${dataRed}`,
            data: { screen: "Clientes" }, // Vista a la que dirigirse
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 9,
            minute: 0,
            repeats: true, // Se repetirá todos los días a las 9 AM
          },

          ios: {
            sound: true,
          },
          android: {
            sound: true,
            priority: "high",
            sticky: false,
            vibrate: true,
          },
        });
      } else {
        console.log("Permiso de notificación denegado.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // LLamado a la función
  useEffect(() => {
    scheduleTodoNotification();
  }, []);

  //! Obtención del token
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);
};

export default MessageNotification;
