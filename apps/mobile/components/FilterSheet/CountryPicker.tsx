import useCountries from "@/hooks/useCountries";
import { JobFilters } from "@hireflow/types";
import { useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

interface CountryPickerProps {
  containerStyle: ViewStyle;
  labelStyle: TextStyle;
  onValueChange: (value: string) => void;
}

export default function CountryPicker({
  containerStyle,
  labelStyle,
  onValueChange,
}: CountryPickerProps) {
  const theme = useTheme();
  const { data: countries } = useCountries();
  const generatedItems = useMemo(
    () =>
      countries.map((item) => ({ label: `${item.country} - ${item.count}`, value: item.country })),
    [countries],
  );
  return (
    <View style={containerStyle}>
      <Text style={labelStyle}>Country</Text>
      <View
        style={{
          borderWidth: 1,
          borderColor: theme.colors.primary,
          borderRadius: 10,
        }}>
        <RNPickerSelect
          onValueChange={onValueChange}
          style={{ inputAndroid: { padding: 0, color: theme.colors.primary } }}
          items={generatedItems}
        />
      </View>
    </View>
  );
}
