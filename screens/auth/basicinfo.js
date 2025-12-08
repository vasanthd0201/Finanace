import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function BasicInfo({ navigation }) {
  const [fullName, setFullName] = useState("");
  const [pan, setPan] = useState("");
  const [dob, setDob] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [email, setEmail] = useState("");

  // PAN validation
  const validatePan = (text) => {
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;
    setPan(text.toUpperCase());
    return panRegex.test(text.toUpperCase());
  };

  const proceed = () => {
    if (!fullName || !pan || !email) {
      Alert.alert("Missing Details", "Please fill all fields.");
      return;
    }

    if (!validatePan(pan)) {
      Alert.alert("Invalid PAN", "Enter a valid PAN number.");
      return;
    }

    navigation.navigate("ProfessionalInfo");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.step}>Step 1 of 4</Text>
      <Text style={styles.title}>Basic Information</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={fullName}
        onChangeText={setFullName}
      />

      <TextInput
        style={styles.input}
        placeholder="PAN Number"
        value={pan}
        maxLength={10}
        onChangeText={validatePan}
      />

<TouchableOpacity onPress={() => setShowPicker(true)}>
  <View style={styles.input}>
    <Text style={{ color: dob ? "#000" : "#999" }}>
      {dob ? dob.toDateString() : "Date of Birth"}
    </Text>
  </View>
</TouchableOpacity>

{showPicker && (
  <DateTimePicker
    mode="date"
    value={dob || new Date()}
    display="spinner"
    maximumDate={new Date()}
    onChange={(event, selectedDate) => {
      setShowPicker(false);

      // ⛔ Do NOT update if user cancelled / dismissed
      if (event.type === "dismissed") return;

      // ✅ Update only when user selects a date
      if (selectedDate) setDob(selectedDate);
    }}
  />
)}


      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
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
    marginTop: 20,
    fontSize: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 20,
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
