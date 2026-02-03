import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

import type { Job, CategoryGroup, CountryGroup } from "@hireflow/types";
import { jobsApi } from "@/lib/apiService";
import colors from "@/constants/Colors";
import CenteredActivityIndicator from "@/components/CenteredActivityIndicator";
import Header from "@/components/Header";
import CountryWiseJobsSection from "@/components/CountryWiseJobSection/CountryWiseJobSection";
import CategoryWiseJobSection from "@/components/CategoryWiseJobSection/CategoryWiseJobSection";

export default function HomeScreen() {
  const [countries, setCountries] = useState<CountryGroup[]>([]);
  const [categories, setCategories] = useState<CategoryGroup[]>([]);
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([]);
  const [recentJobs, setRecentJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [countriesRes, categoriesRes, featuredRes, recentRes] = await Promise.all([
        jobsApi.getCountries(),
        jobsApi.getCategories(),
        jobsApi.getFeaturedJobs(),
        jobsApi.getRecentJobs(),
      ]);

      setCountries((_) => countriesRes.data.countries);
      setCategories((_) => categoriesRes.data.categories);
      setFeaturedJobs((_) => featuredRes.data.jobs);
      setRecentJobs((_) => recentRes.data.jobs);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CenteredActivityIndicator />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
        <Header title="Home" backLink={false} />

        <CountryWiseJobsSection countries={countries} />
        <CategoryWiseJobSection categories={categories} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 6, backgroundColor: colors.background },
});
