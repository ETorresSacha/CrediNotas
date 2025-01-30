import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import registerForPushNotificationsAsync from "./getToken";
import { useNavigation } from "@react-navigation/native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MessageNotification = ({ data }) => {
  const [expoPushToken, setExpoPushToken] = useState("");
  console.log("dataRed: ", data);

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
            body: ` Para hoy  ${data?.length}, vencidos ${0}`,
            data: { screen: "Clientes" }, // Vista a la que dirigirse
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 15,
            minute: 27,
            repeats: true, // Se repetirá todos los días a las 8 AM
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
    // setTimeout(async () => {
    //   await scheduleTodoNotification();
    // }, 0);
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
