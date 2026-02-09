import { Link, RelativePathString } from "expo-router";
import { PropsWithChildren } from "react";
import { View, StyleSheet, Text } from "react-native";

interface JobSectionProps {
  title: string;
  link: RelativePathString;
}

export default function JobsSection({ title, link, children }: PropsWithChildren<JobSectionProps>) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Link href={link} style={styles.seeAll}>
          See all
        </Link>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  seeAll: {
    fontSize: 16,
    fontWeight: "500",
  },
});
