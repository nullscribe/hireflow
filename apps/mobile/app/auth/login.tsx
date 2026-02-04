import { useState } from "react";
import { Text, Image, StyleSheet, Alert, View, KeyboardAvoidingView } from "react-native";
import { Link, router } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { authApi } from "@/lib/apiService";
import Header from "@/components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, MD3Colors, SegmentedButtons, TextInput, useTheme } from "react-native-paper";
import LoginForm from "@/components/forms/LoginForm";

interface LoginFormData {
  email: string;
  error: boolean;
  password: string;
  user: "candidate" | "employer";
}

export default function LoginScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Header title="" backLink />
        <View style={styles.heroContainer}>
          <Image source={require("@/assets/images/splash-icon.png")} style={styles.heroImage} />
          <Text style={styles.heroTitle}>Welcome Back</Text>
          <Text style={styles.heroSubtitle}>Find your next Opportunity</Text>
        </View>

        <LoginForm />

        <Text style={{ paddingTop: 30, color: theme.colors.outline }}>
          Don't have an account?{" "}
          <Link style={{ color: theme.colors.primary }} href="/auth/register">
            Sign up
          </Link>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
  },
  heroContainer: {
    marginVertical: 30,
    alignItems: "center",
    justifyContent: "flex-start",
    textAlign: "center",
  },
  heroImage: {
    height: 110,
    width: 110,
  },
  heroTitle: {
    fontSize: 40,
  },
  heroSubtitle: {
    fontSize: 18,
    color: MD3Colors.neutral50,
  },
});
