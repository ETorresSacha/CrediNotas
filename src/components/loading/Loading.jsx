import {
  StyleSheet,
  View,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import React from "react";
import fondoLoagin from "../../../assets/images/fondoLoagin.png";

const Loading = () => {
  const getContent = () => {
    return <ActivityIndicator size="large" color="#00ff00" />;
  };
  return (
    <ImageBackground source={fondoLoagin} style={styles.background}>
      <View style={[styles.container, styles.horizontal]}>{getContent()}</View>
    </ImageBackground>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover", // o 'contain' según tu preferencia
    padding: 12,
    backgroundColor: "red",
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
