// import * as TaskManager from "expo-task-manager";
// import * as BackgroundFetch from "expo-background-fetch";
// import * as Notifications from "expo-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Nombre de la tarea
// const BACKGROUND_TASK_NAME = "background-fetch-task";

// // Definir la tarea
// TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
//   console.log("Ejecutando tarea en segundo plano...");
  
//   // Guardar en AsyncStorage que se ejecutó la tarea

// // Obtener la fecha y hora actual
// const twoAMLocal = new Date();

// // Aumentar la fecha en 1 día para programarla a las 2 AM del día siguiente
// twoAMLocal.setDate(twoAMLocal.getDate() + 1);
// twoAMLocal.setHours(2, 0, 0, 0);  // Establece la hora a las 02:00 AM

// // Convertir la 2 AM local a UTC
// const twoAMUTC = new Date(twoAMLocal.getTime() - twoAMLocal.getTimezoneOffset() * 60000);

// // Mostrar la hora en el formato local de Perú

//   await AsyncStorage.setItem("lastUpdate", twoAMUTC.toLocaleString());

//   // Simulación de una acción (ejemplo: enviar una notificación)
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "Tarea en Segundo Plano",
//       body: "Tu tarea programada se ejecutó correctamente.",
//     },
//     trigger: null, // Se ejecuta inmediatamente
//   });

//   return BackgroundFetch.Result.NewData;
// });

// // Función para registrar la tarea
// export async function registerBackgroundTask() {
//   const status = await BackgroundFetch.getStatusAsync();
//   if (status === BackgroundFetch.Status.Restricted || status === BackgroundFetch.Status.Denied) {
//     console.log("Permiso denegado para ejecutar en segundo plano.");
//     return;
//   }

//   const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
//   if (!isRegistered) {
//     await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
//       minimumInterval: 24 * 60 * 60, // Ejecutar cada 24 horas
//       stopOnTerminate: false,
//       startOnBoot: true,
//     });
//     console.log("Tarea en segundo plano registrada.");
//   }
// }

// // Llamar la función al iniciar la app
// registerBackgroundTask();

//todo


// import * as TaskManager from "expo-task-manager";
// import * as BackgroundFetch from "expo-background-fetch";
// import * as Notifications from "expo-notifications";
// import AsyncStorage from "@react-native-async-storage/async-storage";

// // Nombre de la tarea
// const BACKGROUND_TASK_NAME = "background-fetch-task";

// // Definir la tarea
// TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();

//   console.log(`Intentando ejecutar tarea en segundo plano a las ${hours}:${minutes}...`);

//   // Verificar si es medianoche (00:00)
//   if (hours === 0 && minutes === 0) {
//     console.log("Ejecutando tarea programada a medianoche...");

//     // Guardar en AsyncStorage la última ejecución
//     await AsyncStorage.setItem("lastUpdate", now.toLocaleString());

//     // Simulación de una acción (ejemplo: enviar una notificación)
//     await Notifications.scheduleNotificationAsync({
//       content: {
//         title: "Actualización a Medianoche",
//         body: "La aplicación se ha actualizado correctamente.",
//       },
//       trigger: null, // Se ejecuta inmediatamente
//     });

//     return BackgroundFetch.Result.NewData;
//   } else {
//     console.log("No es medianoche, tarea cancelada.");
//     return BackgroundFetch.Result.NoData;
//   }
// });

// // Función para registrar la tarea
// export async function registerBackgroundTask() {
//   const status = await BackgroundFetch.getStatusAsync();
//   if (status === BackgroundFetch.Status.Restricted || status === BackgroundFetch.Status.Denied) {
//     console.log("Permiso denegado para ejecutar en segundo plano.");
//     return;
//   }

//   const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
//   if (!isRegistered) {
//     await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
//       minimumInterval: 60 * 30, // Ejecutar cada 30 minutos para comprobar si es medianoche
//       stopOnTerminate: false,
//       startOnBoot: true,
//     });
//     console.log("Tarea en segundo plano registrada.");
//   }
// }

// // Llamar la función al iniciar la app
// registerBackgroundTask();
//todo
import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as BackgroundFetch from 'expo-background-fetch';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TASK_NAME = 'background-task-at-2am';

// Función que queremos ejecutar en segundo plano
const suma = () => 8 + 5;

// Definir la tarea en segundo plano
TaskManager.defineTask(TASK_NAME, async () => {
  try {
    const resultado = suma();
    const timestamp = new Date().toLocaleString();

    await AsyncStorage.setItem(`suma_result_${timestamp}`, resultado.toString());

    console.log(`Tarea en segundo plano ejecutada a las 2 AM. Resultado: ${resultado}`);
    
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
    if (status === BackgroundFetch.Status.Restricted || status === BackgroundFetch.Status.Denied) {
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
    console.log("Tarea en segundo plano registrada correctamente para las 2 AM.");
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;

//todooooo
// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet } from 'react-native';
// import * as TaskManager from 'expo-task-manager';
// import * as BackgroundFetch from 'expo-background-fetch';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Notifications from 'expo-notifications';

// const TASK_NAME = 'background-task-at-2am';

// // Función que queremos ejecutar en segundo plano
// const suma = () => 8 + 5;

// // Función para enviar notificación a las 9 AM
// const scheduleNotification = async (result) => {
//   const notificationTime = new Date();
//   notificationTime.setHours(9, 0, 0, 0);  // Establece la hora a las 9:00 AM del día actual

//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: 'Resultado de la Suma',
//       body: `El resultado de la suma es: ${result}`,
//     },
//     trigger: {
//       // Establece que la notificación se enviará a las 9:00 AM
//       date: notificationTime,
//     },
//   });
// };

// // Definir la tarea en segundo plano
// TaskManager.defineTask(TASK_NAME, async () => {
//   try {
//     const resultado = suma();
//     const timestamp = new Date().toLocaleString();

//     // Guardar el resultado en AsyncStorage con un timestamp
//     await AsyncStorage.setItem(`suma_result_${timestamp}`, resultado.toString());

//     // Programar la notificación para las 9 AM con el resultado
//     await scheduleNotification(resultado);
    
//     console.log(`Tarea en segundo plano ejecutada a las 2 AM. Resultado: ${resultado}`);
    
//     return BackgroundFetch.Result.NewData;
//   } catch (error) {
//     console.error("Error en la tarea de segundo plano:", error);
//     return BackgroundFetch.Result.Failed;
//   }
// });

// // Función para registrar la tarea a las 2 AM
// const registerBackgroundTask = async () => {
//   try {
//     const status = await BackgroundFetch.getStatusAsync();
//     if (status === BackgroundFetch.Status.Restricted || status === BackgroundFetch.Status.Denied) {
//       console.log("Permiso denegado para ejecutar en segundo plano.");
//       return;
//     }

//     await BackgroundFetch.registerTaskAsync(TASK_NAME, {
//       minimumInterval: 24 * 60 * 60, // Ejecutar cada 24 horas (en segundos)
//       stopOnTerminate: false,
//       startOnBoot: true,
//     });

//     console.log("Tarea en segundo plano registrada correctamente para las 2 AM.");
//   } catch (error) {
//     console.error("Error al registrar la tarea:", error);
//   }
// };

// const App = () => {
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     registerBackgroundTask();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <Text>Tarea programada a las 2 AM en segundo plano</Text>
//       {result && <Text>Último resultado: {result}</Text>}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default App;
