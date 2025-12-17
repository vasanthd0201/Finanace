import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SuccessScreen({ navigation }) {
  useEffect(() => {
    const setApprovalDate = async () => {
      try {
        const loanData = await AsyncStorage.getItem("loanDetails");
        if (loanData) {
          const parsedLoan = JSON.parse(loanData);
          if (!parsedLoan.approvalDate) {
            parsedLoan.approvalDate = new Date().toDateString();
            // Also ensure paidEMIs is initialized
            if (parsedLoan.paidEMIs === undefined) parsedLoan.paidEMIs = 0;
            
            await AsyncStorage.setItem("loanDetails", JSON.stringify(parsedLoan));
          }
        }
      } catch (e) {
        console.log("Error setting approval date", e);
      }
    };
    setApprovalDate();

    const timer = setTimeout(() => {
      navigation.navigate("ThankYou");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Text style={styles.bigCheck}>✓</Text>
          <Text style={styles.title}>Money is on its way!</Text>
          <Text style={styles.sub}>
            Your loan has been disbursed. Funds will reach your account shortly.
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
    padding: 25,
  },
  bigCheck: {
    fontSize: 70,
    color: "green",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
  },
  sub: {
    textAlign: "center",
    color: "#777",
    marginVertical: 20,
    fontSize: 16,
    lineHeight: 22,
  },
});
