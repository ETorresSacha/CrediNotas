import * as TaskManager from "expo-task-manager";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Nombre de la tarea
const BACKGROUND_TASK_NAME = "background-fetch-task";

// Definir la tarea
TaskManager.defineTask(BACKGROUND_TASK_NAME, async () => {
  console.log("Ejecutando tarea en segundo plano...");
  
  // Guardar en AsyncStorage que se ejecutó la tarea
  await AsyncStorage.setItem("lastUpdate", new Date().toLocaleString());

  // Simulación de una acción (ejemplo: enviar una notificación)
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Tarea en Segundo Plano",
      body: "Tu tarea programada se ejecutó correctamente.",
    },
    trigger: null, // Se ejecuta inmediatamente
  });

  return BackgroundFetch.Result.NewData;
});

// Función para registrar la tarea
export async function registerBackgroundTask() {
  const status = await BackgroundFetch.getStatusAsync();
  if (status === BackgroundFetch.Status.Restricted || status === BackgroundFetch.Status.Denied) {
    console.log("Permiso denegado para ejecutar en segundo plano.");
    return;
  }

  const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_TASK_NAME);
  if (!isRegistered) {
    await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
      minimumInterval: 24 * 60 * 60, // Ejecutar cada 24 horas
      stopOnTerminate: false,
      startOnBoot: true,
    });
    console.log("Tarea en segundo plano registrada.");
  }
}

// Llamar la función al iniciar la app
registerBackgroundTask();




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