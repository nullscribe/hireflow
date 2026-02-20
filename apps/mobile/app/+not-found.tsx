import ScreenHeader from "@/components/ScreenHeader";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import { Button } from "react-native-paper";
import { router } from "expo-router";

export default function NotFoundScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader backLink={true} />
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1, gap: 30 }}>
        <LottieView
          source={require("@/assets/lotties/404_cat.json")}
          style={{ height: 300, width: 300 }}
          autoPlay
        />

        <View style={styles.section}>
          <Text style={{ fontSize: 28, fontWeight: "bold" }}>Content not found</Text>
          <Text style={{ fontSize: 16, fontWeight: "thin", textAlign: "center" }}>
            The job or company profile you&apos;re looking for might have been removed or the link
            is incorrect
          </Text>
        </View>
        <View style={[styles.section, styles.fullWidth]}>
          <Button onPress={() => router.replace("/")} mode="contained" style={styles.fullWidth}>
            Back to Home
          </Button>
          <Button
            onPress={() => router.replace("/explore")}
            mode="outlined"
            style={styles.fullWidth}>
            Explore Jobs
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
  },
  section: {
    alignItems: "center",
    paddingInline: 24,
    gap: 10,
  },
  fullWidth: {
    width: "100%",
  },
});
