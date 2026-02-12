import { format } from "timeago.js";
import { JobResponse } from "@hireflow/types";
import { router } from "expo-router";
import { StyleSheet, Text, Pressable, View } from "react-native";
import { Avatar, MD3Colors, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface JobCardProps {
  job: JobResponse;
}

export default function JobCard({ job }: JobCardProps) {
  const theme = useTheme();
  return (
    <Pressable onPress={() => router.push(`/jobs/${job.id}`)}>
      <View style={styles.container}>
        <View style={styles.mainContainer}>
          <Avatar.Image
            source={
              job.employer?.avatarUrl
                ? { uri: job.employer?.avatarUrl }
                : require("../../../assets/images/company_avatar.png")
            }
            size={42}
          />

          <View style={styles.infoContainer}>
            <Text style={styles.title}>{job.title}</Text>
            <Text style={{ color: theme.colors.primary, fontWeight: "600" }}>
              {job.employer?.companyName}
            </Text>

            <View style={styles.capsuleContainer}>
              <Text style={styles.capsule}>
                <Ionicons name="location" size={12} /> {job.location}
              </Text>
              <Text style={styles.capsule}>
                ${job.salaryMin} - ${job.salaryMax}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.timeInfo}>
          <Text style={{ color: MD3Colors.neutral40, fontWeight: 300 }}>
            {format(new Date(job.postedAt))}
          </Text>
          <Text style={{ color: MD3Colors.neutral40, fontWeight: 300 }}>
            {job.deadline && format(new Date(job.deadline))}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginVertical: 15,
  },
  mainContainer: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  infoContainer: {
    gap: 6,
  },
  title: {
    fontWeight: "800",
    fontSize: 18,
    lineHeight: 20,
  },
  capsuleContainer: {
    flexDirection: "row",
    gap: 10,
  },
  capsule: {
    backgroundColor: MD3Colors.neutral90,
    color: MD3Colors.neutral50,
    fontWeight: "500",
    fontSize: 12,
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  timeInfo: {
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
});
