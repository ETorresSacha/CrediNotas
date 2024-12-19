import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import { formatDate } from "../../utils/thunks/Thunks";
import Checkbox from "expo-checkbox";
import Loading from "../loading/Loading";

const Cronograma = ({ data }) => {
  const [updatePrestamo, setUpdatePrestamo] = useState([]); // ResultPrestamo

  useEffect(() => {
    setUpdatePrestamo(data);
  }, [data]);

  return (
    <View style={styles.containerContainer}>
      {updatePrestamo == undefined ? (
        <Loading />
      ) : (
        <View>
          <ScrollView style={styles.containerCuotas}>
            <View style={styles.containerTitle}>
              <View style={styles.title}>
                <Text style={styles.tilteText}> N° CUOTA</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tilteText}>FECHA</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tilteText}> MON. CUOTA</Text>
              </View>
              <View style={styles.title}>
                <Text style={styles.tilteText}>PAGOS</Text>
              </View>
            </View>
            {updatePrestamo?.map((element, index) => {
              return (
                <View
                  key={index}
                  style={
                    index % 2 == 0
                      ? [
                          styles.dataContainer,
                          { backgroundColor: "rgba(189, 238, 247, 0.888)" },
                        ]
                      : [
                          styles.dataContainer,
                          { backgroundColor: "rgb(123, 220, 231)" },
                        ]
                  }
                >
                  <Text style={styles.dataText}>
                    {element.cuota.toString().padStart(2, "0")}
                  </Text>
                  <Text style={styles.dataText}>
                    {formatDate(element.fechaPago)}
                  </Text>
                  <Text style={styles.dataText}>{element.cuotaNeto}</Text>
                  <Checkbox
                    style={styles.checkbox}
                    value={element.statusPay}
                    color={element.statusPay ? "rgb(35, 164, 20)" : undefined}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Cronograma;

const styles = StyleSheet.create({
  containerContainer: {
    flex: 1,
  },
  containerCuotas: {
    flexDirection: "column",
  },
  containerTitle: {
    display: "flex",
    flexDirection: "row",
    paddingVertical: 8,
    justifyContent: "space-evenly",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
  },
  title: {
    fontWeight: "bold",
  },
  tilteText: {
    color: "cornsilk",
    fontSize: 15,
    fontWeight: "bold",
  },

  dataContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(189, 238, 247, 0.888)",
    paddingVertical: 10,
  },

  dataText: {
    fontSize: 17,
  },
  checkbox: {
    padding: 5,
    marginLeft: 15,
    borderWidth: 2,
  },
});
