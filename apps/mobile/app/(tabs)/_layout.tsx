import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useAuthStore } from "@/stores/authStore";
import { useTheme } from "react-native-paper";

export default function TabLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.colors.primary,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.background,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <Ionicons name="home-outline" color={color} size={28} />,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" color={color} size={28} />,
        }}
      />

      <Tabs.Protected guard={isLoggedIn}>
        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color }) => <Ionicons name="folder-outline" color={color} size={28} />,
          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="account-outline" color={color} size={28} />
            ),
          }}
        />
      </Tabs.Protected>
    </Tabs>
  );
}
