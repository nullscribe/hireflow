import colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { View, StyleSheet, TextInput } from "react-native";

export default function SearchInput({ value }: { value: string }) {
  return (
    <View style={styles.inputContainer}>
      <Ionicons name="search-outline" size={28} style={styles.icon} />
      <TextInput value={value} placeholder="Enter title or description" style={styles.input} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    display: "contents",
    width: "auto",
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: 10,
    paddingLeft: 0,
  },
  icon: {
    marginRight: 10,
  },
});
