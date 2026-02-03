import React from "react";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import colors from "@/constants/Colors";
import { useAuthStore } from "@/stores/authStore";

export default function TabLayout() {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
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
        name="jobs"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => <Ionicons name="search-outline" color={color} size={28} />,
        }}
      />

      <Tabs.Screen
        name="saved"
        options={{
          title: "Saved",
          href: isLoggedIn ? "/saved" : null,
          tabBarIcon: ({ color }) => <Ionicons name="save-outline" color={color} size={28} />,
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          href: isLoggedIn ? "/profile" : null,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-outline" color={color} size={28} />
          ),
        }}
      />
    </Tabs>
  );
}
