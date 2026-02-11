import { StyleSheet, View } from "react-native";
import type { CategoryGroup } from "@hireflow/types";

import SectionJobCard from "./SectionJobCard";
import { Icon, useTheme } from "react-native-paper";
import { useState } from "react";
import JobSectionLoader from "./JobSectionLoader";
import HomeSection from "./HomeSection";

interface CategoryWiseJobSectionProps {
  categories: CategoryGroup[];
  loading: boolean;
}

export default function CategoryWiseJobSection({
  categories,
  loading,
}: CategoryWiseJobSectionProps) {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const data = isExpanded ? categories.slice(0, 10) : categories.slice(0, 4);
  return (
    <HomeSection
      title="Category wise jobs"
      icon_name="shape"
      isExpanded={isExpanded}
      loading={loading}
      loader={<JobSectionLoader />}
      onExpandBtnClick={() => setIsExpanded(!isExpanded)}>
      <View style={styles.jobs}>
        {data.map((item, index) => (
          <SectionJobCard
            key={index}
            name={item.category}
            jobCount={item.count}
            filter="category"
            Icon={<Icon source={item.icon_name} size={16} color={theme.colors.primary} />}
          />
        ))}
      </View>
    </HomeSection>
  );
}

const styles = StyleSheet.create({
  jobs: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
