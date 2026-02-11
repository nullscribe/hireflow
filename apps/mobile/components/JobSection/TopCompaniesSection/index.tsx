import { ScrollView, Text } from "react-native";
import HomeSection from "../HomeSection";
import { EmployerJobCount } from "@hireflow/types";
import TopEmployerCard from "./TopEmployerCard";

interface TopCompaniesSectionProps {
  employers: EmployerJobCount[];
  loading: boolean;
}

export default function TopCompaniesSection({ employers, loading }: TopCompaniesSectionProps) {
  return (
    <HomeSection
      title="Top Companies"
      loading={loading}
      loader={<Text>Loading...</Text>}
      icon_name="domain"
      isExpanded={false}
      onExpandBtnClick={() => console.log("Hello world")}>
      <ScrollView style={{ flexDirection: "row" }} horizontal>
        {employers.map((item) => (
          <TopEmployerCard key={item.id} employerJobCount={item} />
        ))}
      </ScrollView>
    </HomeSection>
  );
}
