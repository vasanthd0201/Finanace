import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function KycVerification({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 3 of 4</Text>
      <Text style={styles.title}>Complete Your KYC</Text>
      <Text style={styles.subtitle}>KYC Verification Made Easy</Text>

      {/* DigiLocker KYC */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("KycUpload")}>
        <Text style={styles.cardTitle}>Instant KYC with DigiLocker</Text>
        <Text style={styles.cardDesc}>
          Recommended: Paperless verification using Aadhaar for seamless authentication.
        </Text>
      </TouchableOpacity>

      {/* Manual Upload */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate("KycUpload")}>
        <Text style={styles.cardTitle}>Manual Upload Option</Text>
        <Text style={styles.cardDesc}>
          Take a selfie, upload PAN card photo, and Aadhaar (front & back).
        </Text>
      </TouchableOpacity>

      {/* Continue */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProfileAnalysis")}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#fff",
  },
  step: {
    color: "#777",
    fontSize: 14,
    marginBottom: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  subtitle: {
    color: "#666",
    marginBottom: 25,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 5,
  },
  cardDesc: {
    color: "#555",
  },
  button: {
    backgroundColor: "#001F54",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
