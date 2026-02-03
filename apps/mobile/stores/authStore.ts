import { create } from "zustand";

import AsyncStorage from "@react-native-async-storage/async-storage";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;

  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  loadAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isLoggedIn: false,
  isLoading: true,

  login: async (token, user) => {
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    set({ token, user, isLoggedIn: true, isLoading: false });
  },

  logout: async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    set({ token: null, user: null, isLoggedIn: false, isLoading: false });
  },

  loadAuth: async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userString = await AsyncStorage.getItem("user");
      if (token && userString) {
        const user = JSON.parse(userString);
        set({ token, user, isLoggedIn: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.log("Error loading auth:", error);
      set({ isLoading: false });
    }
  },
}));
