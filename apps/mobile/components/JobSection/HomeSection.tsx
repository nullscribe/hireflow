import { PropsWithChildren, ReactNode } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { Icon, useTheme } from "react-native-paper";

interface HomeSectionProps {
  title: string;
  icon_name: string;
  onExpandBtnClick: () => void;
  isExpanded: boolean;
  loading: boolean;
  loader: ReactNode;
}

export default function HomeSection({
  title,
  icon_name,
  onExpandBtnClick,
  isExpanded,
  loading,
  loader,
  children,
}: PropsWithChildren<HomeSectionProps>) {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Icon source={icon_name} size={20} color={theme.colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
        <TouchableOpacity
          disabled={loading}
          onPress={onExpandBtnClick}
          activeOpacity={0.99}
          hitSlop={10}>
          <Text style={{ color: theme.colors.primary, fontSize: 12, fontWeight: "500" }}>
            {isExpanded ? "SHOW LESS" : "SHOW MORE"}
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? loader : children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    alignItems: "center",
    gap: 10,
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
