import "react-native-reanimated";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { MD3LightTheme as DefaultTheme, PaperProvider } from "react-native-paper";
import { StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SnackbarProvider } from "@/contexts/SnackBarContext";

export { ErrorBoundary } from "expo-router";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "teal",
    secondary: "green",
    secondaryContainer: "#e0f2f1", // teal-50
    onSecondaryContainer: "#00796b", // teal-700
  },
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView>
      <PaperProvider theme={theme}>
        <SnackbarProvider>
          <StatusBar animated barStyle="dark-content" />
          <SafeAreaProvider>
            <Stack screenOptions={{ headerShown: false }}>
              <Stack.Screen name="(tabs)" />
              <Stack.Screen name="auth/login" />
              <Stack.Screen name="auth/register" />
            </Stack>
          </SafeAreaProvider>
        </SnackbarProvider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
