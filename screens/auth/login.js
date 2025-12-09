import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login({ navigation }) {
  const [mobile, setMobile] = useState("");

  const handleContinue = async () => {
    try {
      navigation.navigate("Otp", { mobile });
    } catch (error) {
      console.log("Error checking user login:", error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.title}>
            InstaLoan <Text style={{ color: "#D4AF37" }}>Pro</Text>
          </Text>

          <Text style={styles.subtitle}>Secure Loans in Minutes</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter Mobile Number"
            keyboardType="number-pad"
            maxLength={10}
            value={mobile}
            onChangeText={setMobile}
          />

          <TouchableOpacity
            style={[styles.button, { opacity: mobile.length === 10 ? 1 : 0.5 }]}
            disabled={mobile.length !== 10}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            By continuing, you agree to our{" "}
            <Text style={styles.link}>Terms</Text> &{" "}
            <Text style={styles.link}>Privacy Policy</Text>
          </Text>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: { fontSize: 30, fontWeight: "700" },
  subtitle: {
    marginTop: 4,
    fontSize: 14,
    color: "#6c6c6c",
    marginBottom: 40,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 20,
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
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  terms: {
    marginTop: 20,
    fontSize: 12,
    color: "#555",
    textAlign: "center",
  },
  link: { color: "#001F54", fontWeight: "600" },
});
