import { ScrollView, StyleSheet } from "react-native";
import JobCardLoader from "./JobCard/JobCardLoader";

export default function JobListLoader() {
  return (
    <ScrollView style={styles.loaderContainer}>
      {[1, 2, 3, 4, 5, 6, 7].map((key) => (
        <JobCardLoader key={key} />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    backgroundColor: "#fff",
    marginTop: 20,
    paddingHorizontal: 10,
  },
});
