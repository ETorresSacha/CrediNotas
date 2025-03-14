import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
  Text,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React from "react";
import logo from "../../../assets/icon.png";
const Loading = () => {
  const getContent = () => {
    return <ActivityIndicator size="large" color="#00ff00" />;
  };
  return (
    <View style={styles.background}>
      <Image source={logo} style={styles.profileImage}></Image>
      <View style={styles.container}>{getContent()}</View>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "contain", // o 'contain' según tu preferencia
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#541e50",
  },
  profileImage: {
    width: RFPercentage(20),
    height: RFPercentage(20),
    borderRadius: 100,
  },
  container: {
    justifyContent: "center",
  },
});
