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
        value={filters.jobType as string}
        onValueChange={onValueChange}
        buttons={[
          {
            value: "full-time",
            label: "Full Time",
          },
          {
            value: "part-time",
            label: "Part Time",
          },
          {
            value: "contract",
            label: "Contract",
          },
          {
            value: "internship",
            label: "Internship",
          },
        ]}
      />
    </View>
  );
}
