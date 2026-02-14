import { View, Text, StyleSheet, Pressable } from "react-native";
import { router } from "expo-router";
import { MD3Colors } from "react-native-paper";
import { ReactNode } from "react";

interface SectionJobCardProps {
  name: string;
  jobCount: number;
  filter: string;
  Icon: ReactNode;
}

export default function SectionJobCard({ name, jobCount, Icon, filter }: SectionJobCardProps) {
  return (
    <Pressable onPress={() => router.push(`/explore?${filter}=${name}`)} style={styles.card}>
      <View style={styles.nameContainer}>
        <View>{Icon}</View>
        <Text style={styles.name}>{name}</Text>
      </View>
      <Text style={styles.jobCount}>({jobCount})</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    marginBottom: 16,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  jobCount: {
    fontSize: 12,
    color: MD3Colors.neutral60,
    marginTop: 4,
  },
});
