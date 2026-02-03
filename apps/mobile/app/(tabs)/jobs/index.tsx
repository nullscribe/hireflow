import Header from "@/components/Header";
import SearchInput from "@/components/SearchInput";
import colors from "@/constants/Colors";
import { useState } from "react";
import { StyleSheet } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function ExploreScreen() {
  const [value, setValue] = useState<string>("");
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Explore" backLink={false} />
      <SearchInput value={value} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 6,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
