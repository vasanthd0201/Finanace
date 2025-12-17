import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";

const DEFAULT_TENURE = 8;

export default function Home({ navigation }) {
  const [user, setUser] = useState(null);
  const [loan, setLoan] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadData = async () => {
        const userData = await AsyncStorage.getItem("@BasicInfoData");
        const loanData = await AsyncStorage.getItem("loanDetails");

        if (userData) setUser(JSON.parse(userData));

        if (loanData) {
          const parsed = JSON.parse(loanData);
          parsed.tenureMonths = parsed.tenureMonths || DEFAULT_TENURE;
          parsed.paidEMIs = Number(parsed.paidEMIs || 0);
          setLoan(parsed);
        }
      };

      loadData();
    }, [])
  );

  if (!loan) {
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#6C757D" }}>No active loan</Text>
      </SafeAreaView>
    );
  }

  /* CALCULATIONS */
  const totalAmount = Number(loan.amount);
  const tenure = Number(loan.tenureMonths);
  const paidEMIs = Number(loan.paidEMIs);

  const emi = Math.ceil(totalAmount / tenure);
  const paidAmount = emi * paidEMIs;
  const remainingAmount = Math.max(totalAmount - paidAmount, 0);

  const progressPercent = Math.min(
    Math.round((paidEMIs / tenure) * 100),
    100
  );

  const nextEmiDate = (() => {
    const d = loan.approvalDate ? new Date(loan.approvalDate) : new Date();
    d.setMonth(d.getMonth() + paidEMIs);
    return d.toDateString();
  })();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.username}>
            {user?.fullName?.split(" ")[0] || "User"} 👋
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: "login" }],
            })
          }
        >
          <Ionicons name="log-out-outline" size={28} />
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 10 }}>
        {/* LOAN SUMMARY */}
        <View style={styles.loanCard}>
          <Text style={styles.cardTitle}>Loan Summary</Text>

          <View style={styles.loanAmountRow}>
            <Text style={styles.loanAmount}>
              ₹{totalAmount.toLocaleString()}
            </Text>

            <View style={styles.tenureBadge}>
              <Text style={styles.tenureText}>{tenure} Months</Text>
              <Text style={styles.approvalText}>
                {loan.approvalDate
                  ? new Date(loan.approvalDate).toLocaleDateString(
                      "en-IN",
                      { day: "2-digit", month: "short", year: "numeric" }
                    )
                  : ""}
              </Text>
            </View>
          </View>

          <Text style={styles.subText}>Total Loan Amount</Text>

          <View style={styles.divider} />

          {/* 🔥 MONTHLY EMI LEFT / RIGHT */}
          <View style={styles.emiRow}>
            <Text style={styles.emiText}>Monthly EMI</Text>
            <Text style={styles.emiAmount}>₹{emi}</Text>
          </View>
        </View>

        {/* LOAN STATISTICS */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Loan Statistics</Text>

          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Total Paid</Text>
              <Text style={styles.statAmount}>
                ₹{paidAmount.toLocaleString()}
              </Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statLabel}>Remaining</Text>
              <Text style={styles.statAmount}>
                ₹{remainingAmount.toLocaleString()}
              </Text>
            </View>
          </View>
        </View>

        {/* REPAYMENT PROGRESS */}
        <View style={styles.progressSection}>
          <View style={styles.progressHeader}>
            <Text style={styles.progressLabel}>Repayment Progress</Text>
            <Text style={styles.progressPercent}>{progressPercent}%</Text>
          </View>

          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${progressPercent}%` },
              ]}
            />
          </View>

          <Text style={styles.progressText}>
            {paidEMIs} of {tenure} EMIs paid
          </Text>
        </View>

        {/* UPCOMING EMI */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upcoming EMI</Text>
          <Text style={styles.sectionText}>Due on: {nextEmiDate}</Text>
          <Text style={styles.sectionAmount}>₹{emi}</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("NextEmiPayment")}
          >
            <Text style={styles.link}>Pay next EMI →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  headerRow: {
    marginVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: { fontSize: 14, color: "#6C757D" },
  username: { fontSize: 24, fontWeight: "700", color: "#001F3F" },

  loanCard: {
    backgroundColor: "#001F3F",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
  },
  cardTitle: { color: "#fff", fontSize: 16 },

  loanAmountRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 6,
  },
  loanAmount: {
    color: "#FFD700",
    fontSize: 32,
    fontWeight: "700",
  },

  tenureBadge: {
    backgroundColor: "rgba(255, 215, 0, 0.25)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 14,
    alignItems: "flex-end",
  },
  tenureText: { color: "#FFD700", fontSize: 13, fontWeight: "700" },
  approvalText: { color: "#fff", fontSize: 11, marginTop: 2 },

  subText: { color: "#fff", fontSize: 12, marginTop: 4 },

  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    marginVertical: 12,
  },

  /* 🔥 EMI ROW */
  emiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  emiText: { color: "#fff", fontSize: 14 },
  emiAmount: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "700",
  },

  statsContainer: { marginBottom: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },

  statsGrid: { flexDirection: "row" },
  statBox: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginRight: 6,
  },
  statLabel: { fontSize: 12, color: "#6C757D" },
  statAmount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#001F3F",
  },

  progressSection: {
    backgroundColor: "#F8F9FA",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  progressLabel: { fontWeight: "600" },
  progressPercent: { fontWeight: "700", color: "#FFD700" },
  progressBar: {
    height: 10,
    backgroundColor: "#E9ECEF",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 6,
  },
  progressFill: { height: "100%", backgroundColor: "#FFD700" },
  progressText: {
    textAlign: "center",
    fontSize: 12,
    color: "#6C757D",
    marginTop: 6,
  },

  section: { marginBottom: 30 },
  sectionText: { color: "#6C757D" },
  sectionAmount: {
    fontSize: 29,
    fontWeight: "700",
    marginVertical: 6,
  },
  link: { color: "#001F3F", fontWeight: "800" },
});
  