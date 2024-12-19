import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Platform } from "react-native";
import Routes from "../src/routes/Routes";
//import { Provider as PaperProvider, RadioButton } from "react-native-paper";

export default function App() {
  return (
    <View
      style={{
        flex: 1,
        //paddingTop: Platform.OS === "android" ? 30 : 0,
      }}
    >
     
      <Routes />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgb(31, 36, 36)",
    alignItems: "center",
    justifyContent: "center",
  },
});
