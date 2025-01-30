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
  const dataRed = data?.dataResult ? filterCustomer(data, day).red : 0;
  const dataYellow = data?.dataResult ? filterCustomer(data, day).yellow : 0;
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
