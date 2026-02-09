import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import ContentLoader, { Circle, Rect } from "react-content-loader/native";
import { useTheme } from "react-native-paper";

const JobHeaderCardLoader = () => {
  const theme = useTheme();
  const { width } = useWindowDimensions();
  const centerX = width / 2;

  return (
    <View style={styles.container}>
      <ContentLoader
        speed={2}
        width={width}
        height={160} // Reduced total height to pull the spinner up
        viewBox={`0 0 ${width} 160`}
        backgroundColor={theme.colors.surfaceVariant}
        foregroundColor={theme.colors.outlineVariant}>
        {/* Avatar - Size 70 */}
        <Circle cx={centerX} cy="35" r="35" />

        {/* Job Title - Tighter gap from Avatar (y=80) */}
        <Rect x={centerX - 90} y="80" rx="4" ry="4" width="180" height="18" />

        {/* Company & Type - Very close to Title (y=105) */}
        <Rect x={centerX - 65} y="105" rx="3" ry="3" width="130" height="12" />

        {/* Location - (y=125) */}
        <Rect x={centerX - 45} y="125" rx="3" ry="3" width="90" height="12" />
      </ContentLoader>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 30, // Matches index.tsx exactly
    width: "100%",
  },
});

export default JobHeaderCardLoader;
