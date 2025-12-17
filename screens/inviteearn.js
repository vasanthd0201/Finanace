import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function InviteEarn({ navigation }) {
  const referralSteps = [
    {
      id: 1,
      title: "Invite your friends",
      description: "Share your unique referral link with friends and family.",
      icon: "share-variant",
      color: "#f5d108ff",
    },
    {
      id: 2,
      title: "They sign up",
      description: "Your friends sign up using your link and complete KYC.",
      icon: "account-plus",
      color: "#f5d108ff",
    },
    {
      id: 3,
      title: "You earn rewards",
      description: "Get ₹150 for every successful referral directly in your wallet.",
      icon: "gift",
      color: "#f5d108ff",
    },
  ];

  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'Join Finance App and earn rewards! Use my referral code: ABC1234',
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Invite & Earn</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Refer & Earn ₹150</Text>
          <Text style={styles.bannerSubtitle}>For every friend who joins!</Text>
        </View>

        <Text style={styles.sectionTitle}>How it works</Text>

        {referralSteps.map((step) => (
          <View key={step.id} style={styles.cardContainer}>
            <View style={[styles.cardHeader, { backgroundColor: step.color }]}>
              <Text style={styles.cardName}>{step.title}</Text>
              <MaterialCommunityIcons name={step.icon} size={30} color="#001F3F" />
            </View>
            
            <View style={styles.cardBody}>
              <Text style={styles.descriptionText}>{step.description}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity style={styles.applyButton} onPress={onShare}>
            <Text style={styles.applyButtonText}>Invite Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    marginTop: 20,
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#001F3F",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  banner: {
    backgroundColor: "#001F3F",
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    alignItems: "center",
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFD700",
    textAlign: "center",
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#001F3F",
    marginBottom: 15,
  },
  cardContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#eee",
  },
  cardHeader: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
  },
  cardBody: {
    padding: 15,
  },
  descriptionText: {
    fontSize: 14,
    color: "#555",
    lineHeight: 20,
  },
  applyButton: {
    backgroundColor: "#001F3F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 30,
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
