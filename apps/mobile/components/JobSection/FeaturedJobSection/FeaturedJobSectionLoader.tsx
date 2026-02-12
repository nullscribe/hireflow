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
        {/* Avatar Icon (size 38) */}
        <Circle cx={PADDING + 10 - 10} cy={PADDING + 10 + 10} r="19" />

        {/* Job Title */}
        <Rect x={PADDING - 8 - 10} y={PADDING + 38 + 10} rx="4" ry="4" width="140" height="18" />

        {/* Company • Location */}
        <Rect
          x={PADDING - 8 - 10}
          y={PADDING + 38 + 18 + 15}
          rx="3"
          ry="3"
          width="180"
          height="14"
        />

        {/* Salary Badge */}
        <Rect
          x={PADDING - 8 - 10}
          y={CARD_HEIGHT - PADDING - 45 + 10}
          rx="12"
          ry="12"
          width="80"
          height="20"
        />

        {/* Job Type Text */}
        <Rect
          x={PADDING + 80 - 10}
          y={CARD_HEIGHT - PADDING - 43 + 10}
          rx="3"
          ry="3"
          width="60"
          height="16"
        />

        {/* --- SECOND CARD (Offset by CARD_WIDTH + SPACING) --- */}

        {/* Second Card Avatar */}
        <Circle cx={CARD_WIDTH + SPACING + PADDING + 10} cy={PADDING + 10 + 10} r="24" />

        {/* Second Card Title */}
        <Rect
          x={CARD_WIDTH + SPACING + PADDING - 8 - 10}
          y={PADDING + 38 + 10}
          rx="4"
          ry="4"
          width="140"
          height="18"
        />

        {/* Company • Location */}
        <Rect
          x={CARD_WIDTH + SPACING + PADDING - 8 - 10}
          y={PADDING + 38 + 18 + 6 + 10}
          rx="3"
          ry="3"
          width="160"
          height="14"
        />

        {/* Salary Badge */}
        <Rect
          x={CARD_WIDTH + SPACING + PADDING - 8 - 10}
          y={CARD_HEIGHT - PADDING - 45 + 10}
          rx="12"
          ry="12"
          width="80"
          height="20"
        />

        {/* Job Type Text */}
        <Rect
          x={CARD_WIDTH + SPACING + PADDING + 80 - 10}
          y={CARD_HEIGHT - PADDING - 43 + 10}
          rx="3"
          ry="3"
          width="60"
          height="16"
        />
      </ContentLoader>
    </View>
  );
}
