import { JobFilters } from "@hireflow/types";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { SegmentedButtons } from "react-native-paper";

interface JobTypeButtonsProps {
  containerStyle: ViewStyle;
  labelStyle: TextStyle;
  onValueChange: (value: string) => void;
  filters: JobFilters;
}

export default function JobTypeButtons({
  containerStyle,
  labelStyle,
  onValueChange,
  filters,
}: JobTypeButtonsProps) {
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>Job Type</Text>
      <SegmentedButtons
        density="small"
        value={filters.jobType as string}
        onValueChange={onValueChange}
        buttons={[
          {
            value: "full-time",
            label: "Full time",
          },
          {
            value: "part-time",
            label: "Part time",
          },
          {
            value: "internship",
            label: "Intern",
          },
          {
            value: "contract",
            label: "Contract",
          },
        ]}
      />
    </View>
  );
}
