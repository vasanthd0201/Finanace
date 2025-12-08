import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function KycUpload({ navigation }) {
  const [selfie, setSelfie] = useState(null);
  const [pan, setPan] = useState(null);
  const [aadhaarFront, setAadhaarFront] = useState(null);
  const [aadhaarBack, setAadhaarBack] = useState(null);

  const pickImage = async (setter) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.cancelled) setter(result.assets[0].uri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Upload Your KYC Documents</Text>

      <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setSelfie)}>
        <Text>📸 Upload Selfie</Text>
        {selfie && <Image source={{ uri: selfie }} style={styles.preview} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setPan)}>
        <Text>🪪 Upload PAN Card</Text>
        {pan && <Image source={{ uri: pan }} style={styles.preview} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setAadhaarFront)}>
        <Text>🆔 Aadhaar Front</Text>
        {aadhaarFront && <Image source={{ uri: aadhaarFront }} style={styles.preview} />}
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadBox} onPress={() => pickImage(setAadhaarBack)}>
        <Text>🆔 Aadhaar Back</Text>
        {aadhaarBack && <Image source={{ uri: aadhaarBack }} style={styles.preview} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("ProfileAnalysis")}
      >
        <Text style={styles.buttonText}>Submit KYC</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "700", marginBottom: 20 },
  uploadBox: {
    backgroundColor: "#f2f2f2",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
  },
  preview: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#001F54",
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
});
