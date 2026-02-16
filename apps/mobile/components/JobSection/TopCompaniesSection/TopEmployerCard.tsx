import { View, Text, StyleSheet, Pressable } from "react-native";
import type { EmployerJobCount } from "@hireflow/types";
import { Avatar, MD3Colors } from "react-native-paper";
import { router } from "expo-router";

interface TopEmployerCardProps {
  employerJobCount: EmployerJobCount;
}

export default function TopEmployerCard({ employerJobCount }: TopEmployerCardProps) {
  return (
    <Pressable onPress={() => router.push(`/employers/${employerJobCount.id}`)}>
      <View style={styles.container}>
        <Avatar.Image
          source={
            employerJobCount.avatarUrl
              ? { uri: employerJobCount.avatarUrl }
              : require("../../../assets/images/company_avatar.png")
          }
          size={42}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.companyName}>{employerJobCount.companyName}</Text>
          <Text style={styles.jobCount}>{employerJobCount.jobCount} Open Roles</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    padding: 15,
    gap: 10,
    alignItems: "center",
    borderColor: MD3Colors.neutral90,
    marginRight: 10,
    width: 160,
    height: 130,
    marginVertical: 5,
    borderRadius: 10,
  },
  infoContainer: {
    gap: 2,
    alignItems: "center",
  },
  companyName: {
    fontSize: 15,
    fontWeight: "600",
  },
  jobCount: {
    fontWeight: "200",
    fontSize: 12,
  },
});
