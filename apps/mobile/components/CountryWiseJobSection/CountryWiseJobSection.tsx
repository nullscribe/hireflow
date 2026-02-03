import React from "react";
import { View, StyleSheet } from "react-native";
import type { CountryGroup } from "@hireflow/types";
import CountryWiseJobCard from "./CountryWiseJobCard";
import JobsSection from "../JobsSection";
import colors from "@/constants/Colors";

export default function CountryWiseJobSection({ countries }: { countries: CountryGroup[] }) {
  return (
    <JobsSection title="Country wise jobs" link="..">
      <View style={styles.grid}>
        {countries.slice(0, 4).map((item, index) => (
          <CountryWiseJobCard
            key={index}
            country={item.country}
            jobs={item.count}
            flagString={item.countryFlag}
            containerStyle={styles.cardContainer}
          />
        ))}
      </View>
    </JobsSection>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  cardContainer: {
    backgroundColor: colors.cardBackground,
  },
});
