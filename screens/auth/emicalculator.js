import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";

export default function EmiCalculator({ navigation }) {
  const [amount, setAmount] = useState(50000);
  const [months, setMonths] = useState(12);

  const calculateEmi = () => {
    let rate = 0.015; // 1.5%
    return Math.round(
      (amount * rate * Math.pow(1 + rate, months)) /
        (Math.pow(1 + rate, months) - 1)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customize Your Loan</Text>

      <Text style={styles.sub}>Loan Amount: ₹{amount}</Text>
      <Slider
        minimumValue={5000}
        maximumValue={100000}
        value={amount}
        step={1000}
        onValueChange={setAmount}
      />

      <Text style={styles.sub}>Tenure: {months} Months</Text>
      <Slider
        minimumValue={3}
        maximumValue={18}
        value={months}
        step={1}
        onValueChange={setMonths}
      />

      <View style={styles.card}>
        <Text style={styles.emiLabel}>₹{calculateEmi()}</Text>
        <Text style={styles.caption}>Estimated Monthly EMI</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("FinalSteps")}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 20 },
  sub: { fontSize: 18, marginVertical: 10 },
  card: {
    padding: 25,
    backgroundColor: "#f4f4f4",
    borderRadius: 12,
    marginVertical: 20,
  },
  emiLabel: { fontSize: 30, fontWeight: "700", textAlign: "center" },
  caption: { textAlign: "center", color: "#555" },
  button: {
    backgroundColor: "#001F54",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
