import { View, StyleSheet, Text } from "react-native";
import { useAuthStore } from "@/stores/authStore";

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);

  return (
    <View style={styles.container}>
      <Text>Profile Screen {user?.name}</Text>
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
