import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function ProfessionalInfo({ navigation }) {
  const [employment, setEmployment] = useState("");
  const [company, setCompany] = useState("");
  const [income, setIncome] = useState("");

  const proceed = () => {
    if (!employment || !income) {
      alert("Please fill required fields.");
      return;
    }

    navigation.navigate("KycVerification");

  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 2 of 4</Text>
      <Text style={styles.title}>Professional Details</Text>

      <Text style={styles.label}>Employment Type</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.option, employment === "salaried" && styles.selected]}
          onPress={() => setEmployment("salaried")}
        >
          <Text style={styles.optionText}>Salaried</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, employment === "self" && styles.selected]}
          onPress={() => setEmployment("self")}
        >
          <Text style={styles.optionText}>Self-Employed</Text>
        </TouchableOpacity>
      </View>

      {employment === "salaried" && (
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={company}
          onChangeText={setCompany}
        />
      )}

      <TextInput
        style={styles.input}
        placeholder="Net Monthly Income"
        keyboardType="number-pad"
        value={income}
        onChangeText={setIncome}
      />

      <TouchableOpacity style={styles.button} onPress={proceed}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
  },
  step: {
    color: "#777",
    marginBottom: 5,
    fontSize: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  option: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginRight: 10,
  },
  selected: {
    backgroundColor: "#001F54",
    borderColor: "#001F54",
  },
  optionText: {
    color: "#000",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#001F54",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
