import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, StyleSheet } from "react-native";

import ScreenHeader from "@/components/ScreenHeader";
import CountryWiseJobsSection from "@/components/JobSection/CountryWiseJobSection";
import CategoryWiseJobSection from "@/components/JobSection/CategoryWiseJobSection";
import { MD3Colors } from "react-native-paper";
import useCountries from "@/hooks/useCountries";
import HomeHeroCard from "@/components/HomeHeroCard";
import FeaturedJobSection from "@/components/JobSection/FeaturedJobSection";
import useCategories from "@/hooks/useCategories";
import useJobs from "@/hooks/useJobs";
import useTopEmployers from "@/hooks/useTopEmployers";
import TopCompaniesSection from "@/components/JobSection/TopCompaniesSection";

export default function HomeScreen() {
  const { data: countries, loading: countriesLoading } = useCountries();
  const { data: categories, loading: categoriesLoading } = useCategories();
  const { data: featuredJobs, loading: featuredJobsLoading } = useJobs({ isFeatured: true });
  const { data: topEmployers, loading: topEmployersLoading } = useTopEmployers();

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader backLink={false} />
      <ScrollView showsVerticalScrollIndicator={true}>
        <HomeHeroCard />
        <FeaturedJobSection jobs={featuredJobs} loading={featuredJobsLoading} />
        <CountryWiseJobsSection countries={countries} loading={countriesLoading} />
        <CategoryWiseJobSection categories={categories} loading={categoriesLoading} />
        <TopCompaniesSection employers={topEmployers} loading={topEmployersLoading} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: MD3Colors.neutral100 },
});
