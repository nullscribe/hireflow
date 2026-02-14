import { View, StyleSheet } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

interface EmptyJobListProps {
  onClearFilters?: () => void;
}

export default function EmptyJobList({ onClearFilters }: EmptyJobListProps) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrapper, { backgroundColor: theme.colors.secondaryContainer }]}>
        <Ionicons name="briefcase-outline" size={36} color={theme.colors.primary} />
      </View>

      <Text variant="titleLarge" style={styles.title}>
        No jobs found
      </Text>

      <Text variant="bodyLarge" style={[styles.subtitle, { color: theme.colors.onSurfaceVariant }]}>
        Try adjusting your filters or search keywords to find what you&apos;re looking for.
      </Text>

      <Button
        mode="contained"
        onPress={onClearFilters}
        style={styles.button}
        contentStyle={styles.buttonContent}
        icon="filter-remove">
        Clear all filters
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
  },
  iconWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  title: {
    marginTop: 8,
    fontWeight: "600",
  },
  subtitle: {
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 20,
  },
  button: {
    borderRadius: 12,
  },
  buttonContent: {
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
});
