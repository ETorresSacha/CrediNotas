import { View, Text, StyleSheet } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import AsyncStorage from "@react-native-async-storage/async-storage";

// importaciones para las notificaciones
import React, { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import registerForPushNotificationsAsync from "../notificacionExpo/getToken";
import { useNavigation } from "@react-navigation/native";
//import { filterCustomer } from "@/src/utils/thunks/Thunks";

// Nombre de la tarea en segundo plano
const BACKGROUND_TASK = "daily-update-task";

// Definir la tarea en segundo plano
TaskManager.defineTask(BACKGROUND_TASK, async () => {
  try {
    // Aquí puedes ejecutar la lógica que necesitas
    const suma = () => {
      return 8 + 5;
    };

    // Actualizar AsyncStorage con la fecha y hora actual
    const fecha = new Date(2025, 1, 5, 0, 0, 0, 0); // 2025, mes 1 (febrero), día 5, 00:00:00.000

    await AsyncStorage.setItem(
      MessageNotification().toString(),
      fecha.toLocaleString()
    );

    // Indicar que la tarea se completó correctamente
    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error("Error en la tarea en segundo plano:", error);
    return BackgroundFetch.Result.Failed;
  }
});

// Registrar la tarea en segundo plano
const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK, {
      minimumInterval: 24 * 60 * 60, // Intervalo de 24 horas (en segundos)
      stopOnTerminate: false, // Continuar ejecutando la tarea incluso si la app se cierra
      startOnBoot: true, // Iniciar la tarea cuando el dispositivo se reinicie
    });
    console.log("Tarea en segundo plano registrada con éxito.");
  } catch (error) {
    console.error("Error al registrar la tarea en segundo plano:", error);
  }
};

// Verificar el estado de la tarea
const checkStatus = async () => {
  const status = await BackgroundFetch.getStatusAsync();
  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK);
  console.log("Estado de la tarea:", status);
  console.log("¿Tarea registrada?:", isRegistered);
};

const App = () => {
  useEffect(() => {
    // Registrar la tarea al cargar la aplicación
    registerBackgroundTask();
    checkStatus();
  }, []);
};

export default App;

// mandar mensaje de notificacion a la hora progrmada

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MessageNotification = ({ data, day }) => {
  //   const dataRed = data?.dataResult ? filterCustomer(data, day).red : 0;
  //   const dataYellow = data?.dataResult ? filterCustomer(data, day).yellow : 0;
  //   const dataGreen = data?.dataResult ? filterCustomer(data, day).green : 0;
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
            title: "Actualizacion",
            body: `STORAGE `,
            //data: { screen: "Clientes" }, // Vista a la que dirigirse
          },
          //   trigger: {
          //     type: Notifications.SchedulableTriggerInputTypes.DAILY,
          //     hour: 0,
          //     minute: 0,
          //     repeats: true, // Se repetirá todos los días a las 9 AM
          //   },
          trigger: null,

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

///export default MessageNotification;
