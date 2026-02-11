import ScreenHeader from "@/components/ScreenHeader";
import { MD3Colors, useTheme } from "react-native-paper";
import { useMemo, useRef } from "react";
import { StyleSheet, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import BottomSheet from "@gorhom/bottom-sheet";
import FilterSheet from "@/components/FilterSheet";
import type { JobFilters } from "@hireflow/types";
import JobList from "@/components/JobList";
import useJobs from "@/hooks/useJobs";
import { router, useLocalSearchParams } from "expo-router";
import SearchHeader from "@/components/SearchHeader";

export default function ExploreScreen() {
  const params = useLocalSearchParams();
  const theme = useTheme();

  const appliedFilters = useMemo<JobFilters>(
    () => ({
      country: params.country as string,
      industry: params.industry as string,
      jobType: params.jobType as JobFilters["jobType"],
      experienceLevel: params.experienceLevel as JobFilters["experienceLevel"],
      location: params.location as string,
      salaryMin: params.salaryMin ? Number(params.salaryMin) : undefined,
      salaryMax: params.salaryMax ? Number(params.salaryMax) : undefined,
      isFeatured: params.isFeatured ? Boolean(params.isFeatured) : undefined,
      search: params.search as string,
      limit: params.limit ? Number(params.limit) : undefined,
      offset: params.offset ? Number(params.ofsset) : undefined,
    }),
    [params],
  );
  const { data, loading } = useJobs(appliedFilters);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const clearFilters = () => {
    const cleared = Object.keys(appliedFilters).reduce(
      (acc, key) => {
        acc[key] = "";
        return acc;
      },
      {} as Record<string, string>,
    );
    router.setParams(cleared);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader backLink={false} />
      <SearchHeader
        searchQ={appliedFilters.search ?? ""}
        searchQChange={(q: string) =>
          router.setParams({
            ...appliedFilters,
            isFeatured: appliedFilters.isFeatured ? "true" : "false",
            search: q,
          })
        }
        filterButtonOnPress={() => {
          if (bottomSheetRef.current) {
            bottomSheetRef.current.expand();
          }
        }}
      />
      <Text style={[styles.jobCount, { color: theme.colors.primary }]}>
        {data ? `${data.length ?? 0} job(s) Found` : null}
      </Text>
      <JobList jobs={data} loading={loading} onClearFilters={clearFilters} />
      <FilterSheet
        bottomSheetRef={bottomSheetRef}
        appliedFilters={appliedFilters}
        applyFilters={(filters: JobFilters) => {
          if (bottomSheetRef.current) {
            bottomSheetRef.current?.close();
          }
          router.setParams({ ...filters, isFeatured: String(filters.isFeatured) });
        }}
        clearFilters={() => {
          if (bottomSheetRef.current) {
            bottomSheetRef.current?.close();
          }
          clearFilters();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 12,
    paddingTop: 12,
    paddingRight: 12,
    paddingBottom: 0,
    backgroundColor: MD3Colors.neutral100,
  },
  jobCount: { fontWeight: "600", paddingLeft: 20, paddingTop: 10 },
});
