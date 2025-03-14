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
    <ImageBackground style={styles.background}>
      <View
        style={{
          width: RFPercentage(25),
          height: RFPercentage(25),
          borderRadius: 100,
          justifyContent: "center",
          backgroundColor: "#541e50",
          //display: "flex",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View style={styles.container}>{getContent()}</View> */}
        <Image source={logo} style={styles.profileImage}></Image>
      </View>
      {/* <Text style={{ color: "white" }}>CREDI CHECK</Text> */}
    </ImageBackground>
  );
};

export default Loading;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    //resizeMode: "cover", // o 'contain' según tu preferencia
    //padding: 12,
    justifyContent: "center",
    alignItems: "center",
    alignContent: "center",
    backgroundColor: "#2f3034",
  },
  profileImage: {
    width: RFPercentage(20),
    height: RFPercentage(20),
    borderRadius: 100,
  },
  container: {
    // flex: 1,
    justifyContent: "center",
    //height: RFPercentage(60),
    //backgroundColor: "red",

    //width: "70%",
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
  },
  horizontal: {
    // flexDirection: "row",
    // justifyContent: "space-around",
  },
  rightConteiner: {
    //flex: 1,
    backgroundColor: "red",
    // display: "flex",
    // flexDirection: "row",
    // alignItems: "center",
  },
});
