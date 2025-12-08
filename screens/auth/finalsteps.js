import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function FinalSteps({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Final Steps to Funding</Text>

      <View style={styles.stepBox}>
        <Text style={styles.num}>1</Text>
        <Text style={styles.desc}>Review Loan Summary</Text>
      </View>

      <View style={styles.stepBox}>
        <Text style={styles.num}>2</Text>
        <Text style={styles.desc}>Setup e-Mandate (Auto-Pay)</Text>
      </View>

      <View style={styles.stepBox}>
        <Text style={styles.num}>3</Text>
        <Text style={styles.desc}>Sign Digital Agreement</Text>
      </View>

      <View style={styles.stepBox}>
        <Text style={styles.num}>4</Text>
        <Text style={styles.desc}>Confirm Disbursal</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SuccessScreen")}
      >
        <Text style={styles.buttonText}>Complete Process</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 24, fontWeight: "700", marginBottom: 25 ,marginTop:20  },
  stepBox: {
    flexDirection: "row",
    marginBottom: 18,
    marginTop: 10,
    alignItems: "center",
  },
  num: {
    fontSize: 20,
    backgroundColor: "#001F54",
    color: "#fff",
    width: 35,
    height: 35,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
    marginRight: 15,
  },
  desc: { fontSize: 18, fontWeight: "500" },
  button: {
    backgroundColor: "#001F54",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "700" },
});
