import { useEffect } from "react";
import { jobsApi } from "@/lib/apiService";
import { View, StyleSheet, Text } from "react-native";

export default function ProfileScreen() {
  useEffect(() => {
    jobsApi
      .getById(1)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error.data);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Profile Screen</Text>
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
