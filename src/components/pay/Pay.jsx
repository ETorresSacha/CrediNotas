import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import UseStorage from "../hooks/UseHookStorage";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { formatDate } from "../../utils/thunks/Thunks";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import ModalCancelPay from "./ModalCancelPay";
const Pay = ({
  data,
  indice,
  setIndice,
  modify,
  dataSee,
  setDataSee,
  canceledShare,
  setCanceledShare,
  updatePrestamo,
  valueProps,
  setValueProps,
  setUser,
}) => {
  const { onUpdateStatusPay } = UseStorage();
  const [payShare, setPayShere] = useState(); // Guardar el pago
  const [enable, setEnable] = useState(false); // Boton de cancelar pago (ON OFF)
  const [isVisible, setIsVisible] = useState(false); // Habilita el modal de cancelar la deuda

  useEffect(() => {
    // Buscamos la última cuota pagado (útil cuando la cuenta esta cancelado)
    let cuotaCancelada = data[0]?.resultPrestamo[indice - 1];
    setPayShere(cuotaCancelada);

    // Deshabilitar y habilitar el botonde cancelar pago

    if (modify[0].canceled) {
      // cuenta cancelada anticipado
      setEnable(false);
    } else if (payShare == undefined && modify[0].canceled == false) {
      setEnable(true);
    } else {
      setEnable(false);
    }
  }, [indice, enable, payShare, modify]);

  //todo-->  Pagar la cuota

  // NOTA: cuando el usuario hace click sucecivo en el botón "pagar" (rápido), "countPay" ayuda a que
  //       de manera controlada se ejecute, se forma sucesiva, sin cometer errores en el orden de pago.

  let countPay = dataSee?.cuota;

  const handlePayShare = async () => {
    if (countPay - 1 == indice) {
      let objeto = {
        ...dataSee,
        statusPay: true,
      };
      updatePrestamo?.splice(indice, 1, objeto);

      if (
        indice <
        (updatePrestamo == undefined ? null : updatePrestamo?.length - 1)
      ) {
        // Pago de la cuenta
        setIndice(indice + 1);
        setDataSee(objeto);

        await onUpdateStatusPay(modify);

        setValueProps({
          ...valueProps,
          typeColor: "cornsilk",
        });

        countPay = countPay + 1; // se suma 1 por cada pago ejecutado, para continuar con el siguiente
      } else {
        // Cancelación de la deuda
        let objeto = {
          ...modify[0],
          uuid: data[0]?.uuid,
          canceled: true,
          resultPrestamo: updatePrestamo,
        };
        modify.splice(0, 1, objeto);

        await onUpdateStatusPay(modify);
        setCanceledShare(true);
      }
    }
  };

  //todo--> Cancelar el pago de la cuota

  let countShare = payShare?.cuota; // función similar a countPay pero al inverso.

  const HandleCancelPay = async () => {
    if (modify[0]?.montoCanceled) {
      let objeto = { ...modify[0], canceled: false };
      delete objeto.montoCanceled;

      await onUpdateStatusPay(objeto); // Guardamos los datos

      setUser([objeto]); // seteamos para la vista

      setCanceledShare(false);
    } else {
      if (countShare == indice) {
        if (indice > 0 && indice < updatePrestamo?.length) {
          let objeto = { ...payShare, statusPay: false };
          updatePrestamo?.splice(indice - 1, 1, objeto); // Modificamos los pagos

          await onUpdateStatusPay(modify); // Guardamos los datos
          setIndice(indice - 1);

          countShare = countShare - 1; // resta 1 por cada pago cancelado, para continuar con el siguiente
        }

        //! Cuando la deuda esta completamente cancelado
        if (indice == data[0]?.resultPrestamo.length) {
          let indiceCambiar = data[0]?.resultPrestamo?.length - 1; //  seleccionamos el ultimo indice del objeto "resultPrestamo"
          let result = data[0]?.resultPrestamo[indiceCambiar]; // buscamos el último pago realizado

          let objeto = { ...result, statusPay: false }; // modificamos el statusPay del último pago de "true" a "false"
          updatePrestamo?.splice(indiceCambiar, 1, objeto); // modificamos el array del "resultPrestamo"

          let newResult = {
            ...modify[0],
            uuid: data[0]?.uuid,
            canceled: false,
            resultPrestamo: updatePrestamo,
          };

          modify.splice(0, 1, newResult); // Reemplazamos los datos de "modify" con los datos actualizados

          await onUpdateStatusPay(modify); // Guardamos los datos
          setCanceledShare(false);
        }
      }
    }
  };
  //! OJO: PODRIAMOS CONSIDERAR EN AUMENTAR LOS DIAS DE MORA, SERIA OPTIMO O VISIBLE SOLO CUANDO EXISTE LA MORA
  return (
    <View style={styles.container}>
      {
        <View>
          <View style={styles.pagosTitle}>
            <Text style={styles.titleText}>PAGOS</Text>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 20,
              }}
            >
              {/* ícono de cancelar la deuda */}

              <TouchableOpacity
                style={styles.cancelPago}
                onPress={() => setIsVisible(true)}
                disabled={modify[0]?.canceled}
              >
                <FontAwesome6
                  name="hand-holding-dollar"
                  size={27}
                  color={modify[0]?.canceled ? "gray" : "cornsilk"}
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: `${modify[0]?.canceled ? "gray" : "cornsilk"}`,
                  }}
                >
                  Cancelar deuda
                </Text>
              </TouchableOpacity>

              <ModalCancelPay
                isVisible={isVisible}
                setIsVisible={setIsVisible}
                resultPrestamo={data[0]?.resultPrestamo}
                valueProps={valueProps}
                interes={data[0]?.interes}
                dataSee={dataSee}
                modify={modify}
                setCanceledShare={setCanceledShare}
                setEnable={setEnable}
              />
              {/* ícono de cancelar la cuota pagada */}
              <TouchableOpacity
                style={styles.cancelPago}
                onPress={HandleCancelPay}
                disabled={enable}
              >
                <MaterialIcons
                  name="settings-backup-restore"
                  size={27}
                  color={
                    !canceledShare && dataSee?.cuota == 1 ? "gray" : "cornsilk"
                  }
                />
                <Text
                  style={{
                    fontSize: 10,
                    color: `${
                      !canceledShare && dataSee?.cuota == 1
                        ? "gray"
                        : "cornsilk"
                    }`,
                  }}
                >
                  Cancelar pago
                </Text>
              </TouchableOpacity>
            </View>
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
              {/* Fecha de pago */}
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
                  {!canceledShare
                    ? dataSee?.fechaPago == undefined
                      ? null
                      : formatDate(dataSee?.fechaPago)
                    : "-  -  -"}
                </Text>
              </View>

              {/* Cuota total */}
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
                      color:
                        !canceledShare && dataSee?.mora != 0 ? "red" : "orange",

                      fontSize:
                        dataSee?.cuotaNeto?.length >= 8
                          ? RFValue(12)
                          : RFValue(13),
                    },
                  ]}
                >
                  S/{" "}
                  {!canceledShare
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
                  {data[0]?.periodo}
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
                  {data[0]?.interes} %
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
                  S/ {!canceledShare ? dataSee?.cuotaNeto : "0"}
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
                    color:
                      !canceledShare && dataSee?.mora != 0 ? "red" : "white",
                    fontSize: RFValue(14),
                  }}
                >
                  S/{" "}
                  {!canceledShare ? parseFloat(dataSee?.mora).toFixed(2) : "0"}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ alignItems: "center" }}>
            <TouchableOpacity
              style={
                !canceledShare
                  ? [
                      styles.buttonContainer,
                      { backgroundColor: "orange", width: RFPercentage(40) },
                    ]
                  : [
                      styles.buttonContainer,
                      { borderColor: "white", width: RFPercentage(40) },
                    ]
              }
              onPress={!canceledShare ? handlePayShare : null}
              disabled={canceledShare}
            >
              {!canceledShare ? (
                <FontAwesome
                  name="money"
                  style={{ color: "cornsilk", fontSize: 40 }}
                />
              ) : null}
              <Text style={styles.subTitle}>
                {!canceledShare ? "Pagar" : "Deuda Cancelado"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      }
    </View>
  );
};

export default Pay;

const styles = StyleSheet.create({
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
