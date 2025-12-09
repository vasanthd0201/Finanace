import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfessionalInfo({ navigation }) {
  const [employment, setEmployment] = useState("");
  const [company, setCompany] = useState("");
  const [income, setIncome] = useState("");
  const [salariedDocuments, setSalariedDocuments] = useState([]);
  const [selfEmployedDocuments, setSelfEmployedDocuments] = useState([]);

  const pickDocument = async () => {
    try {
      let allowedTypes =
        employment === "salaried"
          ? ["application/pdf", "image/*"]
          : [
              "application/pdf",
              "image/*",
              "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            ];

      const result = await DocumentPicker.getDocumentAsync({
        type: allowedTypes,
      });

      if (!result.canceled) {
        if (employment === "salaried") {
          setSalariedDocuments([...salariedDocuments, result.assets[0]]);
        } else {
          setSelfEmployedDocuments([...selfEmployedDocuments, result.assets[0]]);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const removeDocument = (index) => {
    if (employment === "salaried") {
      setSalariedDocuments(salariedDocuments.filter((_, i) => i !== index));
    } else {
      setSelfEmployedDocuments(selfEmployedDocuments.filter((_, i) => i !== index));
    }
  };

  const proceed = () => {
    if (!employment || !income) {
      alert("Please fill required fields.");
      return;
    }

    const docs = employment === "salaried" ? salariedDocuments : selfEmployedDocuments;

    if (docs.length === 0) {
      alert("Please upload at least one document.");
      return;
    }

    navigation.navigate("KycVerification");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView
            contentContainerStyle={styles.container}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.step}>Step 2 of 4</Text>
            <Text style={styles.title}>Professional Details</Text>

            <Text style={styles.label}>Employment Type</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={[styles.option, employment === "salaried" && styles.selected]}
                onPress={() => setEmployment("salaried")}
              >
                <Text style={[styles.optionText, employment === "salaried" && styles.optionTextSelected]}>
                  Salaried
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.option, employment === "self" && styles.selected]}
                onPress={() => setEmployment("self")}
              >
                <Text style={[styles.optionText, employment === "self" && styles.optionTextSelected]}>
                  Self-Employed
                </Text>
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

            {employment && (
              <View style={styles.documentSection}>
                <Text style={styles.label}>Upload Documents</Text>

                <Text style={styles.documentHint}>
                  {employment === "salaried"
                    ? "Upload salary slips and/or bank statements (PDF or Image)"
                    : "Upload ITR, business documents, GST certificates (PDF, Image, or Excel)"}
                </Text>

                <TouchableOpacity style={styles.documentButton} onPress={pickDocument}>
                  <Text style={styles.documentButtonText}>+ Add Document</Text>
                </TouchableOpacity>

                {(employment === "salaried"
                  ? salariedDocuments
                  : selfEmployedDocuments
                ).map((doc, index) => (
                  <View key={index} style={styles.documentItem}>
                    <Text style={styles.documentName} numberOfLines={1}>
                      {doc.name}
                    </Text>
                    <TouchableOpacity onPress={() => removeDocument(index)}>
                      <Text style={styles.removeText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                ))}

                {(employment === "salaried"
                  ? salariedDocuments.length
                  : selfEmployedDocuments.length) > 0 && (
                  <Text style={styles.documentCount}>
                    {(employment === "salaried"
                      ? salariedDocuments.length
                      : selfEmployedDocuments.length)}{" "}
                    document selected
                  </Text>
                )}
              </View>
            )}

            <TouchableOpacity style={styles.button} onPress={proceed}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </ScrollView>
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
    flexGrow: 1,
    padding: 25,
    paddingBottom: 80,
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
    fontWeight: "600",
  },
  optionTextSelected: {
    color: "#fff",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 15,
  },
  documentSection: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  documentHint: {
    fontSize: 13,
    color: "#666",
    marginBottom: 15,
    fontStyle: "italic",
  },
  documentButton: {
    width: "100%",
    height: 50,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#001F54",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  documentButtonText: {
    color: "#001F54",
    fontSize: 16,
    fontWeight: "600",
  },
  documentItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#001F54",
  },
  documentName: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  removeText: {
    color: "#e74c3c",
    fontSize: 13,
    fontWeight: "600",
  },
  documentCount: {
    fontSize: 12,
    color: "#27ae60",
    fontWeight: "500",
    marginTop: 5,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#001F54",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
