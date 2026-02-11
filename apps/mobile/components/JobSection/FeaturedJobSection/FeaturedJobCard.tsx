import { formatCompactNumber } from "@/utils/formatNumber";
import { JobResponse } from "@hireflow/types";
import { View, Text, StyleSheet } from "react-native";
import { useTheme, MD3Colors, Avatar } from "react-native-paper";

interface FeaturedJobCardProps {
  job: JobResponse;
  loading: boolean;
}

export default function FeaturedJobCard({ job, loading }: FeaturedJobCardProps) {
  const theme = useTheme();

  if (loading) {
    return (
      <View style={[styles.card, styles.loaderCard]}>
        <View style={styles.iconSkeleton} />
        <View style={styles.textSkeleton} />
        <View style={styles.textSkeletonSmall} />
      </View>
    );
  }

  return (
    <View style={[styles.card, { borderColor: theme.colors.outlineVariant }]}>
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
    width: 230,
    height: 160,
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
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

  pillRow: {
    flexDirection: "row",
    gap: 10,
  },

  pill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  pillText: {
    fontSize: 13,
    fontWeight: "600",
  },

  /* Loading skeleton styles */
  loaderCard: {
    opacity: 0.6,
  },

  iconSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#E5E7EB",
    marginBottom: 12,
  },

  textSkeleton: {
    width: "70%",
    height: 16,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
    marginBottom: 8,
  },

  textSkeletonSmall: {
    width: "50%",
    height: 12,
    borderRadius: 6,
    backgroundColor: "#E5E7EB",
  },
});
