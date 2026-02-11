import { StyleSheet, ScrollView } from "react-native";
import type { JobResponse } from "@hireflow/types";
import HomeSection from "../HomeSection";
import FeaturedJobCard from "./FeaturedJobCard";
import JobSectionLoader from "../JobSectionLoader";

interface FeaturedJobSectionProps {
  jobs: JobResponse[];
  loading: boolean;
}

export default function FeaturedJobSection({ jobs, loading }: FeaturedJobSectionProps) {
  return (
    <HomeSection
      title="Featured Jobs"
      icon_name="check-decagram"
      isExpanded={false}
      loading={loading}
      loader={<JobSectionLoader />}
      onExpandBtnClick={() => console.log("Go to Featured Jobs")}>
      <ScrollView style={styles.grid} horizontal>
        {jobs.slice(0, 3).map((item) => (
          <FeaturedJobCard job={item} key={item.id} loading={loading} />
        ))}
      </ScrollView>
    </HomeSection>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
  },
});
