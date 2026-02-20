import { View, StyleSheet, Text, Image } from "react-native";
import useProfile from "@/hooks/useProfile";
import { Icon, MD3Colors, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenHeader from "@/components/ScreenHeader";
import { router } from "expo-router";

export default function ProfileScreen() {
  const { data, loading } = useProfile();
  const theme = useTheme();
  if (loading || data === undefined) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Loading...</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        backLink={true}
        rightIconName="cog-outline"
        onPressRightIcon={() => router.push("/+not-found")}
      />

      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image
            source={
              data.avatarUrl
                ? { uri: data.avatarUrl }
                : require("@/assets/images/candidate_avatar.png")
            }
            style={styles.avatar}
          />
        </View>
        <View style={styles.headerInfo}>
          <Text style={styles.name}>{data.name}</Text>
          {!data.title && (
            <Text style={[styles.title, { color: theme.colors.primary }]}>Senior UX Designer</Text>
          )}
          {!data.location && (
            <View
              style={[
                styles.locationContainer,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}>
              <Icon source="map-marker" size={16} color={theme.colors.primary} />
              <Text
                style={{
                  color: theme.colors.onSecondaryContainer,
                }}>
                San Fransisco, CA
              </Text>
            </View>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: MD3Colors.neutral100,
  },
  header: {
    marginVertical: 50,
    padding: 20,
    alignItems: "center",
  },
  avatarContainer: {
    borderColor: "#e0f2f1",
    borderWidth: 2,
    margin: 10,
    padding: 10,
    borderRadius: 1000,
  },
  avatar: {
    borderRadius: 1000,
    width: 100,
    height: 100,
  },
  headerInfo: {
    gap: 5,
    marginVertical: 10,
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: 600,
    textAlign: "center",
  },
  title: {
    fontSize: 18,
  },
  locationContainer: {
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    alignItems: "center",
    flexDirection: "row",
    gap: 3,
  },
  location: {},
  section: {},
  sectionTItle: {},
});
