import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function LoanApproved({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Congratulations! You're Approved</Text>

      <View style={styles.card}>
        <Text style={styles.label}>₹50,000</Text>
        <Text style={styles.caption}>Approved Amount</Text>

        <Text style={styles.label}>12 Months</Text>
        <Text style={styles.caption}>Flexible Tenure</Text>

        <Text style={styles.label}>₹4,500</Text>
        <Text style={styles.caption}>Monthly EMI</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("EmiCalculator")}
      >
        <Text style={styles.buttonText}>Adjust Loan</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4CAF50" }]}
        onPress={() => navigation.navigate("FinalSteps")}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 25, marginTop: 25 },
  card: {
    backgroundColor: "#f5f5f5",
    padding: 25,
    borderRadius: 12,
    marginBottom: 30,
  },
  label: { fontSize: 26, fontWeight: "700", textAlign: "center" },
  caption: { textAlign: "center", color: "#666", marginBottom: 15 },
  button: {
    backgroundColor: "#001F54",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
