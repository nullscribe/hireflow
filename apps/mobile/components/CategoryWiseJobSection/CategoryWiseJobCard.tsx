import colors from "@/constants/Colors";
import { ViewStyle, View, Text, StyleSheet } from "react-native";

interface CategoryWiseJobCardProps {
  category: string;
  jobs: number;
  containerStyle?: ViewStyle;
}

export default function CategoryWiseJobCard({
  category,
  jobs,
  containerStyle,
}: CategoryWiseJobCardProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.text}>{category}</Text>
      <Text style={styles.text}>{jobs}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.accentBackground,
    borderColor: colors.accent,
    borderWidth: 1,
    borderRadius: 6,
  },
  text: {
    color: colors.accentText,
  },
});
