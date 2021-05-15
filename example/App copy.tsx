import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, NativeModules } from "react-native";
import { isSSLValid } from "react-native-pinning-ssl";

export default function App() {
  const [Pinning, setPinning] = React.useState(false);
  React.useEffect(() => {
    runSSLPinning();
  }, []);

  const runSSLPinning = async () => {
    try {
      const result = await isSSLValid({
        url: "https://github.com/",
        hashes: [
          // "84 63 B3 A9 29 12 CC FD 1D 31 47 05 98 9B EC 13 99 37 D0 D7",
          // "5F B7 EE 06 33 E2 59 DB AD 0C 4C 9A E6 D3 8F 1A 61 C7 DC 25", // errada
          "0A E3 84 BF D4 DD E9 D1 3E 50 C5 85 7C 05 A4 42 C9 3F 8E 01 44 5E E4 B3 45 40 D2 2B D1 E3 7F 1B", // 256
        ],
        domainNames: ["github.com"],
      });
      console.log("result", result);
      setPinning(result);
      return result;
    } catch (e) {
      console.log(e);
      setPinning(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Seguro: {Pinning ? "Sim" : "Não"}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  h1: {
    fontWeight: "bold",
    fontSize: 20,
  },
});
