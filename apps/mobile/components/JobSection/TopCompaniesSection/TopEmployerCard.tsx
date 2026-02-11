import { View, Text, StyleSheet } from "react-native";
import type { EmployerJobCount } from "@hireflow/types";
import { Avatar, MD3Colors } from "react-native-paper";

interface TopEmployerCard {
  employerJobCount: EmployerJobCount;
}

export default function TopEmployerCard({ employerJobCount }: TopEmployerCard) {
  return (
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
    width: 150,
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
