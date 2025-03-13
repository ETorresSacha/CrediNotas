import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
  Image,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React from "react";
import logo from "../../../assets/icon.png";
const Loading = () => {
  const getContent = () => {
    return <ActivityIndicator size="large" color="#00ff00" />;
  };
  return (
    <ImageBackground style={styles.background}>
      <View style={[styles.container, styles.horizontal]}>{getContent()}</View>
      <View style={styles.rightConteiner}>
        <Image source={logo} style={styles.profileImage}></Image>
      </View>
    </ImageBackground>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // o 'contain' según tu preferencia
    padding: 12,
    backgroundColor: "#541e50",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 24,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    height: RFPercentage(60),

    //width: "70%",
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
  },
  horizontal: {
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
});
