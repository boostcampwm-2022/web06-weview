import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { MyInfo } from "@/types/auth";

interface AuthStates {
  isLoggedIn: boolean;
  myInfo: MyInfo | null;
}

interface AuthActions {
  login: (userInfo: MyInfo) => void;
  logout: () => void;
}

const useAuthStore = create<AuthStates & AuthActions>()(
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
