import { View, Text, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

interface CategoryWiseJobCardProps {
  category: string;
  jobs: number;
}

export default function CategoryWiseJobCard({ category, jobs }: CategoryWiseJobCardProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary },
      ]}>
      <Text style={{ color: theme.colors.primary }}>{category}</Text>
      <Text style={{ color: theme.colors.primary }}>{jobs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: 6,
    minWidth: 48,
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center",
    padding: 10,
    justifyContent: "space-between",
  },
});
