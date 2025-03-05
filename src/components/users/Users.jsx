import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { datePay, montoPay } from "../../utils/thunks/Thunks";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Users = ({ data, enable, dataConfiguration, day }) => {
  const navigation = useNavigation();

  //todo--> se guardará este código, como para recordar la funcionalida, puede ser útil en otra aplicación (estilo dinamico)
  // estilos dinámico del ícono de alerta
  // const [estilos, setEstilos] = useState({
  //   fontSize: 35,
  // });

  // const cambiarColor = (color) => {
  //   const estilosCopia = { ...estilos };
  //   estilosCopia.color = color;
  //   setEstilos(estilosCopia);
  // };

  // useEffect(() => {
  //   if (color) cambiarColor(color);
  // }, [color]);
  //todo--> se guardará este código, como para recordar la funcionalida, puede ser útil en otra aplicación

  return (
    <View>
      {data?.map((element, index) => {
        return (
          <View
            key={element.uuid}
            style={
              index % 2 == 0
                ? [styles.dataItem, { backgroundColor: "rgb(31, 36, 36)" }]
                : [
                    styles.dataItem,
                    { backgroundColor: "rgba(55, 59, 59, 0.757)" },
                  ]
            }
          >
            <TouchableOpacity
              style={styles.touchItem}
              onPress={() =>
                navigation.navigate("Detalle", {
                  id: element?.uuid,
                  typeColor: !enable ? datePay(element, day)?.color : null,
                  enable: enable ? enable : undefined,
                  dataConfiguration: dataConfiguration,
                })
              }
            >
              {/* DNI */}
              <View style={{}}>
                <Text style={styles.text}>{element?.dni}</Text>
              </View>

              {/* Nombre */}
              <View
                style={{
                  width: RFPercentage(11.5),
                }}
              >
                <Text
                  style={[
                    styles.text,
                    {
                      fontSize:
                        element?.nombre?.split(" ")[0].length > 10
                          ? RFValue(10.5)
                          : RFValue(12),
                    },
                  ]}
                >{`${element?.nombre?.split(" ")[0]}`}</Text>
              </View>

              {/* Fecha */}
              {enable ? null : (
                <View style={{}}>
                  <Text style={styles.text}>{datePay(element, day).fecha}</Text>
                </View>
              )}

              {/* Monto */}
              <View style={{ alignItems: "center" }}>
                <Text
                  style={[
                    styles.text,
                    {
                      textAlign: "right",
                      color: "orange",
                      fontSize:
                        element?.resultPrestamo[0]?.cuotaNeto.length > 8
                          ? RFValue(10.5)
                          : RFValue(12),
                      width: RFPercentage(8.5),
                    },
                  ]}
                >
                  {enable
                    ? element?.capital
                    : montoPay(
                        element?.resultPrestamo,
                        dataConfiguration
                      ).toFixed(2)}
                </Text>
              </View>

              {/* Icono de la alerta */}

              {enable ? null : (
                <FontAwesome
                  name="bell"
                  style={{
                    fontSize: RFPercentage(3.2),
                    color: datePay(element, day)?.color,
                  }}
                />
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  dataItem: {
    display: "flex",
    height: 50,
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingHorizontal: 5,
    alignItems: "center",
    paddingVertical: 7,
  },
  touchItem: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  text: {
    fontSize: RFValue(12),

    color: "cornsilk",
  },
  iconAlertOff: {
    color: "cornsilk",
    fontSize: 35,
  },
});
