import { ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "@/constants/Colors";

export default function CenteredActivityIndicator() {
  return (
    <SafeAreaView style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color={colors.accent} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
});
