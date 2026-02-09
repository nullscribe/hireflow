import { View, Text, StyleSheet, KeyboardAvoidingView, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme, MD3Colors } from "react-native-paper";
import { Link } from "expo-router";
import Header from "@/components/Header";
import RegistrationForm from "@/components/Forms/RegistrationForm";

export default function RegisterScreen() {
  const theme = useTheme();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="position">
        <Header title="" backLink />
        <View style={styles.heroContainer}>
          <Image source={require("@/assets/images/splash-icon.png")} style={styles.heroImage} />
          <Text style={styles.heroTitle}>Create an Account</Text>
          <Text style={styles.heroSubtitle}>Find your next Opportunity</Text>
        </View>

        <RegistrationForm />

        <Text style={{ paddingTop: 30, color: theme.colors.outline }}>
          Already have an account?{" "}
          <Link style={{ color: theme.colors.primary }} href="/auth/login">
            Log in
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
    justifyContent: "flex-start",
    backgroundColor: "#fff",
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
