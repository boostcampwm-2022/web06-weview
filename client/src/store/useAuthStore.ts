import create from "zustand";
import { devtools, persist } from "zustand/middleware";

import { MyInfo } from "@/types/auth";

interface AuthStates {
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
        login: (userInfo) => set({ myInfo: userInfo }),
        logout: () => set({ myInfo: null }),
      }),
      {
        name: "auth-storage",
      }
    )
  )
);

export default useAuthStore;
