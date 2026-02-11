import React from "react";
import { View, Dimensions } from "react-native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function FeaturedJobSectionLoader() {
  const CARD_WIDTH = 230;
  const CARD_HEIGHT = 160;
  const SPACING = 12;
  const PADDING = 16;

  return (
    <View style={{ paddingLeft: 16, marginVertical: 5 }}>
      <ContentLoader
        viewBox={`0 0 ${SCREEN_WIDTH} ${CARD_HEIGHT}`}
        height={CARD_HEIGHT}
        width={SCREEN_WIDTH}
        backgroundColor="#F1F5F9" // Matches slate-100 / neutral
        foregroundColor="#E2E8F0" // Matches slate-200
      >
        {/* --- FIRST CARD --- */}
        {/* Main Card Background */}

        {/* Avatar Icon (size 38) */}
        <Circle cx={PADDING + 10} cy={PADDING + 10} r="19" />

        {/* Job Title */}
        <Rect x={PADDING - 5} y={PADDING + 38} rx="4" ry="4" width="140" height="18" />

        {/* Company • Location */}
        <Rect x={PADDING - 5} y={PADDING + 38 + 18 + 6} rx="3" ry="3" width="180" height="14" />

        {/* Salary Badge */}
        <Rect
          x={PADDING - 5}
          y={CARD_HEIGHT - PADDING - 16}
          rx="12"
          ry="12"
          width="100"
          height="24"
        />

        {/* Job Type Text */}
        <Rect
          x={PADDING + 105}
          y={CARD_HEIGHT - PADDING - 20}
          rx="3"
          ry="3"
          width="60"
          height="16"
        />

        {/* --- SECOND CARD (Offset by CARD_WIDTH + SPACING) --- */}

        {/* Second Card Avatar */}
        <Circle cx={CARD_WIDTH + SPACING + PADDING + 19} cy={PADDING + 19} r="19" />

        {/* Second Card Title */}
        <Rect
          x={CARD_WIDTH + SPACING + PADDING}
          y={PADDING + 38 + 10}
          rx="4"
          ry="4"
          width="140"
          height="18"
        />

        {/* Second Card Subtitle */}
        <Rect
          x={CARD_WIDTH + SPACING + PADDING}
          y={PADDING + 38 + 10 + 18 + 6}
          rx="3"
          ry="3"
          width="160"
          height="14"
        />
      </ContentLoader>
    </View>
  );
}
