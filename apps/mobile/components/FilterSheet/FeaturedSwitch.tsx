import { JobFilters } from "@hireflow/types";
import { View, Text } from "react-native";
import { Switch } from "react-native-paper";

interface FeaturedSwitchProps {
  filters: JobFilters;
  onValueChange: () => void;
}

export default function FeaturedSwitch({ onValueChange, filters }: FeaturedSwitchProps) {
  return (
    <View
      style={{
        minWidth: 150,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 20,
      }}>
      <Text style={{ fontSize: 18 }}>Featured only</Text>
      <Switch value={filters.isFeatured} onValueChange={onValueChange} />
    </View>
  );
}
