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

//todo

// Nombre de la tarea en segundo plano
const TASK_NAME = "guardar2am";

// Función que queremos ejecutar en segundo plano

// Definir la tarea en segundo plano
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    MessageNotification();

    return BackgroundFetch.Result.NewData;
  } catch (error) {
    console.error("Error en la tarea de segundo plano:", error);
    return BackgroundFetch.Result.Failed;
  }
});

// Función para registrar la tarea a las 2 AM
const registerBackgroundTask = async () => {
  try {
    const status = await BackgroundFetch.getStatusAsync();
    if (
      status === BackgroundFetch.Status.Restricted ||
      status === BackgroundFetch.Status.Denied
    ) {
      console.log("Permiso denegado para ejecutar en segundo plano.");
      return;
    }

    //todo progrmando la hora de ejecucion
    const now = new Date();
    const twoAMTomorrow = new Date();
    twoAMTomorrow.setHours(2, 0, 0, 0);
    // Calcular los milisegundos hasta las 2 AM del día siguiente
    const timeToTwoAM = twoAMTomorrow - now;

    // await BackgroundFetch.registerTaskAsync(TASK_NAME, {
    //   minimumInterval: 24 * 60 * 60, // Ejecutar cada 24 horas (en segundos)
    //   stopOnTerminate: false,
    //   startOnBoot: true,
    // });

    // Luego usar este valor para el registro de la tarea
    await BackgroundFetch.registerTaskAsync(TASK_NAME, {
      minimumInterval: timeToTwoAM / 1000, // Convertir de milisegundos a segundos
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log(
      "Tarea en segundo plano registrada correctamente para las 2 AM."
    );
  } catch (error) {
    console.error("Error al registrar la tarea:", error);
  }
};

const App = () => {
  useEffect(() => {
    registerBackgroundTask();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Tarea programada a las 2 AM en segundo plano</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default App;

// mandar mensaje de notificacion a la hora progrmada

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const MessageNotification = () => {
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
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.DAILY,
            hour: 8,
            minute: 0,
            repeats: true, // Se repetirá todos los días a las 9 AM
          },
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
