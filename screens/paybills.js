import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from "react-native";
import { MaterialCommunityIcons, Ionicons, FontAwesome5 } from "@expo/vector-icons";

export default function PayBills({ navigation }) {
  const billOptions = [
    { id: 1, name: "Electricity", icon: "lightning-bolt", color: "#FFD700" },
    { id: 2, name: "Mobile Recharge", icon: "cellphone", color: "#4CAF50" },
    { id: 3, name: "DTH", icon: "satellite-uplink", color: "#2196F3" },
    { id: 4, name: "Gas Cylinder", icon: "gas-cylinder", color: "#FF5722" },
    { id: 5, name: "Broadband", icon: "wifi", color: "#9C27B0" },
    { id: 6, name: "Water", icon: "water", color: "#03A9F4" },
    { id: 7, name: "Credit Card", icon: "credit-card", color: "#E91E63" },
    { id: 8, name: "Insurance", icon: "shield-check", color: "#607D8B" },
  ];

  const recentPayments = [
    { id: 1, name: "Jio Prepaid", number: "9876543210", amount: "₹666", date: "12 Dec" },
    { id: 2, name: "BESCOM", number: "1234567890", amount: "₹1,250", date: "10 Dec" },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay Bills</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#6C757D" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for billers (e.g. BESCOM, Jio)"
            placeholderTextColor="#999"
          />
        </View>

        {/* Bill Categories Grid */}
        <Text style={styles.sectionTitle}>Recharge & Pay Bills</Text>
        <View style={styles.gridContainer}>
          {billOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.gridItem}>
              <View style={[styles.iconCircle, { backgroundColor: option.color + "20" }]}>
                <MaterialCommunityIcons name={option.icon} size={28} color={option.color} />
              </View>
              <Text style={styles.gridLabel}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Recent Payments */}
        <Text style={styles.sectionTitle}>Recent Payments</Text>
        {recentPayments.map((payment) => (
          <View key={payment.id} style={styles.paymentCard}>
            <View style={styles.paymentIcon}>
              <MaterialCommunityIcons name="history" size={24} color="#001F3F" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentName}>{payment.name}</Text>
              <Text style={styles.paymentNumber}>{payment.number}</Text>
            </View>
            <View style={styles.paymentAmountContainer}>
              <Text style={styles.paymentAmount}>{payment.amount}</Text>
              <Text style={styles.paymentDate}>{payment.date}</Text>
            </View>
            <TouchableOpacity style={styles.repeatButton}>
              <Text style={styles.repeatButtonText}>Repeat</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Promo Banner */}
        <View style={styles.promoBanner}>
          <View>
            <Text style={styles.promoTitle}>Get 5% Cashback</Text>
            <Text style={styles.promoSubtitle}>On your first electricity bill payment</Text>
          </View>
          <MaterialCommunityIcons name="gift-outline" size={40} color="#FFD700" />
        </View>

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
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F9FA",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#eee",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#001F3F",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#001F3F",
    marginBottom: 15,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 25,
  },
  gridItem: {
    width: "23%",
    alignItems: "center",
    marginBottom: 20,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  gridLabel: {
    fontSize: 12,
    color: "#001F3F",
    textAlign: "center",
    fontWeight: "500",
  },
  paymentCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F4F8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#001F3F",
  },
  paymentNumber: {
    fontSize: 12,
    color: "#6C757D",
  },
  paymentAmountContainer: {
    alignItems: "flex-end",
    marginRight: 12,
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: "700",
    color: "#001F3F",
  },
  paymentDate: {
    fontSize: 10,
    color: "#6C757D",
  },
  repeatButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: "#FFF3E0",
    borderRadius: 6,
  },
  repeatButtonText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#001F3F",
  },
  promoBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#001F3F",
    padding: 20,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 30,
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFD700",
    marginBottom: 4,
  },
  promoSubtitle: {
    fontSize: 12,
    color: "#fff",
  },
});
