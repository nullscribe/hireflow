import { Text, View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useAuthStore } from "@/stores/authStore";
import { Link, usePathname } from "expo-router";
import colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  title: string;
  backLink: boolean;
}

export default function Header({ title, backLink }: HeaderProps) {
  const { isLoggedIn } = useAuthStore();
  const pathName = usePathname();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {backLink ? (
          <Link asChild href="..">
            <Ionicons name="arrow-back-outline" size={24} style={styles.backLink} />
          </Link>
        ) : (
          <Image source={require("@/assets/images/splash-icon.png")} style={styles.headerLogo} />
        )}
        <Text style={styles.headerText}>{title}</Text>
      </View>

      {isLoggedIn || pathName.startsWith("/auth") ? undefined : (
        <Link href="/auth/login" asChild>
          <TouchableOpacity style={styles.link}>
            <Text style={styles.linkText}>Login</Text>
          </TouchableOpacity>
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
    fontSize: 24,
  },
  link: {
    backgroundColor: colors.accent,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    height: 30,
    width: 60,
    paddingHorizontal: 20,
    paddingInline: 10,
  },
  linkText: {
    color: colors.background,
    fontSize: 18,
  },
  backLink: {
    paddingRight: 10,
    color: colors.accent,
  },
});
