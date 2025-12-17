import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function Offers({ navigation }) {
  const [limitApplied, setLimitApplied] = useState(false);
  const [cashbackActivated, setCashbackActivated] = useState(false);

  const [limitLoading, setLimitLoading] = useState(false);
  const [cashbackLoading, setCashbackLoading] = useState(false);

  // 🔹 Increase Limit Apply
  const handleIncreaseLimitApply = async () => {
    if (limitApplied) return;

    setLimitLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLimitApplied(true);

      Alert.alert(
        "Request Submitted 🎉",
        "Your limit increase request up to ₹80,000 has been submitted successfully."
      );
    } catch (error) {
      Alert.alert("Error", "Unable to apply. Try again later.");
    } finally {
      setLimitLoading(false);
    }
  };

  // 🔹 Cashback Offer Activate
  const handleCashbackActivate = async () => {
    if (cashbackActivated) return;

    setCashbackLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCashbackActivated(true);

      Alert.alert(
        "Offer Activated 🎁",
        "5% cashback will be applied on every EMI paid on time."
      );
    } catch (error) {
      Alert.alert("Error", "Unable to activate offer.");
    } finally {
      setCashbackLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Offers</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Available Offers</Text>

      {/* ⭐ Increase Limit Offer */}
      <View style={styles.offerCard}>
        <Text style={styles.offerTitle}>⭐ Increase Limit Offer</Text>
        <Text style={styles.offerDesc}>
          Increase your loan limit instantly up to ₹80,000.
        </Text>

        <TouchableOpacity
          style={[
            styles.applyBtn,
            limitApplied && styles.appliedBtn,
          ]}
          onPress={handleIncreaseLimitApply}
          disabled={limitLoading || limitApplied}
        >
          {limitLoading ? (
            <ActivityIndicator color="#001F3F" />
          ) : (
            <Text style={styles.applyText}>
              {limitApplied ? "Applied ✅" : "Apply Now"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      {/* 🎁 Cashback EMI Offer */}
      <View style={styles.offerCard}>
        <Text style={styles.offerTitle}>🎁 Cashback EMI Offer</Text>
        <Text style={styles.offerDesc}>
          Get 5% cashback on every EMI paid on time.
        </Text>

        <TouchableOpacity
          style={[
            styles.applyBtn,
            cashbackActivated && styles.appliedBtn,
          ]}
          onPress={handleCashbackActivate}
          disabled={cashbackLoading || cashbackActivated}
        >
          {cashbackLoading ? (
            <ActivityIndicator color="#001F3F" />
          ) : (
            <Text style={styles.applyText}>
              {cashbackActivated ? "Activated ✅" : "Activate Offer"}
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Explore</Text>

      <View style={styles.gridContainer}>
        <TouchableOpacity
          style={styles.fullWidthCard}
          onPress={() => navigation.navigate("CreditCardFest")}
        >
          <View>
            <Text style={styles.cardLabel}>CREDIT CARD FEST</Text>
            <Text style={styles.cardTitle}>
              Get Assured Reward worth ₹1000*
            </Text>
            <Text style={{ fontSize: 12, color: "#6C757D", marginTop: 4 }}>
              Grab the Limited-time Offer!
            </Text>
          </View>
          <View style={styles.cardIconContainer}>
            <MaterialCommunityIcons
              name="credit-card-multiple"
              size={50}
              color="#FF6B6B"
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fullWidthCard}
          onPress={() => navigation.navigate("PayBills")}
        >
          <View>
            <Text style={styles.cardLabel}>
              ELECTRICITY, GAS, MOBILE & MORE
            </Text>
            <Text style={styles.cardTitle}>
              Pay bills{"\n"}instantly
            </Text>
          </View>
          <View style={styles.cardIconContainer}>
            <MaterialCommunityIcons name="water" size={50} color="#45B7D1" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fullWidthCard}
          onPress={() => navigation.navigate("InviteEarn")}
        >
          <View>
            <Text style={styles.cardLabel}>INVITE</Text>
            <Text style={styles.cardTitle}>Earn ₹150</Text>
          </View>
          <View style={styles.cardIconContainer}>
            <MaterialCommunityIcons name="magnet" size={50} color="#FF8C42" />
          </View>
        </TouchableOpacity>
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
    padding: 25,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#001F3F",
  },

  offerCard: {
    padding: 16,
    backgroundColor: "#F8F9FA",
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: "#FFD700",
  },

  offerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#001F3F",
  },

  offerDesc: {
    marginVertical: 10,
    color: "#6C757D",
  },

  applyBtn: {
    backgroundColor: "#FFD700",
    padding: 12,
    borderRadius: 10,
  },

  appliedBtn: {
    backgroundColor: "#E0E0E0",
  },

  applyText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#001F3F",
  },

  sectionTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 20,
    color: "#001F3F",
    marginTop: 10,
  },

  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  fullWidthCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    height: 150,
    justifyContent: "space-between",
  },

  cardLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#6C757D",
    textTransform: "uppercase",
    marginBottom: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#001F3F",
  },

  cardIconContainer: {
    alignItems: "flex-end",
  },
});
  