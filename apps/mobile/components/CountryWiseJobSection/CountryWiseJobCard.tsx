import colors from "@/constants/Colors";
import { View, ViewStyle, Text, StyleSheet, TouchableOpacity } from "react-native";

interface CountryWiseJobCardProps {
  country: string;
  jobs: number;
  flagString: string;
  containerStyle?: ViewStyle;
}

export default function CountryWiseJobCard({
  country,
  jobs,
  flagString,
  containerStyle,
}: CountryWiseJobCardProps) {
  return (
    <TouchableOpacity style={[styles.card, containerStyle]}>
      <View style={styles.flagContainer}>
        <Text style={styles.flagText}>{flagString}</Text>
      </View>
      <Text style={styles.countryName}>{country}</Text>
      <Text style={styles.jobCount}>{jobs} Jobs</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 16,
  },
  flagContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "#F8FAFC",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  flagText: {
    fontSize: 24,
  },
  countryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#1A1A1A",
  },
  jobCount: {
    fontSize: 14,
    color: "#26A69A",
    marginTop: 4,
  },
});
