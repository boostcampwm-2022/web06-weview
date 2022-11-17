import create from "zustand";
import { devtools, persist } from "zustand/middleware";
import { UserInfo } from "@/types/auth";

interface AuthState {
  isLoggedIn: boolean;
  myInfo: UserInfo | null;
}

interface AuthAction {
  login: (userInfo: UserInfo) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState & AuthAction>()(
  devtools(
    persist(
      (set) => ({
        myInfo: null,
        isLoggedIn: false,
        login: (userInfo) =>
          set((state) => ({ isLoggedIn: true, myInfo: userInfo })),
        logout: () => set((state) => ({ isLoggedIn: false })),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
