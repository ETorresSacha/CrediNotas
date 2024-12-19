import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";

const Loading = () => {
  const getContent = () => {
    return <ActivityIndicator size="large" color="#00ff00" />;
  };
  return (
    <View style={[styles.container, styles.horizontal]}>{getContent()}</View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
