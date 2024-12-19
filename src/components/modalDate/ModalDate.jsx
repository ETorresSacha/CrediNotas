import React from "react";
import { format } from "date-fns";
import { View, StyleSheet } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
const ModalDate = ({
  visible,
  setShowModal,
  setPrestamo,
  prestamo,
  typeDatePrestamo,
}) => {
  // Setea los datos del préstamo
  const onChange = (event, selectedDate) => {
    setShowModal(false);
    const currentDate = selectedDate;
    setPrestamo({
      ...prestamo,
      [typeDatePrestamo]: format(currentDate, "yyyy-MM-dd"),
    });
  };

  return (
    <View>
      {visible && (
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date()}
          mode="date"
          is24Hour={true}
          onChange={onChange}
        />
      )}
    </View>
  );
};

export default ModalDate;

const styles = StyleSheet.create({});

//  OVERLAY DE react-native-elements --> es similar que un modal
