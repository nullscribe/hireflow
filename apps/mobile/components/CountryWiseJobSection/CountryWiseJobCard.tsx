import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme } from "react-native-paper";

interface CountryWiseJobCardProps {
  country: string;
  jobs: number;
  flagString: string;
}

export default function CountryWiseJobCard({ country, jobs, flagString }: CountryWiseJobCardProps) {
  const theme = useTheme();
  return (
    <Link
      href={`/jobs?country=${country}`}
      style={[
        styles.card,
        { backgroundColor: theme.colors.surface, borderColor: theme.colors.primary },
      ]}>
      <View style={styles.flagContainer}>
        <Text style={styles.flagText}>{flagString}</Text>
      </View>
      <Text style={styles.countryName}>{country}</Text>
      <Text style={styles.jobCount}>{jobs} Jobs</Text>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "48%",
    padding: 16,
    borderRadius: 40,
    borderWidth: 1,
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
