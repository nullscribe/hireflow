import { formatCompactNumber } from "@/utils/formatNumber";
import { JobResponse } from "@hireflow/types";
import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, MD3Colors, Avatar } from "react-native-paper";

interface FeaturedJobCardProps {
  job: JobResponse;
}

export default function FeaturedJobCard({ job }: FeaturedJobCardProps) {
  const theme = useTheme();

  return (
    <Link href={`/jobs/${job.id}`} style={styles.card}>
      <View>
        <Avatar.Icon
          icon={job.categoryMaterialIconName}
          size={38}
          color={theme.colors.onSecondaryContainer}
          style={{ backgroundColor: theme.colors.secondaryContainer, marginBottom: 10 }}
        />

        <Text style={styles.title}>{job.title}</Text>

        <Text style={styles.subTitle}>
          {job.employer?.companyName} • {job.location}
        </Text>

        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <View
            style={{
              backgroundColor: theme.colors.secondaryContainer,
              borderRadius: 15,
              justifyContent: "center",
            }}>
            <Text
              style={{
                color: theme.colors.onSecondaryContainer,
                fontSize: 12,
                fontWeight: "700",
                paddingVertical: 4,
                paddingHorizontal: 8,
              }}>
              ${formatCompactNumber(job.salaryMin ?? 0)} - $
              {formatCompactNumber(job.salaryMax ?? 1000000)}
            </Text>
          </View>

          <Text style={{ fontSize: 12, fontWeight: "600", paddingHorizontal: 10 }}>
            {job.jobType}
          </Text>
        </View>
      </View>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 5,
    borderRadius: 30,
    borderWidth: 0.2,
    padding: 16,
    marginRight: 12,
    backgroundColor: MD3Colors.neutral100,
    borderColor: MD3Colors.neutral90,
    width: 230,
    height: 160,
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 6,
    color: "#0F172A", // slate-900 vibe
  },

  subTitle: {
    fontSize: 14,
    color: "#64748B", // slate-500
    marginBottom: 12,
  },
});
