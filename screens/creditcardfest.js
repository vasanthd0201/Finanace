import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function CreditCardFest({ navigation }) {
  const cards = [
    {
      id: 1,
      name: "Axis Bank My Zone",
      image: "https://www.axisbank.com/images/default-source/revamp_new/cards/credit-cards/my-zone-credit-card.jpg",
      benefits: ["Buy 1 Get 1 on Movies", "Flat ₹600 off on Ajio", "40% off on Swiggy"],
      color:"#f5d108ff",
    },
    {
      id: 2,
      name: "HDFC Millennia",
      image: "https://www.hdfcbank.com/content/api/contentstream-id/723fb80a-2dde-42a3-9793-7ae1be57c87f/02301435-0063-493d-991d-25014552ee8e/Personal/Pay/Cards/Credit%20Card/Credit%20Card%20Landing%20Page/Credit%20Cards/Millennia%20Credit%20Card/Millennia-Credit-Card-1.png",
      benefits: ["5% Cashback on Amazon, Flipkart", "1% Cashback on offline spends", "8 Complimentary Lounge Access"],
      color: "#f5d108ff",
    },
    {
      id: 3,
      name: "SBI SimplyCLICK",
      image: "https://www.sbicard.com/sbi-card-en/assets/media/images/personal/credit-cards/shopping/simplyclick-sbi-card-front.png",
      benefits: ["10X Reward Points on Online Spends", "Amazon Gift Card worth ₹500", "Annual Fee Reversal on ₹1L spend"],
      color: "#f5d108ff",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Credit Card Fest</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Get Assured Reward worth ₹1000*</Text>
          <Text style={styles.bannerSubtitle}>Limited Time Offer!</Text>
        </View>

        <Text style={styles.sectionTitle}>Top Picks For You</Text>

        {cards.map((card) => (
          <View key={card.id} style={styles.cardContainer}>
            <View style={[styles.cardHeader, { backgroundColor: card.color }]}>
              <Text style={styles.cardName}>{card.name}</Text>
              <MaterialCommunityIcons name="credit-card-chip" size={30} color="#001F3F" />
            </View>
            
            <View style={styles.cardBody}>
              <View style={styles.benefitsList}>
                {card.benefits.map((benefit, index) => (
                  <View key={index} style={styles.benefitItem}>
                    <Ionicons name="checkmark-circle" size={16} color="#28A745" />
                    <Text style={styles.benefitText}>{benefit}</Text>
                  </View>
                ))}
              </View>

              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyButtonText}>Apply Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
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
  benefitsList: {
    marginBottom: 15,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  benefitText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#555",
  },
  applyButton: {
    backgroundColor: "#001F3F",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
