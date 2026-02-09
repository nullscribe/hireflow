import { useState } from "react";
import { useTheme } from "react-native-paper";
import { TabBar, TabView } from "react-native-tab-view";
import { JobDescriptionTab } from "./JobDescriptionTab";
import { JobRequirementsTab } from "./JobRequirementsTab";
import { JobResponsibilitiesTab } from "./JobResponsibilitiesTab";
import { JobResponse } from "@hireflow/types";
import JobDetailsTabsLoader from "./JobDetailsTabsLoader";

const routes = [
  { key: "description", title: "Description" },
  { key: "requirements", title: "Requirements" },
  { key: "responsibilities", title: "Responsibilities" },
];

export interface JobDetailsTabsProps {
  job: JobResponse | null;
  loading: boolean;
}

export default function JobDetailsTabs({ job, loading }: JobDetailsTabsProps) {
  const [index, setIndex] = useState(0);

  if (job === null || loading) {
    return <JobDetailsTabsLoader />;
  }

  const renderScene = ({ route }: any) => {
    switch (route.key) {
      case "description":
        return <JobDescriptionTab job={job} />;
      case "requirements":
        return <JobRequirementsTab job={job} />;
      case "responsibilities":
        return <JobResponsibilitiesTab job={job} />;
    }
  };

  return (
    <TabView
      navigationState={{ index, routes }}
      renderTabBar={RenderTabBar}
      onIndexChange={setIndex}
      style={{ backgroundColor: "white", paddingTop: 40 }}
      renderScene={renderScene}
    />
  );
}

function RenderTabBar(props: any) {
  const theme = useTheme();
  return (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: "white", shadowColor: "white" }}
      activeColor={theme.colors.primary}
      inactiveColor={theme.colors.onSurface}
    />
  );
}
