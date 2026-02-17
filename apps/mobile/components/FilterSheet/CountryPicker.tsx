import useCountries from "@/hooks/useCountries";
import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { Text, TextStyle, View, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";
import RNPickerSelect from "react-native-picker-select";

interface CountryPickerProps {
  containerStyle: ViewStyle;
  labelStyle: TextStyle;
  value: string | undefined;
  onValueChange: (value: string) => void;
}

export default function CountryPicker({
  containerStyle,
  labelStyle,
  value,
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
          items={generatedItems}
          value={value}
          useNativeAndroidPickerStyle={false}
          placeholder={{
            label: "Select a country...",
            value: null,
            color: theme.colors.onSurfaceVariant,
          }}
          Icon={() => (
            <Ionicons
              name="chevron-down"
              size={20}
              color={theme.colors.onSurfaceVariant}
              style={{
                position: "absolute",
                right: 12,
                top: 16,
              }}
            />
          )}
          style={{
            inputAndroid: {
              fontSize: 16,
              paddingVertical: 12,
              paddingHorizontal: 12,
              paddingRight: 40,
              color: theme.colors.onSurface,
              borderRadius: 8,
            },
            placeholder: {
              color: theme.colors.onSurfaceVariant,
            },
          }}
        />
      </View>
    </View>
  );
}
