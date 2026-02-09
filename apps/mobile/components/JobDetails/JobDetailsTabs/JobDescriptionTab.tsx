import { JobResponse } from "@hireflow/types";
import { ScrollView, StyleSheet, View } from "react-native";
import Markdown from "react-native-markdown-display";
import { Chip, Divider, List } from "react-native-paper";

export function JobDescriptionTab({ job }: { job: JobResponse }) {
  const getSalaryDisplay = (min: number | null, max: number | null) => {
    if (!min && !max) return "Negotiable";
    if (min && !max) return `${min}+`;
    if (!min && max) return `Up to ${max}`;
    return `${min} - ${max}`;
  };
  return (
    <ScrollView style={styles.container}>
      <Markdown>{job.description}</Markdown>
      <View style={styles.chipRow}>
        <Chip icon="clock-outline" mode="outlined">
          {job.jobType}
        </Chip>
        <Chip icon="stairs" mode="outlined">
          {job.experienceLevel}
        </Chip>
        <Chip icon="cash" mode="outlined">
          {getSalaryDisplay(job.salaryMin, job.salaryMax)}
        </Chip>
      </View>

      <Divider style={styles.divider} />

      <List.Section>
        <List.Item
          title="Industry"
          description={job.industry}
          left={(props) => <List.Icon {...props} icon={job.industryMaterialIconName || "domain"} />}
        />
        <List.Item
          title="Category"
          description={job.category}
          left={(props) => (
            <List.Icon {...props} icon={job.categoryMaterialIconName || "tag-outline"} />
          )}
        />
        <List.Item
          title="Location & Country"
          description={`${job.location}, ${job.country} ${job.countryFlag}`}
          left={(props) => <List.Icon {...props} icon="map-marker-radius" />}
        />
        {job.deadline && (
          <List.Item
            title="Application Deadline"
            description={new Date(job.deadline).toLocaleDateString()}
            left={(props) => <List.Icon {...props} icon="calendar-clock" color="#B00020" />}
          />
        )}
      </List.Section>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 10,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingVertical: 12,
    gap: 8,
  },
  divider: {
    height: 1,
    marginVertical: 8,
    backgroundColor: "#e0e0e0",
  },
});
