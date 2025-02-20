import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { formatDate } from "../../utils/thunks/Thunks";
import Loading from "../loading/Loading";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

const Pay = ({
  data,
  indice,
  setIndice,
  modify,
  dataSee,
  cancelledShare,
  setCancelledShare,
  updatePrestamo,
  intMora,
  color,
  valueProps,
  setValueProps,
}) => {
  const { onUpdateStatusPay } = UseStorage();
  const [payShare, setPayShere] = useState([]); // Guardar el pago
  const [enable, setEnable] = useState(false); // Boton de cancelar pago (ON OFF)

  useEffect(() => {
    // Buscamos la última cuota pagado (útil cuando la cuenta esta cancelado)
    let cuotaCancelada = data[0]?.resultPrestamo[indice - 1];
    setPayShere(cuotaCancelada);

    // Deshabilitar y habilitar el botonde cancelar pago
    if (indice == 0) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [indice]);

  //todo-->  Pagar la cuota
  const handlePayShare = async () => {
    let objeto = { ...dataSee, statusPay: true };
    updatePrestamo.splice(indice, 1, objeto);

    if (
      indice < (updatePrestamo == undefined ? null : updatePrestamo.length - 1)
    ) {
      // Pago de la cuenta
      setIndice(indice + 1);
      await onUpdateStatusPay(modify);
      setValueProps({ ...valueProps, typeColor: "cornsilk" });
      setEnable(false); // Habilita el boton de cancelar el pago
    } else {
      // Cancelación de la deuda
      let objeto = {
        ...modify[0],
        uuid: data[0].uuid,
        cancelled: true,
        resultPrestamo: updatePrestamo,
      };
      modify.splice(0, 1, objeto);

      await onUpdateStatusPay(modify);
      setCancelledShare(true);
    }
  };
  //console.log("dataSee: ", dataSee);

  //console.log("modify: ", modify);

  //todo--> Cancelar el pago de la cuota
  const HandleCancelPay = async () => {
    //! Cuando tiene cuotas pendientes
    if (indice > 0 && indice < updatePrestamo?.length) {
      let objeto = { ...payShare, statusPay: false };

      updatePrestamo.splice(indice - 1, 1, objeto); // Modificamos los pagos
      await onUpdateStatusPay(modify); // Guardamos los datos
      setIndice(indice - 1);
    }

    //! Cuando la deuda esta completamente cancelado
    if (indice == data[0]?.resultPrestamo.length) {
      let indiceCambiar = data[0]?.resultPrestamo?.length - 1; //  seleccionamos el ultimo indice del objeto "resultPrestamo"

      let result = data[0]?.resultPrestamo[indiceCambiar]; // buscamos el último pago realizado
      //console.log("result: ", result);

      let objeto = { ...result, statusPay: false }; // modificamos el statusPay del último pago de "true" a "false"
      updatePrestamo.splice(indiceCambiar, 1, objeto); // modificamos el array del "resultPrestamo"

      let newResult = {
        ...modify[0],
        uuid: data[0].uuid,
        cancelled: false,
        resultPrestamo: updatePrestamo,
      };

      modify.splice(0, 1, newResult); // Reemplazamos los datos de "modify" con los datos actualizados

      await onUpdateStatusPay(modify); // Guardamos los datos
      setCancelledShare(false);
    }
  };
  console.log("dataSee: ", dataSee);

  //! OJO: PODRIAMOS CONSIDERAR EN AUMENTAR LOS DIAS DE MORA, SERIA OPTIMO O VISIBLE SOLO CUANDO EXISTE LA MORA
  return (
    <View style={styles.container}>
      {updatePrestamo == undefined ? (
        <Loading />
      ) : (
        <View>
          <View style={styles.pagosTitle}>
            <Text style={styles.titleText}>PAGOS</Text>
            <TouchableOpacity
              style={styles.cancelPago}
              onPress={HandleCancelPay}
              disabled={enable}
            >
              <MaterialIcons
                name="settings-backup-restore"
                size={27}
                color="cornsilk"
              />
              <Text
                style={{
                  fontSize: 10,
                  color: "cornsilk",
                }}
              >
                Cancelar Pago
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.pagosDetalle}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingBottom: 15,
              }}
            >
              <View
                style={[
                  styles.containerSubTitle,
                  {
                    gap: 4,
                    justifyContent: "space-evenly",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subTitle,
                    { fontWeight: "bold", fontSize: RFValue(12.5) },
                  ]}
                >
                  Fecha de pago:
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    { color: "orange", fontSize: RFValue(13) },
                  ]}
                >
                  {!cancelledShare
                    ? dataSee?.fechaPago == undefined
                      ? null
                      : formatDate(dataSee?.fechaPago)
                    : "-  -  -"}
                </Text>
              </View>
              <View
                style={[
                  styles.containerSubTitle,
                  {
                    justifyContent: "space-around",
                    gap: 4,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.subTitle,
                    { fontWeight: "bold", fontSize: RFValue(12.5) },
                  ]}
                >
                  Cuota total:
                </Text>
                <Text
                  style={[
                    styles.subTitle,
                    {
                      color: color == "red" ? color : "orange",
                      fontSize:
                        dataSee?.cuotaNeto?.length >= 8
                          ? RFValue(12)
                          : RFValue(13),
                    },
                  ]}
                >
                  S/{" "}
                  {!cancelledShare
                    ? (
                        parseFloat(dataSee?.cuotaNeto) +
                        parseFloat(dataSee?.mora)
                      ).toFixed(2)
                    : "0"}
                </Text>
              </View>
            </View>
            <View style={{ paddingHorizontal: 15, gap: 2 }}>
              {/* Fecha de desemboldo */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Fecha de desembolso</Text>
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  {dataSee?.fechaPago == undefined
                    ? null
                    : formatDate(dataSee?.fechaDesembolso)}
                </Text>
              </View>

              {/* Total del préstamo */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Total del préstamo</Text>
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  S/ {dataSee?.capital}
                </Text>
              </View>

              {/* Total del interes */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Total del interes</Text>
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  S/ {dataSee?.interesTotal}
                </Text>
              </View>

              {/* Tipo de préstamo */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Tipo de préstamo</Text>
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  {data[0].periodo}
                </Text>
              </View>

              {/* INTERES */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Interes</Text>
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  {data[0].interes} %
                </Text>
              </View>
              {/* CUOTA */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Cuota</Text>
                <Text style={{ color: "white", fontSize: RFValue(14) }}>
                  S/ {!cancelledShare ? dataSee?.cuotaNeto : "0"}
                </Text>
              </View>
              {/* MORA */}
              <View
                style={[
                  styles.containerSubTitle,
                  { justifyContent: "space-between" },
                ]}
              >
                <Text style={styles.subTitle}>Mora</Text>
                <Text
                  style={{
                    color: color == "red" ? color : "white",
                    fontSize: RFValue(14),
                  }}
                >
                  S/ {parseFloat(dataSee?.mora).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={
                !cancelledShare
                  ? [
                      styles.buttonContainer,
                      { backgroundColor: "orange", width: RFPercentage(40) },
                    ]
                  : [
                      styles.buttonContainer,
                      { borderColor: "white", width: RFPercentage(40) },
                    ]
              }
              onPress={!cancelledShare ? handlePayShare : null}
              disabled={cancelledShare}
            >
              {!cancelledShare ? (
                <FontAwesome
                  name="money"
                  style={{ color: "cornsilk", fontSize: 40 }}
                />
              ) : null}
              <Text style={styles.subTitle}>
                {!cancelledShare ? "Pagar" : "Deuda Cancelado"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
  container: {},

  pagosTitle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(36, 146, 224, 0.625)",
    paddingHorizontal: 15,
    alignItems: "center",
  },
  titleText: {
    fontSize: RFValue(14),
    color: "cornsilk",
    fontWeight: "bold",
  },
  cancelPago: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 2,
  },
  pagosDetalle: {
    marginVertical: 15,
    justifyContent: "space-around",
    alignContent: "center",
  },

  subTitle: {
    fontSize: RFValue(14),
    color: "cornsilk",
  },
  containerSubTitle: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignContent: "center",
    height: 40,
    justifyContent: "center",
    borderRadius: 10,
    gap: 10,
    elevation: 5,
    borderWidth: 1,
  },
});
