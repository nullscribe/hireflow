import { Text, View, StyleSheet, Image, Pressable } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Button, useTheme } from "react-native-paper";

interface ScreenHeaderProps {
  backLink: boolean;
}

export default function ScreenHeader({ backLink }: ScreenHeaderProps) {
  const { isLoggedIn } = useAuthStore();
  const pathName = usePathname();
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {backLink ? (
          <Link asChild href="..">
            <Pressable hitSlop={50}>
              <Ionicons
                name="arrow-back-outline"
                size={24}
                style={{ color: theme.colors.primary }}
              />
            </Pressable>
          </Link>
        ) : (
          <Image source={require("@/assets/images/splash-icon.png")} style={styles.headerLogo} />
        )}
        <Text style={{ fontSize: 24, fontWeight: "800", color: theme.colors.primary }}>
          HireFlow
        </Text>
      </View>

      {isLoggedIn || pathName.startsWith("/auth") ? undefined : (
        <Link href="/auth/login" asChild>
          <Button mode="text">Sign In</Button>
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
    width: 36,
    height: 36,
  },
});
