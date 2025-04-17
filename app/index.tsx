import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
} from "react-native";

export default function Home() {
  const [isInvoiceModalVisible, setIsInvoiceModalVisible] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const PAYPAL_US_LINK = "https://buy.stripe.com/fZe16rfSlglp7hC289";
  const PAYPAL_CANADA_LINK = "https://buy.stripe.com/cN2g1lcG92uzfO89AA";
  const CALENDLY_LINK = "tel:+12267786601";
  const CONTACT_WEBSITE = "https://www.aisharecruitment.com/#contact";

  useEffect(() => {
    const updateScreenSize = () => {
      const { width } = Dimensions.get("window");
      setIsSmallScreen(width < 375);
    };

    updateScreenSize();

    const subscription = Dimensions.addEventListener(
      "change",
      updateScreenSize,
    );

    return () => {
      subscription.remove();
    };
  }, []);

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) => {
      console.error("Failed to open link:", err);
      alert("Unable to open the link. Please try again later.");
    });
  };

  const handleInvoicePayment = (country: "US" | "CA") => {
    const paymentLink = country === "US" ? PAYPAL_US_LINK : PAYPAL_CANADA_LINK;
    setIsInvoiceModalVisible(false);
    openLink(paymentLink);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
    >
      <LinearGradient
        colors={["#ffffff", "#dbdbdb", "#b0b0b0"]}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.contentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.welcomeText}>Welcome back</Text>
              <Text style={styles.descriptionText}>
                Aisha Recruitments's secure client portal 
              </Text>
            </View>

            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="mail-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Email"
                  placeholderTextColor="#555"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.inputContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color="#888"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Password"
                  placeholderTextColor="#555"
                  secureTextEntry
                />
              </View>

              <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginButtonText}>Sign in</Text>
              </TouchableOpacity>

              <View style={styles.dividerContainer}>
                <View style={styles.divider} />
                <Text style={styles.dividerText}>Quick Actions</Text>
                <View style={styles.divider} />
              </View>

              <View
                style={[
                  styles.quickActionsContainer,
                  isSmallScreen
                    ? styles.quickActionsVertical
                    : styles.quickActionsHorizontal,
                ]}
              >
                <TouchableOpacity
                  style={[
                    styles.quickActionButton,
                    isSmallScreen
                      ? styles.quickActionButtonVertical
                      : styles.quickActionButtonHorizontal,
                  ]}
                  onPress={() => setIsInvoiceModalVisible(true)}
                >
                  <Ionicons
                    name="card-outline"
                    size={20}
                    color="white"
                    style={styles.quickActionIcon}
                  />
                  <Text style={styles.quickActionText}>Pay Invoices</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.quickActionButton,
                    isSmallScreen
                      ? styles.quickActionButtonVertical
                      : styles.quickActionButtonHorizontal,
                  ]}
                  onPress={() => openLink(CALENDLY_LINK)}
                >
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    color="white"
                    style={styles.quickActionIcon}
                  />
                  <Text style={styles.quickActionText}>Book Meeting</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.quickActionButton,
                    isSmallScreen
                      ? styles.quickActionButtonVertical
                      : styles.quickActionButtonHorizontal,
                  ]}
                  onPress={() => openLink(CONTACT_WEBSITE)}
                >
                  <Ionicons
                    name="chatbubble-outline"
                    size={20}
                    color="white"
                    style={styles.quickActionIcon}
                  />
                  <Text style={styles.quickActionText}>Contact Us</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>

      <Modal
        transparent={true}
        visible={isInvoiceModalVisible}
        animationType="fade"
        onRequestClose={() => setIsInvoiceModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <LinearGradient
              colors={["#050A24", "#0F3A2F"]}
              style={styles.modalGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsInvoiceModalVisible(false)}
                >
                  <Ionicons
                    name="close"
                    size={16}
                    color="rgba(255,255,255,0.8)"
                  />
                </TouchableOpacity>
              </View>

              <View style={styles.modalDivider} />

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleInvoicePayment("US")}
              >
                <Image
                  source={require("../assets/images/us.png")}
                  style={styles.flagIcon}
                  resizeMode="contain"
                />
                <Text style={styles.modalButtonText}>United States</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => handleInvoicePayment("CA")}
              >
                <Image
                  source={require("../assets/images/ca.png")}
                  style={styles.flagIcon}
                  resizeMode="contain"
                />
                <Text style={styles.modalButtonText}>Canada</Text>
              </TouchableOpacity>
            </LinearGradient>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050A24",
  },
  scrollContent: {
    flexGrow: 1,
  },
  gradient: {
    flex: 1,
    minHeight: "100%",
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 30,
    paddingVertical: 40,
    width: "100%",
    maxWidth: 500,
    alignSelf: "center",
  },
  headerContainer: {
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: "600",
    color: "black",
    marginBottom: 16,
  },
  descriptionText: {
    fontSize: 16,
    color: "rgba(20, 20, 20, 0.8)",
    lineHeight: 24,
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
  },
  inputIcon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#333",
  },
  signupText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    marginVertical: 16,
    textAlign: "center",
  },
  signupLink: {
    color: "white",
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: "white",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  loginButtonText: {
    color: "#050A24",
    fontSize: 16,
    fontWeight: "600",
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.72)",
  },
  paypalButton: {
    backgroundColor: "#323232",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  paypalButtonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  paypalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 24,
  },
  dividerText: {
    color: "rgb(90, 90, 90)",
    marginHorizontal: 10,
    fontSize: 14,
  },
  quickActionButton: {
    flex: 1,
    backgroundColor: "rgb(39, 39, 39)",

    borderRadius: 8,
    alignItems: "center",
  },

  quickActionsContainer: {
    width: "100%",
  },
  quickActionsHorizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  quickActionsVertical: {
    flexDirection: "column",
  },
  quickActionButtonHorizontal: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "rgba(39, 39, 39, 0.41)",
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: "center",
  },
  quickActionButtonVertical: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(39, 39, 39, 0.41)",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginVertical: 8,
  },
  quickActionIcon: {
    marginRight: 10,
    marginBottom: 8,
  },
  quickActionText: {
    color: "rgb(0, 0, 0)",
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  closeButton: {
    padding: 4,
  },
  modalDivider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginBottom: 15,
  },

  modalButtonIcon: {
    marginRight: 12,
  },
  modalButtonText: {
    fontSize: 16,
    color: "white",
  },
  modalCancelButton: {
    width: "100%",
    paddingVertical: 15,
    backgroundColor: "transparent",
    borderRadius: 8,
    alignItems: "center",
  },
  modalCancelButtonText: {
    fontSize: 16,
    color: "red",
  },
  modalGradient: {
    width: "100%",
    borderRadius: 12,
    overflow: "hidden",
  },
  modalContainer: {
    width: "85%",
    maxWidth: 350,
    borderRadius: 12,
    overflow: "hidden",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.03)",
  },
  modalButtonPressed: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  flagIcon: {
    height: 24,
    width: 24,
    marginRight: 12,
  },
});
