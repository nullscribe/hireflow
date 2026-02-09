import { View } from "react-native";
import { Button } from "react-native-paper";

interface FilterActionButtonsProps {
  onClear: () => void;
  onApply: () => void;
}

export default function FilterActionButtons({ onClear, onApply }: FilterActionButtonsProps) {
  return (
    <View style={{ flexDirection: "row", marginTop: 30, gap: 20, alignSelf: "flex-end" }}>
      <Button mode="text" icon="delete" onPress={onClear}>
        Clear Filters
      </Button>
      <Button mode="contained" style={{ flex: 1 }} icon="square-edit-outline" onPress={onApply}>
        Apply Filters
      </Button>
    </View>
  );
}
