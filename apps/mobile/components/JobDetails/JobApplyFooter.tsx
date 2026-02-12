import { View, StyleSheet } from "react-native";
import { IconButton, Button, useTheme } from "react-native-paper";

interface JobApplyFooterProps {
  onSave: () => void;
  onApply: () => void;
  loading: boolean;
}

export default function JobApplyFooter({ onSave, onApply, loading }: JobApplyFooterProps) {
  const theme = useTheme();
  return (
    <View style={styles.container}>
      <IconButton
        icon="bookmark-outline"
        iconColor={theme.colors.primary}
        disabled={loading}
        onPress={onSave}></IconButton>
      <Button
        mode="contained"
        style={{ minWidth: 250, alignItems: "center" }}
        disabled={loading}
        onPress={onApply}>
        Apply now
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 50,
    alignItems: "center",
  },
});
