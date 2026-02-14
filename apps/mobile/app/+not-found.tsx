import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Oops! Page Not Found" }} />
      <Text style={styles.title}>404: Page Not Found</Text>
      <Text>This screen does not exist.</Text>
      <Link href="/" style={styles.link}>
        Go to home screen
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
    color: "#007bff",
  },
});
