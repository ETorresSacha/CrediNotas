import { StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";
import React from "react";
const Loading = () => {
  const getContent = () => {
    return <ActivityIndicator size="large" color="#f57d11" />;
  };
  return (
    <View style={styles.background}>
      <Text
        style={{
          color: "white",
          fontSize: 30,
          fontFamily: "cursive",
          letterSpacing: 4,
        }}
      >
        Credi Check
      </Text>
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
    backgroundColor: "#19202c",
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
