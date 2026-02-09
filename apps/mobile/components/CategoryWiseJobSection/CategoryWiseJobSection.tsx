import { StyleSheet, View } from "react-native";
import type { CategoryGroup } from "@hireflow/types";

import JobsSection from "../JobsSection";
import CategoryWiseJobCard from "./CategoryWiseJobCard";

export default function CategoryWiseJobSection({ categories }: { categories: CategoryGroup[] }) {
  return (
    <JobsSection title="Category wise jobs" link="..">
      <View style={styles.jobs}>
        {categories.map((item, index) => (
          <CategoryWiseJobCard key={index} category={item.category} jobs={item.count} />
        ))}
      </View>
    </JobsSection>
  );
}

const styles = StyleSheet.create({
  jobs: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 10,
  },
});
