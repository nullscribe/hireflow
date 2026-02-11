import { router } from "expo-router";
import { Text, StyleSheet, View } from "react-native";
import { Button, Icon, useTheme } from "react-native-paper";

export default function HomeHeroCard() {
  const theme = useTheme();
  return (
    <View style={[{ backgroundColor: theme.colors.secondaryContainer }, styles.container]}>
      <Text style={styles.title}>Find your dream job</Text>
      <Text style={styles.subtitle}>Join thousands of eager professionals and </Text>
      <Text style={styles.subtitle}>discover your enxt career milestone</Text>
      <Button
        mode="contained"
        onPress={() => router.navigate("/auth/login")}
        style={styles.action}
        contentStyle={styles.actionContent}
        icon="arrow-right-thin">
        Join HireFlow
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    borderRadius: 10,
    marginHorizontal: 6,
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "300",
  },
  action: {
    width: "50%",
    marginTop: 10,
  },
  actionContent: {
    flexDirection: "row-reverse",
  },
});
