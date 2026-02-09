import { JobResponse } from "@hireflow/types";
import { ScrollView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

export function JobResponsibilitiesTab({ job }: { job: JobResponse }) {
  return (
    <ScrollView style={styles.container}>
      <Markdown>{job.responsibilities}</Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    gap: 10,
  },
});
