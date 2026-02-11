import { View, StyleSheet, Text } from "react-native";
import type { CountryGroup } from "@hireflow/types";
import SectionJobCard from "./SectionJobCard";
import { useState } from "react";
import HomeSection from "./HomeSection";
import JobSectionLoader from "./JobSectionLoader";

interface CountryWiseJobSectionProps {
  countries: CountryGroup[];
  loading: boolean;
}

export default function CountryWiseJobSection({ countries, loading }: CountryWiseJobSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const data = isExpanded ? countries.slice(0, 10) : countries.slice(0, 4);

  return (
    <HomeSection
      title="Country wise jobs"
      icon_name="earth"
      isExpanded={isExpanded}
      loading={loading}
      loader={<JobSectionLoader />}
      onExpandBtnClick={() => setIsExpanded(!isExpanded)}>
      <View style={styles.grid}>
        {data.map((item) => (
          <SectionJobCard
            key={item.country}
            name={item.country}
            jobCount={item.count}
            filter="country"
            Icon={<Text style={{ fontSize: 16 }}>{item.countryFlag}</Text>}
          />
        ))}
      </View>
    </HomeSection>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
});
