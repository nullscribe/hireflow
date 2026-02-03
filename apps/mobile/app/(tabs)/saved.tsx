import { View, StyleSheet, Text } from "react-native";

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text>Saved Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
});
