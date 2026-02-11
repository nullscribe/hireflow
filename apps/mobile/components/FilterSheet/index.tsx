import { Ref, useEffect, useState } from "react";
import { Text, StyleSheet, View } from "react-native";
import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from "@gorhom/bottom-sheet";
import { MD3Colors } from "react-native-paper";
import type { JobFilters } from "@hireflow/types";
import SalaryRangeSlider from "./SalaryRangeSlider";
import JobTypeButtons from "./JobTypeButtons";
import ExperienceButtons from "./ExperienceButtons";
import CountryPicker from "./CountryPicker";
import FeaturedSwitch from "./FeaturedSwitch";
import FilterActionButtons from "./FilterActionButtons";

interface FilterSheetProps {
  bottomSheetRef: Ref<BottomSheet>;
  appliedFilters: JobFilters;
  applyFilters: (filters: JobFilters) => void;
  clearFilters: () => void;
}

export default function FilterSheet({
  bottomSheetRef,
  appliedFilters,
  clearFilters,
  applyFilters,
}: FilterSheetProps) {
  const [filters, setFilters] = useState<JobFilters>({ ...appliedFilters });

  useEffect(() => {
    setFilters({ ...appliedFilters });
  }, [appliedFilters]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      animateOnMount
      enablePanDownToClose
      index={-1}
      enableDynamicSizing={false}
      backdropComponent={(props: any) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} />}
      snapPoints={["70%"]}>
      <BottomSheetView style={styles.contentContainer}>
        <Text style={styles.title}>Filters</Text>

        <JobTypeButtons
          containerStyle={styles.inputSegment}
          labelStyle={styles.label}
          onValueChange={(val) => setFilters({ ...filters, jobType: val as JobFilters["jobType"] })}
          filters={filters}
        />

        <SalaryRangeSlider
          containerStyle={styles.inputSegment}
          labelStyle={styles.label}
          filters={filters}
          onChangeFinish={(values: number[]) =>
            setFilters({ ...filters, salaryMin: values[0], salaryMax: values[1] })
          }
        />

        <ExperienceButtons
          containerStyle={styles.inputSegment}
          labelStyle={styles.label}
          onValueChange={(val) =>
            setFilters({ ...filters, experienceLevel: val as JobFilters["experienceLevel"] })
          }
          filters={filters}
        />

        <View style={styles.inputRow}>
          <CountryPicker
            containerStyle={styles.inputSegment}
            labelStyle={styles.label}
            onValueChange={(value) => setFilters({ ...filters, country: value })}
          />
          <FeaturedSwitch
            filters={filters}
            onValueChange={() => setFilters({ ...filters, isFeatured: !filters.isFeatured })}
          />
        </View>
        <FilterActionButtons
          onClear={() => {
            clearFilters();
            setFilters({});
          }}
          onApply={() => applyFilters(filters)}
        />
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    gap: 20,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 24,
  },
  inputSegment: {
    gap: 10,
    minWidth: 170,
  },
  inputRow: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  label: {
    color: MD3Colors.neutral60,
    fontSize: 16,
    fontWeight: 600,
  },
  sliderContainer: {
    gap: 0,
    alignItems: "center",
  },
});
