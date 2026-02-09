import { authApi } from "@/lib/apiService";
import { useAuthStore } from "@/stores/authStore";
import { RegistrationSchema, RegistrationType } from "@hireflow/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Alert, View, StyleSheet } from "react-native";
import { Button, SegmentedButtons, Text, TextInput } from "react-native-paper";

export default function RegistrationForm() {
  const [user, setUser] = useState<"candidate" | "employer">("candidate");
  const login = useAuthStore((state) => state.login);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(RegistrationSchema),
  });

  const onSubmit = async (formData: RegistrationType) => {
    try {
      const { data } = await authApi.register(formData.name, formData.email, formData.password);

      await login(data.token, data.user);

      Alert.alert("Success", "Account registered successfully!");
      router.replace("/(tabs)"); // Go back to tabs
    } catch (error: any) {
      Alert.alert("Error", error.response?.data?.error || "Login failed");
    }
  };

  return (
    <View style={styles.formContainer}>
      <SegmentedButtons
        value={user}
        onValueChange={setUser}
        buttons={[
          {
            value: "candidate",
            label: "Seeker",
          },
          {
            value: "employer",
            label: "Employer",
          },
        ]}
      />
      <View>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Full Name"
              error={!!errors.name}
              onBlur={onBlur}
              keyboardType="default"
              mode="outlined"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}
      </View>
      <View>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Email"
              error={!!errors.email}
              onBlur={onBlur}
              keyboardType="email-address"
              mode="outlined"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      </View>
      <View>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password"
              error={!!errors.password}
              onBlur={onBlur}
              secureTextEntry
              mode="outlined"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}
      </View>
      <View>
        <Controller
          control={control}
          name="password_confirmation"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              label="Password Confirmation"
              error={!!errors.password_confirmation}
              onBlur={onBlur}
              secureTextEntry
              mode="outlined"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.password_confirmation && (
          <Text style={styles.error}>{errors.password_confirmation.message}</Text>
        )}
      </View>
      <Button mode="contained" loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? "Creating account " : "Create Account"}
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 6,
    gap: 30,
  },
  error: {
    color: "red",
  },
});
