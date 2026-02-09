import { JobResponse } from "@hireflow/types";
import { View, Text, StyleSheet } from "react-native";
import { Avatar, useTheme, Icon } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import JobHeaderCardLoader from "./JobHeaderCardLoader";

interface JobHeaderCardProps {
  job: JobResponse | null;
  loading: boolean;
}

export default function JobHeaderCard({ job, loading }: JobHeaderCardProps) {
  const theme = useTheme();
  if (job === null || loading) {
    return <JobHeaderCardLoader />;
  }

  return (
    <View style={styles.container}>
      <Avatar.Image
        source={
          job.employer?.avatarUrl
            ? { uri: job.employer?.avatarUrl }
            : require("../../../assets/images/company_avatar.png")
        }
        size={70}
      />
      <View style={{ alignItems: "center", width: "90%" }}>
        <Text style={styles.title}>{job?.title}</Text>
        <Text style={{ color: theme.colors.primary }}>
          {job.employer?.companyName}
          <Icon source="circle-small" size={15} color={theme.colors.primary} />
          {job.jobType}
        </Text>
        <Text>
          <Ionicons name="location-outline" />
          {job.location}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
