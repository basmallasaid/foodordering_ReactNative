import React, { useState } from "react";
import {
  View, Text, TextInput, TouchableOpacity, Alert, Image, Dimensions, ScrollView,
  KeyboardAvoidingView, Platform, ActivityIndicator, StatusBar, StyleSheet, Linking
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

import { signIn } from "../../services/authService";
import { mapFirebaseError } from "../../utils/errorMessages";

const { width } = Dimensions.get("window");

export default function LoginScreen({ navigation }) {
  const socialLinks = [
    {
      icon: "logo-google",
      url: "https://google.com",
    },
    {
      icon: "logo-apple",
      url: "https://apple.com",
    },
    {
      icon: "logo-facebook",
      url: "https://facebook.com",
    },
  ];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [secure, setSecure] = useState(true);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      await signIn(email, password);
    } catch (error) {
      Alert.alert("Login Failed", mapFirebaseError(error.code));
    } finally {
      setLoading(false);
    }
  };


  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />

      {/* Background */}
      <LinearGradient
        colors={["#1C1C1E", "#0A0A0A", "#000"]}
        style={styles.background}
      />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.scrollContainer}
        >
          {/* Header */}
          <View style={styles.header}>
            <Image
              source={require("../../../assets/login.png")}
              style={styles.image}
            />

            <View style={styles.textContainer}>
              <Text style={styles.welcomeText}>Welcome</Text>

              <Text style={styles.backText}>Back</Text>
            </View>
          </View>

          {/* Form */}
          <BlurView intensity={50} tint="dark" style={styles.formContainer}>
            <View style={styles.formContent}>
              {/* EMAIL */}
              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="mail-outline"
                    size={20}
                    color="rgba(255,255,255,0.4)"
                  />

                  <TextInput
                    value={email}
                    onChangeText={setEmail}
                    placeholder="name@example.com"
                    placeholderTextColor="rgba(255,255,255,0.25)"
                    keyboardType="email"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>
              </View>

              {/* PASSWORD */}
              <View style={styles.passwordGroup}>
                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="lock-closed-outline"
                    size={20}
                    color="rgba(255,255,255,0.4)"
                  />

                  <TextInput
                    value={password}
                    onChangeText={setPassword}
                    placeholder="••••••••"
                    placeholderTextColor="rgba(255,255,255,0.25)"
                    secureTextEntry={secure}
                    style={styles.input}
                  />

                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => setSecure(!secure)}
                  >
                    <Ionicons
                      name={secure ? "eye-off-outline" : "eye-outline"}
                      size={22}
                      color="rgba(255,255,255,0.4)"
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Forgot */}
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </TouchableOpacity>

              {/* LOGIN BUTTON */}
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={handleLogin}
                disabled={loading}
                style={styles.loginButton}
              >
                <LinearGradient
                  colors={["#FF8C5A", "#FF5E3A"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.gradientButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <>
                      <Text style={styles.loginText}>SIGN IN</Text>

                      <Ionicons
                        name="arrow-forward"
                        size={20}
                        color="#fff"
                        style={styles.arrowIcon}
                      />
                    </>
                  )}
                </LinearGradient>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.divider}>
                <View style={styles.line} />

                <Text style={styles.dividerText}>
                  OR CONTINUE WITH
                </Text>

                <View style={styles.line} />
              </View>

              {/* Social Buttons */}
              <View style={styles.socialContainer}>
                {socialLinks.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.socialButton}
                    activeOpacity={0.8}
                    onPress={() => Linking.openURL(item.url)}
                  >
                    <Ionicons name={item.icon} size={22} color="#fff" />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Footer */}
              <TouchableOpacity
                style={styles.footer}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.footerText}>
                  New here?{" "}
                  <Text style={styles.createText}>
                    Create Account
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  flex: {
    flex: 1,
  },

  background: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  scrollContainer: {
    flexGrow: 1,
  },

  header: {
    paddingHorizontal: 30,
    paddingTop: 70,
    paddingBottom: 40,
  },

  image: {
    position: "absolute",
    top: 30,
    right: -20,
    width: 220,
    height: 220,
    borderRadius: 999,
    backgroundColor: "#FF7E52",
    opacity: 0.7,
  },

  textContainer: {
    marginTop: -10,
  },

  welcomeText: {
    color: "#fff",
    fontSize: 40,
    fontWeight: "200",
    letterSpacing: -2,
  },

  backText: {
    color: "#FF7E52",
    fontSize: 50,
    fontWeight: "900",
    marginTop: -5,
    letterSpacing: -2,
  },

  formContainer: {
    flex: 1,
    backgroundColor: "rgba(15,15,15,0.85)",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },

  formContent: {
    paddingHorizontal: 25,
    paddingTop: 35,
    paddingBottom: 40,
  },

  inputGroup: {
    marginBottom: 22,
  },

  passwordGroup: {
    marginBottom: 10,
  },

  label: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 10,
    letterSpacing: 1,
    marginLeft: 4,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 62,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: 18,
  },

  input: {
    flex: 1,
    color: "#fff",
    marginLeft: 12,
    fontSize: 15,
  },

  forgotButton: {
    alignSelf: "flex-end",
    marginBottom: 30,
  },

  forgotText: {
    color: "#FF7E52",
    fontWeight: "700",
    fontSize: 14,
  },

  loginButton: {
    borderRadius: 22,
    overflow: "hidden",

    shadowColor: "#FF7E52",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },

  gradientButton: {
    height: 62,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },

  loginText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  arrowIcon: {
    marginLeft: 10,
  },

  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 35,
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },

  dividerText: {
    color: "rgba(255,255,255,0.35)",
    marginHorizontal: 12,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
  },

  socialContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },

  socialButton: {
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
  },

  footer: {
    marginTop: 35,
    alignItems: "center",
  },

  footerText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 15,
  },

  createText: {
    color: "#FF7E52",
    fontWeight: "800",
  },
});