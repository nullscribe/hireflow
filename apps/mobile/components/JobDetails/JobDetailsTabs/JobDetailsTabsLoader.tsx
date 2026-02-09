import { View, StyleSheet, useWindowDimensions } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { useTheme } from "react-native-paper";

export default function JobDetailsTabsLoader() {
  const theme = useTheme();
  const { width } = useWindowDimensions();

  const HORIZONTAL_PADDING = 10;
  const CONTENT_WIDTH = width - HORIZONTAL_PADDING * 2;

  return (
    <View style={styles.container}>
      <ContentLoader
        speed={2}
        width={width}
        height={500} // Increased height for more content
        viewBox={`0 0 ${width} 500`}
        backgroundColor={theme.colors.surfaceVariant}
        foregroundColor={theme.colors.outlineVariant}>
        {/* --- Tab Bar Skeleton --- */}
        <Rect x={HORIZONTAL_PADDING + 10} y="15" rx="4" ry="4" width="80" height="15" />
        <Rect x={HORIZONTAL_PADDING} y="40" rx="0" ry="0" width="100" height="2" />
        <Rect x="140" y="15" rx="4" ry="4" width="90" height="15" />
        <Rect x="260" y="15" rx="4" ry="4" width="100" height="15" />

        {/* --- Content Body Skeleton --- */}
        {/* "About the Role" */}
        <Rect x={HORIZONTAL_PADDING} y="75" rx="4" ry="4" width="120" height="20" />

        {/* Paragraph 1 */}
        <Rect x={HORIZONTAL_PADDING} y="110" rx="3" ry="3" width={CONTENT_WIDTH} height="12" />
        <Rect x={HORIZONTAL_PADDING} y="130" rx="3" ry="3" width={CONTENT_WIDTH} height="12" />
        <Rect
          x={HORIZONTAL_PADDING}
          y="150"
          rx="3"
          ry="3"
          width={CONTENT_WIDTH * 0.85}
          height="12"
        />

        {/* Paragraph 2 */}
        <Rect x={HORIZONTAL_PADDING} y="180" rx="3" ry="3" width={CONTENT_WIDTH} height="12" />
        <Rect x={HORIZONTAL_PADDING} y="200" rx="3" ry="3" width={CONTENT_WIDTH} height="12" />
        <Rect
          x={HORIZONTAL_PADDING}
          y="220"
          rx="3"
          ry="3"
          width={CONTENT_WIDTH * 0.9}
          height="12"
        />
        <Rect
          x={HORIZONTAL_PADDING}
          y="240"
          rx="3"
          ry="3"
          width={CONTENT_WIDTH * 0.75}
          height="12"
        />

        {/* Paragraph 3 (Added) */}
        <Rect x={HORIZONTAL_PADDING} y="270" rx="3" ry="3" width={CONTENT_WIDTH} height="12" />
        <Rect
          x={HORIZONTAL_PADDING}
          y="290"
          rx="3"
          ry="3"
          width={CONTENT_WIDTH * 0.6}
          height="12"
        />

        {/* Info Chips (Pushed further down) */}
        <Rect x={HORIZONTAL_PADDING} y="330" rx="10" ry="10" width="85" height="35" />
        <Rect x={HORIZONTAL_PADDING + 95} y="330" rx="10" ry="10" width="80" height="35" />
        <Rect x={HORIZONTAL_PADDING + 185} y="330" rx="10" ry="10" width="120" height="35" />
      </ContentLoader>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: 15,
  },
});
