import ContentLoader, { Rect } from "react-content-loader/native";
import { useTheme } from "react-native-paper";

export default function JobSectionLoader() {
  const theme = useTheme();

  return (
    <ContentLoader
      speed={1.2}
      width="100%"
      height={90}
      viewBox="0 0 400 90"
      backgroundColor={theme.colors.surfaceVariant}
      foregroundColor={theme.colors.surface}>
      <Rect x="10" y="6" rx="6" ry="6" width="180" height="26" />
      <Rect x="210" y="6" rx="6" ry="6" width="180" height="26" />

      <Rect x="10" y="46" rx="6" ry="6" width="180" height="26" />
      <Rect x="210" y="46" rx="6" ry="6" width="180" height="26" />
    </ContentLoader>
  );
}
