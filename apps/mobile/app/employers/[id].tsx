import { formatCompactNumber } from "@/utils/formatNumber";
import ScreenHeader from "@/components/ScreenHeader";
import useEmployer from "@/hooks/useEmployer";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar, Button, Icon, MD3Colors, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { format } from "timeago.js";

export default function EmployerDetailsScreen() {
  const params = useLocalSearchParams();
  const id = Number(params["id"]);
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data: employer, loading, error } = useEmployer(id);

  useEffect(() => {
    if (error || isNaN(id)) router.replace("/+not-found");
  }, [id, error]);

  if (employer == null || loading) {
    return (
      <SafeAreaView>
        <Text>Loading....</Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader backLink />
      <ScrollView style={styles.contentContainer}>
        <View style={styles.header}>
          <View style={{ gap: 20, flexDirection: "row" }}>
            <Avatar.Image
              source={
                employer.avatarUrl
                  ? { uri: employer.avatarUrl }
                  : require("@/assets/images/company_avatar.png")
              }
              size={48}
            />
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{employer.companyName}</Text>
              <Text style={{ color: theme.colors.primary, fontSize: 18 }}>{employer.name}</Text>
            </View>
          </View>

          <Button icon="heart-outline" mode="contained">
            Follow
          </Button>
        </View>
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Icon source="web" size={20} />
            <Text>{employer.companyWebsite}</Text>
          </View>
          <View style={styles.info}>
            <Icon source="email-outline" size={20} />
            <Text>{employer.email}</Text>
          </View>
          <View style={styles.info}>
            <Icon source="account-group" size={20} />
            <Text>{employer.employeeCount}+ Employees</Text>
          </View>
        </View>
        <View style={styles.aboutContainer}>
          <Text style={styles.sectionTitle}>About</Text>
          <View>
            <Text
              numberOfLines={isExpanded ? undefined : 10}
              textBreakStrategy="highQuality"
              style={styles.about}>
              {employer.about}
            </Text>
            <Text
              onPress={() => setIsExpanded((prev) => !prev)}
              style={{ color: theme.colors.primary, fontWeight: "600" }}>
              {isExpanded ? "Show Less" : "Show More"}
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 20, marginBottom: 50 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              paddingVertical: 10,
            }}>
            <Text style={styles.sectionTitle}>Current Openings</Text>
            <Text style={{ color: theme.colors.primary, fontSize: 14, fontWeight: "600" }}>
              {employer.jobs.length} Jobs
            </Text>
          </View>

          <View style={{ gap: 20 }}>
            {employer.jobs.map((job) => (
              <Pressable onPress={() => router.push(`/jobs/${job.id}`)} key={job.id}>
                <View style={styles.jobCard}>
                  <View style={{ gap: 10 }}>
                    <Text style={{ fontSize: 16, fontWeight: "700" }}>{job.title}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={{ fontSize: 14, fontWeight: "300" }}>
                        {job.location} • {job.jobType}
                      </Text>
                    </View>
                    <Text style={{ color: theme.colors.primary, fontWeight: "700" }}>
                      ${formatCompactNumber(job.salaryMin ?? 0)} - $
                      {formatCompactNumber(job.salaryMax ?? 100_000)}
                    </Text>
                  </View>
                  <View style={{ justifyContent: "flex-end", alignItems: "center" }}>
                    <Text style={{ fontWeight: "300", fontSize: 14 }}>{format(job.postedAt)}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    flex: 1,
    backgroundColor: MD3Colors.neutral100,
  },
  contentContainer: {
    paddingVertical: 40,
    paddingHorizontal: 10,
  },
  aboutContainer: {
    paddingTop: 10,
    gap: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    gap: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
  },
  infoContainer: {
    paddingVertical: 20,
    color: MD3Colors.neutral40,
    fontSize: 18,
    gap: 8,
  },
  info: {
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  about: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  jobCard: {
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 0.5,
    borderColor: MD3Colors.neutral90,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: MD3Colors.neutral100,
  },
});
