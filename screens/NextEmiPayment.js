import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";

export default function NextEmiPayment({ navigation }) {
  const [loan, setLoan] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  /* LOAD LOAN */
  useEffect(() => {
    const loadLoan = async () => {
      const data = await AsyncStorage.getItem("loanDetails");
      if (data) {
        const parsed = JSON.parse(data);
        parsed.paidEMIs = Number(parsed.paidEMIs || 0);
        parsed.tenureMonths = Number(parsed.tenureMonths || 8);
        setLoan(parsed);
      }
    };
    loadLoan();
  }, []);

  if (!loan) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>No EMI data available</Text>
      </SafeAreaView>
    );
  }

  /* CALCULATIONS */
  const totalAmount = Number(loan.amount);
  const tenure = Number(loan.tenureMonths);
  const paidEMIs = Number(loan.paidEMIs);
  const emiAmount = Math.ceil(totalAmount / tenure);

  const nextEmiDate = (() => {
    const d = loan.approvalDate
      ? new Date(loan.approvalDate)
      : new Date();
    d.setMonth(d.getMonth() + paidEMIs);
    return d.toDateString();
  })();

  /* PAY EMI */
  const handlePayEmi = async () => {
    if (!selectedMethod) {
      Alert.alert("Select Payment Method", "Please choose a payment option");
      return;
    }

    if (paidEMIs >= tenure) {
      Alert.alert("Loan Completed", "All EMIs are already paid");
      return;
    }

    try {
      const updatedLoan = {
        ...loan,
        paidEMIs: paidEMIs + 1,
      };

      await AsyncStorage.setItem(
        "loanDetails",
        JSON.stringify(updatedLoan)
      );

      const receiptData = {
        amount: emiAmount,
        emiNumber: paidEMIs + 1,
        method: selectedMethod,
        date: new Date().toLocaleString(),
        loanAmount: totalAmount,
        status: "SUCCESS",
      };

      setReceipt(receiptData);
      setShowReceipt(true);
    } catch {
      Alert.alert("Payment Failed", "Please try again");
    }
  };

  /* DOWNLOAD PDF */
  const downloadReceiptPDF = async () => {
    const html = `
      <html>
        <body style="font-family: Arial; padding: 24px;">
          <h2>EMI Payment Receipt</h2>
          <hr/>
          <p><b>Loan Amount:</b> ₹${receipt.loanAmount}</p>
          <p><b>EMI Amount:</b> ₹${receipt.amount}</p>
          <p><b>EMI Number:</b> ${receipt.emiNumber}</p>
          <p><b>Payment Method:</b> ${receipt.method}</p>
          <p><b>Date:</b> ${receipt.date}</p>
          <p><b>Status:</b> ${receipt.status}</p>
        </body>
      </html>
    `;

    const file = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(file.uri);
  };

  /* PAYMENT OPTION */
  const PaymentOption = ({ icon, label, method }) => (
    <TouchableOpacity
      style={[
        styles.paymentCard,
        selectedMethod === method && styles.activePaymentCard,
      ]}
      onPress={() => setSelectedMethod(method)}
    >
      <View style={styles.paymentLeft}>
        {icon}
        <Text style={styles.paymentLabel}>{label}</Text>
      </View>

      {selectedMethod === method && (
        <Ionicons name="checkmark-circle" size={22} color="#28A745" />
      )}
    </TouchableOpacity>
  );

  /* ================= RECEIPT SCREEN ================= */
  if (showReceipt && receipt) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
        <View style={styles.receiptContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#28A745" />
          <Text style={styles.receiptTitle}>Payment Successful</Text>

          <View style={styles.receiptCard}>
            <Text>EMI Amount: ₹{receipt.amount}</Text>
            <Text>EMI Number: {receipt.emiNumber}</Text>
            <Text>Payment Method: {receipt.method}</Text>
            <Text>Date: {receipt.date}</Text>
            <Text style={styles.successText}>Status: SUCCESS</Text>
          </View>

          <TouchableOpacity
            style={styles.payButton}
            onPress={downloadReceiptPDF}
          >
            <Text style={styles.payText}>Download Receipt (PDF)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.payButton, { marginTop: 10 }]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.payText}>Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /* ================= MAIN EMI PAYMENT SCREEN ================= */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Pay Next EMI</Text>
      </View>

      {/* EMI DETAILS (RESTORED ✅) */}
      <View style={styles.card}>
        <Text style={styles.label}>Next EMI Amount</Text>
        <Text style={styles.amount}>₹{emiAmount}</Text>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.text}>EMI Number</Text>
          <Text style={styles.bold}>
            {paidEMIs + 1} / {tenure}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Due Date</Text>
          <Text style={styles.bold}>{nextEmiDate}</Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.text}>Loan Amount</Text>
          <Text style={styles.bold}>
            ₹{totalAmount.toLocaleString()}
          </Text>
        </View>
      </View>

      {/* PAYMENT METHODS */}
      <View style={styles.paymentBox}>
        <Text style={styles.paymentTitle}>Choose Payment Method</Text>

        <PaymentOption
          method="UPI"
          label="UPI"
          icon={<MaterialCommunityIcons name="qrcode-scan" size={24} />}
        />
        <PaymentOption
          method="Debit Card"
          label="Debit Card"
          icon={<MaterialCommunityIcons name="credit-card-outline" size={24} />}
        />
        <PaymentOption
          method="Credit Card"
          label="Credit Card"
          icon={<MaterialCommunityIcons name="credit-card" size={24} />}
        />
      </View>

      {/* PAY BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.payButton,
            !selectedMethod && { backgroundColor: "#ADB5BD" },
          ]}
          disabled={!selectedMethod}
          onPress={handlePayEmi}
        >
          <Text style={styles.payText}>Pay EMI ₹{emiAmount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerTitle: {                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 12,
    color: "#001F3F",
  },

  card: {
    backgroundColor: "#F8F9FA",
    margin: 16,
    padding: 20,
    borderRadius: 16,
  },

  label: { fontSize: 14, color: "#6C757D" },
  amount: { fontSize: 32, fontWeight: "700", color: "#001F3F" },

  divider: {
    height: 1,
    backgroundColor: "#E9ECEF",
    marginVertical: 12,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 6,
  },
  text: { color: "#6C757D" },
  bold: { fontWeight: "700", color: "#001F3F" },

  paymentBox: { paddingHorizontal: 16 },
  paymentTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12 },

  paymentCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F8F9FA",
    padding: 14,
    borderRadius: 12,
    marginBottom: 10,
  },

  activePaymentCard: {
    borderWidth: 1,
    borderColor: "#28A745",
    backgroundColor: "#E8F5E9",
  },

  paymentLeft: { flexDirection: "row", alignItems: "center" },
  paymentLabel: { marginLeft: 12, fontWeight: "600" },

  footer: { marginTop: "auto", padding: 16 },
  payButton: {
    backgroundColor: "#001F3F",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  payText: { color: "#fff", fontWeight: "700" },

  receiptContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  receiptTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 12,
  },
  receiptCard: {
    backgroundColor: "#F8F9FA",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    marginBottom: 20,
  },
  successText: {
    fontWeight: "700",
    color: "#28A745",
    marginTop: 8,
  },
});
