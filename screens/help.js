import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Linking,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Help({ navigation }) {
  const [activeTab, setActiveTab] = useState("faq");
  const [expandedFaq, setExpandedFaq] = useState(null);
  const [user, setUser] = useState(null);

  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const loadUser = async () => {
      const data = await AsyncStorage.getItem("@BasicInfoData");
      if (data) setUser(JSON.parse(data));
    };
    loadUser();
  }, []);

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure?", [
      { text: "Cancel" },
      {
        text: "Logout",
        onPress: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: "login" }],
          }),
      },
    ]);
  };

  const faqs = [
    { id: 1, question: "How do I apply for a loan?", answer: "To apply, go to the Home screen and tap on Apply Loan." },
    { id: 2, question: "What documents are required?", answer: "PAN card, Aadhaar card, and bank details." },
    { id: 3, question: "How long does approval take?", answer: "Usually 24–48 hours." },
    { id: 4, question: "What is EMI?", answer: "EMI is the fixed monthly amount you pay towards your loan." },
    { id: 5, question: "Can I prepay my loan?", answer: "Yes, you can prepay anytime." },
    { id: 6, question: "Is my data safe?", answer: "Yes, your data is encrypted and secure." },
  ];

  const supportChannels = [
    {
      id: 1,
      name: "Phone Support",
      value: "+91-9876543210",
      icon: "call",
      action: () => Linking.openURL("tel:+919876543210"),
    },
    {
      id: 2,
      name: "Email Support",
      value: "support@instaloan.com",
      icon: "mail",
      action: () => Linking.openURL("mailto:support@instaloan.com"),
    },
    {
      id: 3,
      name: "Live Chat",
      value: "Available 9 AM - 9 PM",
      icon: "chat",
      action: () => Alert.alert("Chat", "Live chat coming soon!"),
    },
    {
      id: 4,
      name: "WhatsApp",
      value: "+91-9876543210",
      icon: "help",
      action: () => Linking.openURL("https://wa.me/919876543210"),
    },
  ];

  const toggleFaq = (id) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  const handleContactSubmit = () => {
    if (
      !contactForm.name ||
      !contactForm.email ||
      !contactForm.subject ||
      !contactForm.message
    ) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    Alert.alert("Success", "Your message has been sent.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* ===== HEADER (SAME AS LOANS.JS) ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#001F3F" />
        </TouchableOpacity>

        <View style={{ marginLeft: 12 }}>
          <Text style={styles.headerTitle}>Help & Support</Text>
          <Text style={styles.headerSubTitle}>
            We are here to help you
          </Text>
        </View>
        </View>

      {/* ===== TABS ===== */}
      <View style={styles.tabContainer}>
        {["faq", "contact", "channels"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.activeTab]}
            onPress={() => setActiveTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText,
              ]}
            >
              {tab === "faq"
                ? "FAQ"
                : tab === "contact"
                ? "Contact Us"
                : "Support"}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ===== CONTENT ===== */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* FAQ */}
        {activeTab === "faq" && (
          <View style={styles.faqContainer}>
            <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>

            {faqs.map((faq) => (
              <TouchableOpacity
                key={faq.id}
                style={styles.faqItem}
                onPress={() => toggleFaq(faq.id)}
              >
                <View style={styles.faqHeader}>
                  <Text style={styles.faqQuestion}>{faq.question}</Text>
                  <MaterialIcons
                    name={
                      expandedFaq === faq.id
                        ? "expand-less"
                        : "expand-more"
                    }
                    size={24}
                    color="#FFD700"
                  />
                </View>

                {expandedFaq === faq.id && (
                  <Text style={styles.faqAnswer}>{faq.answer}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* CONTACT */}
        {activeTab === "contact" && (
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
          >
            <View style={styles.contactContainer}>
              <Text style={styles.sectionTitle}>Send us a Message</Text>

              <TextInput
                style={styles.input}
                placeholder="Your Name"
                value={contactForm.name}
                onChangeText={(t) =>
                  setContactForm({ ...contactForm, name: t })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Your Email"
                value={contactForm.email}
                onChangeText={(t) =>
                  setContactForm({ ...contactForm, email: t })
                }
              />

              <TextInput
                style={styles.input}
                placeholder="Subject"
                value={contactForm.subject}
                onChangeText={(t) =>
                  setContactForm({ ...contactForm, subject: t })
                }
              />

              <TextInput
                style={[styles.input, styles.messageInput]}
                placeholder="Message"
                multiline
                numberOfLines={5}
                value={contactForm.message}
                onChangeText={(t) =>
                  setContactForm({ ...contactForm, message: t })
                }
              />

              <TouchableOpacity
                style={styles.submitButton}
                onPress={handleContactSubmit}
              >
                <Text style={styles.submitButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        )}

        {/* SUPPORT */}
        {activeTab === "channels" && (
          <View style={styles.channelsContainer}>
            <Text style={styles.sectionTitle}>Get in Touch</Text>

            {supportChannels.map((channel) => (
              <TouchableOpacity
                key={channel.id}
                style={styles.channelCard}
                onPress={channel.action}
              >
                <View style={styles.channelIconContainer}>
                  <MaterialIcons name={channel.icon} size={28} color="#FFD700" />
                </View>

                <View style={styles.channelInfo}>
                  <Text style={styles.channelName}>{channel.name}</Text>
                  <Text style={styles.channelValue}>{channel.value}</Text>
                </View>

                <MaterialIcons name="arrow-forward" size={20} color="#001F3F" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* INFO */}
        <View style={styles.infoSection}>
          <View style={styles.infoCard}>
            <MaterialIcons name="schedule" size={32} color="#FFD700" />
            <Text style={styles.infoTitle}>Business Hours</Text>
            <Text style={styles.infoText}>Mon–Fri: 9 AM – 9 PM</Text>
            <Text style={styles.infoText}>Sat–Sun: 10 AM – 8 PM</Text>
          </View>

          <View style={styles.infoCard}>
            <MaterialIcons name="security" size={32} color="#FFD700" />
            <Text style={styles.infoTitle}>Secure & Encrypted</Text>
            <Text style={styles.infoText}>
              Your data is fully protected & private.
            </Text>
          </View>
        </View>

        {/* FOOTER */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>© 2024 InstaLoan Pro</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ===== STYLES ===== */
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
    borderBottomColor: "#eee",
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

  content: { paddingHorizontal: 10 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
    color: "#001F3F",
  },

  faqContainer: { paddingVertical: 20 },
  faqItem: {
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
  },
  faqHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: "600",
    color: "#001F3F",
    flex: 1,
  },
  faqAnswer: {
    fontSize: 13,
    color: "#666",
    marginTop: 10,
  },

  contactContainer: { paddingVertical: 20 },
  input: {
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: "#001F3F",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },

  channelsContainer: { paddingVertical: 20 },
  channelCard: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  channelIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  channelInfo: { flex: 1 },
  channelName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#001F3F",
  },
  channelValue: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },

  infoSection: { paddingVertical: 20 },
  infoCard: {
    backgroundColor: "#f0f4f8",
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: "center",
    borderLeftWidth: 4,
    borderLeftColor: "#FFD700",
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 10,
    color: "#001F3F",
  },
  infoText: {
    fontSize: 12,
    color: "#666",
    marginTop: 5,
    textAlign: "center",
  },

  footer: {
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
  },
});
