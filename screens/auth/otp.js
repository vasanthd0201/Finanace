import React, { useRef, useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Otp({ route, navigation }) {
  const { mobile } = route.params;
  const inputRefs = useRef([]);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(30);
  const [generatedOtp, setGeneratedOtp] = useState("");

  // Generate OTP Function
  const generateOtp = async () => {
    const newOtp = (Math.floor(100000 + Math.random() * 900000)).toString();
    setGeneratedOtp(newOtp);
    console.log("📌 Generated OTP:", newOtp);
    await AsyncStorage.setItem("userOtp", newOtp);
  };

  // Run once on screen load
  useEffect(() => {
    generateOtp(); // generate OTP
    startTimer();
  }, []);

  // Start / Restart Timer
  const startTimer = () => {
    setTimer(30);
    const countdown = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) clearInterval(countdown);
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);
  };

  // Handle OTP Input
  const handleChange = (text, index) => {
    const otpArray = [...otp];
    otpArray[index] = text;
    setOtp(otpArray);

    if (text.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Resend OTP Function
  const resendOtp = async () => {
    await generateOtp();   // generate new OTP
    startTimer();          // restart timer
    setOtp(["", "", "", "", "", ""]); // clear boxes

    // Clear input fields visually
    inputRefs.current.forEach(input => {
      if (input) input.clear();
    });

    Alert.alert("OTP Sent", "A new OTP has been sent!");
  };

  // Verify OTP
  const verifyOtp = async () => {
    const enteredOtp = otp.join("");
    const storedOtp = await AsyncStorage.getItem("userOtp");

    console.log("Entered:", enteredOtp, "Stored:", storedOtp);

    if (enteredOtp === storedOtp) {
      Alert.alert("Success", "OTP verified successfully!");
      navigation.navigate("BasicInfo");
    } else {
      Alert.alert("Error", "Invalid OTP. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.subtitle}>Sent to +91 {mobile}</Text>

      <View style={styles.otpContainer}>
        {otp.map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            onChangeText={(text) => handleChange(text, index)}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {timer > 0 ? (
        <Text style={styles.timer}>Resend OTP in {timer}s</Text>
      ) : (
        <TouchableOpacity onPress={resendOtp}>
          <Text style={styles.resend}>Resend OTP</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.button} onPress={verifyOtp}>
        <Text style={styles.buttonText}>Verify & Proceed</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
  },
  subtitle: {
    marginVertical: 8,
    fontSize: 14,
    color: "#777",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginVertical: 20,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    textAlign: "center",
    fontSize: 20,
  },
  timer: {
    color: "#555",
    marginBottom: 20,
  },
  resend: {
    color: "#001F54",
    fontWeight: "700",
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    width: "90%",
    height: 50,
    backgroundColor: "#001F54",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
