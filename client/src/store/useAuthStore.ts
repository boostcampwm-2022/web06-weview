import create from "zustand";
import { devtools, persist } from "zustand/middleware";

interface AuthStore {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        login: () => set((state) => ({ isLoggedIn: true })),
        logout: () => set((state) => ({ isLoggedIn: false })),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
