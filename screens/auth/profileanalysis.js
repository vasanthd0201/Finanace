import React, { useEffect } from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function ProfileAnalysis({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("LoanApproved");
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analyzing Your Profile</Text>

      <View style={styles.box}>
        <Text style={styles.line}>Checking Eligibility...</Text>
        <Text style={styles.line}>Reviewing Your Information...</Text>
        <Text style={styles.line}>CIBIL Score Check...</Text>
        <Text style={styles.line}>Finding Best Offers...</Text>

        <ActivityIndicator size="large" color="#001F54" style={{ marginTop: 20 }} />
      </View>

      <Text style={styles.note}>Real-time credit assessment takes 30–60 seconds.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 25 },
  box: { backgroundColor: "#f5f5f5", padding: 25, borderRadius: 12 },
  line: { fontSize: 16, marginBottom: 10, color: "#444" },
  note: { textAlign: "center", marginTop: 20, color: "#777" },
});
