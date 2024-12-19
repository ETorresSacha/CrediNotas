import {
  Modal,
  StyleSheet,
  Text,
  View,
  TextInput,
  Switch,
  Pressable,
} from "react-native";
import { Button, Icon } from "@rneui/themed";
import React, { useState } from "react";

const ModalConfigNotification = ({ onClose, visible }) => {
  const [nameInstitution, setNameInstitution] = useState("");
  const [alert, setAlert] = useState(false);

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.conteiner}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>
              NOTIFICACIÓN
            </Text>
            <Button
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
              type="clear"
            />
          </View>
          <View style={styles.containerConfiguration}>
            <View
              style={{
                height: 65,
                justifyContent: "center",
                gap: 10,
              }}
            >
              <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                Institución:{" "}
              </Text>
              <TextInput
                value={nameInstitution}
                style={styles.input}
                placeholder="Nombre de la institución"
                placeholderTextColor="gray"
                errorMessage="Error"
                onChangeText={(text) => {
                  setNameInstitution(text);
                }}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <Switch
                value={alert}
                onValueChange={(value) => {
                  setAlert(value);
                }}
                trackColor={{ false: "grey", true: "rgb(63, 252, 236)" }}
                thumbColor={alert ? "rgb(63, 252, 236)" : "#f4f3f4"}
              />
              <Text
                style={{
                  color: "black",
                  paddingBottom: 10,
                  fontSize: 17,
                  fontWeight: "bold",
                }}
              >
                {alert ? "ON" : "OFF"}
              </Text>
            </View>
          </View>
          <Pressable style={styles.saveContainer}>
            <Button icon={<Icon name="save" size={28} />} type="clear" />
            <Text style={{ fontSize: 17, fontWeight: "bold" }}>Guardar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModalConfigNotification;

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  content: {
    width: "75%",
    backgroundColor: "beige",
    padding: 18,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    height: 30,
    width: 205,
    borderWidth: 1,
    borderRadius: 15,
    padding: 2,
    paddingLeft: 10,
    color: "black",
  },
  containerConfiguration: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  saveContainer: {
    marginHorizontal: 13,
    marginTop: 15,
    width: 250,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "orange",
    borderColor: "black",
    borderRadius: 15,
  },
});
