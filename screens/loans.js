import { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

const EMI_MONTHS = 8;

const formatDate = (date) =>
  date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export default function Loans({ navigation }) {
  const [emiList, setEmiList] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [loan, setLoan] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const loadLoan = async () => {
        const data = await AsyncStorage.getItem("loanDetails");
        if (!data) return;

        const parsedLoan = JSON.parse(data);
        setLoan(parsedLoan);

        const amount = Number(parsedLoan.amount);
        const paidEMIs = Number(parsedLoan.paidEMIs) || 0;
        const emiAmount = Math.ceil(amount / EMI_MONTHS);

        const startDate = parsedLoan.approvalDate
          ? new Date(parsedLoan.approvalDate)
          : new Date();

        const list = Array.from({ length: EMI_MONTHS }, (_, index) => {
          const due = new Date(startDate);
          due.setMonth(startDate.getMonth() + index);

          return {
            id: index + 1,
            month: index + 1,
            emi: emiAmount,
            dueDate: formatDate(due),
            status: index < paidEMIs ? "paid" : "active",
          };
        });

        setEmiList(list);
      };

      loadLoan();
    }, [])
  );

  const filtered = emiList.filter((e) =>
    activeTab === "all" ? true : e.status === activeTab
  );

  /* ===== DOWNLOAD STATEMENT ===== */
  const downloadStatement = async () => {
    if (!loan) {
      Alert.alert("No Data", "Loan details not available");
      return;
    }

    const html = `
      <html>
        <body style="font-family: Arial; padding: 24px;">
          <h2>Loan Statement</h2>
          <hr/>
          <p><b>Loan Amount:</b> ₹${loan.amount}</p>
          <p><b>Tenure:</b> ${EMI_MONTHS} Months</p>
          <p><b>Approval Date:</b> ${loan.approvalDate || "-"}</p>
          <p><b>Paid EMIs:</b> ${loan.paidEMIs || 0}</p>
          <br/>
          <h3>EMI Schedule</h3>
          ${emiList
            .map(
              (e) => `
              <p>
                Month ${e.month} | ₹${e.emi} | ${e.dueDate} | ${e.status.toUpperCase()}
              </p>`
            )
            .join("")}
        </body>
      </html>
    `;

    const file = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(file.uri);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.headerTitle}>EMI Repayment</Text>
          <Text style={styles.headerSubTitle}>8-Month Schedule</Text>
        </View>
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        {["all", "active", "paid"].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.tab, activeTab === t && styles.activeTab]}
            onPress={() => setActiveTab(t)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === t && styles.activeTabText,
              ]}
            >
              {t.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <ScrollView
        style={styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {filtered.map((e) => (
          <View
            key={e.id}
            style={[
              styles.emiCard,
              e.status === "paid" && styles.paidCard,
            ]}
          >
            <View>
              <Text style={styles.monthText}>Month {e.month} EMI</Text>
              <Text style={styles.dateText}>Due: {e.dueDate}</Text>
              <Text style={styles.amountText}>₹{e.emi}</Text>
            </View>

            <Text
              style={[
                styles.statusText,
                e.status === "paid"
                  ? styles.paidText
                  : styles.activeText,
              ]}
            >
              {e.status.toUpperCase()}
            </Text>
          </View>
        ))}

        {/* DOWNLOAD STATEMENT BUTTON */}
        <TouchableOpacity
          style={styles.downloadBtn}
          onPress={downloadStatement}
        >
          <Ionicons
            name="download-outline"
            size={20}
            color="#fff"
            style={{ marginRight: 8 }}
          />
          <Text style={styles.downloadText}>Download Statement</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#001F3F",
  },
  headerSubTitle: {
    fontSize: 13,
    color: "#6C757D",
    marginTop: 2,
  },

  tabContainer: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 3,
    borderBottomColor: "transparent",
  },
  activeTab: {
    borderBottomColor: "#FFD700",
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6C757D",
  },
  activeTabText: {
    color: "#001F3F",
  },

  listContainer: {
    padding: 16,
  },

  emiCard: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paidCard: {
    backgroundColor: "#E8F5E9",
    borderColor: "#28A745",
  },

  monthText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#001F3F",
  },
  dateText: {
    fontSize: 12,
    color: "#6C757D",
    marginTop: 4,
  },
  amountText: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 6,
  },

  statusText: {
    fontSize: 14,
    fontWeight: "700",
  },
  paidText: {
    color: "#28A745",
  },
  activeText: {
    color: "#DC3545",
  },

  downloadBtn: {
    marginTop: 20,
    backgroundColor: "#001F3F",
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop:10,
    marginBottom:25,
  },
  downloadText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
    
  },
});
