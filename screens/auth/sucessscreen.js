import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function SuccessScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.bigCheck}>✓</Text>
      <Text style={styles.title}>Money is on its way!</Text>

      <Text style={styles.sub}>
        Your loan has been disbursed. Funds will reach your account shortly.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ThankYou")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#fff"
  },
  bigCheck: { fontSize: 70, color: "green", marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "700" },
  sub: { textAlign: "center", color: "#777", marginVertical: 20 },
  button: {
    backgroundColor: "#001F54",
    padding: 15,
    width: "100%",
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
