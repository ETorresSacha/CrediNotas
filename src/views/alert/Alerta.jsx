// import React, { useEffect, useState } from "react";
// import * as Notifications from "expo-notifications";
// import registerForPushNotificationsAsync from "./getToken";
// import { useNavigation } from "@react-navigation/native";

// // Configurar el manejador de notificaciones
// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: true,
//     shouldSetBadge: true,
//   }),
// });

// const Alerta = ({ dataYellow, dataRed }) => {
//   const [expoPushToken, setExpoPushToken] = useState("");
//   const navigation = useNavigation();

//   // Listener para manejar la respuesta a las notificaciones
//   useEffect(() => {
//     const subscription = Notifications.addNotificationResponseReceivedListener(
//       (response) => {
//         const screenName = response.notification.request.content.data.screen;
//         if (screenName) {
//           navigation.navigate(screenName);
//         }
//       }
//     );

//     // Limpieza del listener cuando el componente se desmonta
//     return () => subscription.remove();
//   }, [navigation]);

//   // Programar notificaciones diarias a las 9:00 AM
//   const scheduleTodoNotification = async () => {
//     try {
//       // Limpiar todas las notificaciones programadas existentes
//       await Notifications.cancelAllScheduledNotificationsAsync();

//       // Solicitar permiso para enviar notificaciones
//       const { status } = await Notifications.requestPermissionsAsync();
//       if (status === "granted") {
//         // Programar la notificación
//         await Notifications.scheduleNotificationAsync({
//           content: {
//             title: "Clientes por cobrar",
//             body: `Para hoy ${dataYellow.length}, vencidos ${dataRed.length}`,
//             data: { screen: "Clientes" },
//           },
//           trigger: {
//             hour: 22,
//             minute: 4,
//             repeats: true,
//           },
//           ios: {
//             sound: true,
//           },
//           android: {
//             sound: true,
//             priority: "high",
//             sticky: false,
//             vibrate: true,
//           },
//         });
//       } else {
//         console.log("Permiso de notificación denegado.");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   // Función para enviar el token al backend
//   const sendTokenToBackend = async (token) => {
//     try {
//       await fetch("https://tu-backend.com/api/save-token", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ token }),
//       });
//     } catch (error) {
//       console.error("Error sending token to backend:", error);
//     }
//   };

//   // Llamado a la función para programar notificaciones
//   useEffect(() => {
//     setTimeout(async () => {
//       await scheduleTodoNotification();
//     }, 0);
//   }, [dataYellow, dataRed]);

//   // Obtención del token de notificaciones push
//   useEffect(() => {
//     registerForPushNotificationsAsync().then((token) => {
//       setExpoPushToken(token);
//     });
//   }, []);

//   return null; // Asegurarse de que el componente devuelve algo (p. ej., null si no hay UI que mostrar)
// };

// export default Alerta;

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

const Alerta = ({ dataYellow, dataRed }) => {
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
            body: ` Para hoy  ${dataYellow.length}, vencidos ${dataRed.length}`,
            data: { screen: "Clientes" }, // Vista a la que dirigirse
          },
          trigger: {
            hour: 9,
            minute: 0,
            repeats: true, // Esto hace que la notificación se repita diariamente
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
    setTimeout(async () => {
      await scheduleTodoNotification();
    }, 0);
  }, []);

  //! Obtención del token

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );
  }, []);
};

export default Alerta;
