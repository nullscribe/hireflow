import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";
import { MD3Colors, useTheme } from "react-native-paper";
import { formatCompactNumber } from "@/utils/formatNumber";
import { SCREEN_WIDTH } from "@gorhom/bottom-sheet";
import { useState } from "react";

interface SalaryRangeSliderProps {
  containerStyle: ViewStyle;
  labelStyle: TextStyle;
  onChangeFinish: (value: number[]) => void;
}

export default function SalaryRangeSlider({
  containerStyle,
  labelStyle,
  onChangeFinish,
}: SalaryRangeSliderProps) {
  const [salaryMin, setSalaryMin] = useState(0);
  const [salaryMax, setSalaryMax] = useState(100_000);
  return (
    <View style={containerStyle}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
        <Text style={labelStyle}>Salary Range</Text>
        <Text style={styles.valueText}>
          ${formatCompactNumber(salaryMin)} - ${formatCompactNumber(salaryMax)}
        </Text>
      </View>
      <MultiSlider
        isMarkersSeparated
        values={[salaryMin, salaryMax]}
        sliderLength={SCREEN_WIDTH - 50}
        min={0}
        max={100_000}
        customMarkerLeft={() => <CustomMarker />}
        customMarkerRight={() => <CustomMarker />}
        trackStyle={{ height: 4, borderRadius: 3 }}
        containerStyle={{ alignItems: "center" }}
        touchDimensions={{ height: 120, width: 120, borderRadius: 30, slipDisplacement: 200 }}
        onValuesChange={(values) => {
          setSalaryMin(values[0]);
          setSalaryMax(values[1]);
        }}
        onValuesChangeFinish={onChangeFinish}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  valueText: {
    fontSize: 14,
    color: MD3Colors.neutral60,
    paddingHorizontal: 6,
  },
});

function CustomMarker() {
  const theme = useTheme();
  return (
    <View
      style={{
        height: 22,
        width: 22,
        borderRadius: 13,
        backgroundColor: theme.colors.primary,
        elevation: 3,
      }}
    />
  );
}
