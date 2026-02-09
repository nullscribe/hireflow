import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { MD3Colors, Searchbar, useTheme } from "react-native-paper";

interface SearchHeaderProps {
  searchQ: string;
  searchQChange: (v: string) => void;
  filterButtonOnPress: () => void;
}

export default function SearchHeader({
  searchQ,
  searchQChange,
  filterButtonOnPress,
}: SearchHeaderProps) {
  const theme = useTheme();
  return (
    <View style={styles.filterBar}>
      <Searchbar
        value={searchQ}
        placeholder="Search title or position"
        mode="bar"
        style={styles.searchBar}
        iconColor={theme.colors.primary}
        onChangeText={(val) => searchQChange(val)}
      />
      <TouchableOpacity onPress={filterButtonOnPress}>
        <Ionicons
          name="filter"
          size={28}
          style={{
            color: theme.colors.primary,
            backgroundColor: theme.colors.secondaryContainer,
            padding: 6,
            borderRadius: 12,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  filterBar: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    height: 36,
    alignItems: "center",
    paddingLeft: 30,
    paddingRight: 40,
    gap: 20,
  },
  searchBar: {
    backgroundColor: MD3Colors.neutral100,
    borderColor: MD3Colors.neutral90,
  },
});
