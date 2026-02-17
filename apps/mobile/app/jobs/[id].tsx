import ScreenHeader from "@/components/ScreenHeader";
import JobApplyFooter from "@/components/JobDetails/JobApplyFooter";
import JobDetailsTabs from "@/components/JobDetails/JobDetailsTabs";
import JobHeaderCard from "@/components/JobDetails/JobHeaderCard/index";
import useJob from "@/hooks/useJob";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect } from "react";
import { Share, StyleSheet } from "react-native";
import { MD3Colors } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

export default function JobDetailsScreen() {
  const navigation = useNavigation();

  const params = useLocalSearchParams();
  const { data: job, loading } = useJob(Number(params["id"]));

  useEffect(() => {
    navigation.getParent()?.setOptions({
      tabBarStyle: { display: "none" },
    });

    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: { display: "flex" },
      });
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        backLink
        rightIconName="share-variant-outline"
        onPressRightIcon={() => {
          if (!job?.id) return;
          try {
            Share.share({
              message: `Check out this job on HireFlow: hireflowbd://jobs/${job.id}`,
              url: `hireflowbd://jobs/${job?.id}`,
            });
          } catch (error) {
            console.log(error);
          }
        }}
      />
      <JobHeaderCard job={job} loading={loading} />
      <JobDetailsTabs job={job} loading={loading} />

      <JobApplyFooter
        onSave={() => console.log("save")}
        onApply={() => console.log("apply")}
        loading={loading}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    padding: 12,
    backgroundColor: MD3Colors.neutral100,
  },
});
