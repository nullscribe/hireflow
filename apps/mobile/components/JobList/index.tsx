import { JobResponse } from "@hireflow/types";
import { StyleSheet, View } from "react-native";
import JobCard from "./JobCard";
import JobListLoader from "./JobListLoader";
import { FlatList } from "react-native-gesture-handler";
import EmptyJobList from "./EmptyJobList";

interface JobListProps {
  jobs: JobResponse[] | null;
  loading: boolean;
  onClearFilters: () => void;
}

export default function JobList({ jobs, loading, onClearFilters }: JobListProps) {
  if (loading) {
    return <JobListLoader />;
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={jobs}
        renderItem={({ item }) => <JobCard job={item} />}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<EmptyJobList onClearFilters={onClearFilters} />}
        contentContainerStyle={!jobs || jobs.length === 0 ? styles.emptyContent : undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  emptyContent: {
    flexGrow: 1,
  },
});
