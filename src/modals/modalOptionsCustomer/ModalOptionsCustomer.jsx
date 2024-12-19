import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createExcel } from "./exportExcel";

const optionsData = [
  { name: "Exportar Data", symbolName: "database-arrow-right" },
  { name: "Importar Data", symbolName: "database-arrow-left" },
];

const ModalOptionsCustomer = ({ visible, setIsVisible, setValueImport }) => {
  const options = (value) => {
    switch (value) {
      case "Exportar Data":
        createExcel();
        break;
      case "Importar Data":
        setValueImport(true);
        break;
    }
    setIsVisible(false);
  };
  return (
    <View>
      <Modal
        transparent={true}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          {optionsData.map((element, index) => {
            return (
              <TouchableOpacity
                onPress={() => options(element.name)}
                key={index}
                style={styles.optionsDataStyle}
              >
                <MaterialCommunityIcons
                  name={element.symbolName}
                  size={40}
                  color="rgb(36, 224, 221)"
                />
                <Text style={styles.text}>{element.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </Modal>
    </View>
  );
};

export default ModalOptionsCustomer;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
  },
  modalContent: {
    backgroundColor: "rgba(16, 18, 20, 0.936)",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
    paddingRight: 7,
    paddingBottom: 7,
    position: "absolute",
    top: "1%",
    right: "1%",
  },
  text: {
    fontSize: 12,
    color: "white",
    alignSelf: "flex-end",
    paddingLeft: 2,
  },
  optionsDataStyle: {
    borderRadius: 2,
    borderColor: "white",
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    paddingTop: 5,
  },
});
