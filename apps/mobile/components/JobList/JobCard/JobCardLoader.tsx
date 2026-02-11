import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { View, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";

const windowWidth = Dimensions.get("window").width;

export default function JobCardLoader() {
  const theme = useTheme();
  const Loader = ContentLoader as any;

  const cardWidth = windowWidth - 20;

  return (
    <View style={{ marginBottom: 30 }}>
      <Loader
        speed={1.2}
        width={cardWidth}
        height={70}
        viewBox={`0 0 ${cardWidth} 70`}
        backgroundColor={theme.colors.surfaceVariant}
        foregroundColor={theme.colors.surface}>
        {/* Avatar size={42} */}
        <Circle cx="21" cy="34" r="21" />

        {/* Info Container: Starts at x=57 (42px avatar + 15px gap) */}
        {/* Job Title */}
        <Rect x="57" y="2" rx="4" ry="4" width="180" height="18" />

        {/* Company Name (gap: 6) */}
        <Rect x="57" y="26" rx="3" ry="3" width="100" height="12" />

        {/* Capsule Container (gap: 10) */}
        <Rect x="57" y="48" rx="10" ry="10" width="75" height="20" />
        <Rect x="142" y="48" rx="10" ry="10" width="85" height="20" />

        {/* Time Info (Right Side) */}
        <Rect x={cardWidth - 80} y="2" rx="3" ry="3" width="80" height="12" />
        <Rect x={cardWidth - 60} y="54" rx="3" ry="3" width="60" height="12" />
      </Loader>
    </View>
  );
}
