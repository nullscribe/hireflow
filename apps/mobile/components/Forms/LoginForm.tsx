import { View, StyleSheet, Keyboard } from "react-native";
import { TextInput, SegmentedButtons, Button, Text } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, type LoginType } from "@hireflow/types";
import { useState } from "react";
import { useAuthStore } from "@/stores/authStore";
import { authApi } from "@/lib/apiService";
import { router } from "expo-router";
import { useSnackbar } from "@/contexts/SnackBarContext";

export default function LoginForm() {
  const [user, setUser] = useState<"candidate" | "employer">("candidate");
  const login = useAuthStore((state) => state.login);
  const { showSnackbar } = useSnackbar();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (formData: LoginType) => {
    Keyboard.dismiss();
    try {
      const { data } = await authApi.login(formData.email, formData.password);

      await login(data.token, data.user);

      showSnackbar("Your login is successful");
      router.replace("/(tabs)"); // Go back to tabs
    } catch (error: any) {
      showSnackbar(error.response?.data?.error || "login failed");
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
      <Button mode="contained" loading={isSubmitting} onPress={handleSubmit(onSubmit)}>
        {isSubmitting ? "Loggin in" : "Log in"}
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
