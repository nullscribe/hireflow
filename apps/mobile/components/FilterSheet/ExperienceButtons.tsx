import { JobFilters } from "@hireflow/types";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { SegmentedButtons } from "react-native-paper";

interface ExperienceButtonsProps {
  containerStyle: ViewStyle;
  labelStyle: TextStyle;
  onValueChange: (value: string) => void;
  filters: JobFilters;
}

export default function ExperienceButtons({
  containerStyle,
  labelStyle,
  onValueChange,
  filters,
}: ExperienceButtonsProps) {
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>Experience Level</Text>
      <SegmentedButtons
        value={filters.experienceLevel as string}
        onValueChange={onValueChange}
        buttons={[
          {
            value: "entry",
            label: "Entry",
          },
          {
            value: "mid",
            label: "Mid",
          },
          {
            value: "senior",
            label: "Senior",
          },
        ]}
      />
    </View>
  );
}
