import { Link, Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";

export default function NotFoundScreen() {
  return (
    <View style={styles.container}>
      {/* Set the screen options to hide the header for the 404 screen */}
      <Stack.Screen options={{ title: "Oops! Page Not Found" }} />
      <Text style={styles.title}>404: Page Not Found</Text>
      <Text>This screen does not exist.</Text>
      {/* Provide a link to navigate back to the home screen */}
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
    color: "#007bff", // Example color
  },
});
