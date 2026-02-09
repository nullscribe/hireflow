import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export { ErrorBoundary } from "expo-router";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "teal",
    secondary: "green",
    secondaryContainer: "#e0f2f1", // teal-50
    onSecondaryContainer: "#00796b", // teal-700
    cardBackground: "#f9fafb",

    text: "#111827", // gray-900
    accentText: "#00796b", // teal-700
    textSecondary: "#6b7280", // gray-500

    border: "#e5e7eb", // gray-200
    divider: "#f3f4f6", // gray-100

    success: "#10b981", // green-500
    error: "#ef4444", // red-500
    warning: "#f59e0b", // amber-500
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <StatusBar animated barStyle="dark-content" />
        <SafeAreaProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="auth/login" />
            <Stack.Screen name="auth/register" />
          </Stack>
        </SafeAreaProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
