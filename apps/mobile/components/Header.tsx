import { Text, View, StyleSheet, Image } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, useTheme } from "react-native-paper";

interface HeaderProps {
  title: string;
  backLink: boolean;
}

export default function Header({ title, backLink }: HeaderProps) {
  const { isLoggedIn } = useAuthStore();
  const pathName = usePathname();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {backLink ? (
          <Link asChild href="..">
            <Ionicons name="arrow-back-outline" size={24} style={{ color: theme.colors.primary }} />
          </Link>
        ) : (
          <Image source={require("@/assets/images/splash-icon.png")} style={styles.headerLogo} />
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>

      {isLoggedIn || pathName.startsWith("/auth") ? undefined : (
        <Link href="/auth/login" asChild>
          <Button mode="contained">Login</Button>
        </Link>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 6,
  },
  headerLogo: {
    width: 42,
    height: 42,
  },
  headerText: {
    fontSize: 26,
  },
});
