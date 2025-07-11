import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type UserProfile = {
  name: string;
  roles: string[];
};

type UserState = {
  currentUser: UserProfile | null;
  login: (user: string) => void;
  logout: () => void;
};

const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        currentUser: null,
        login: (user) => set({ currentUser: JSON.parse(user) }),
        logout: () => set({ currentUser: null }),
      }),
      { name: "user-store" }
    )
  )
);

export const useCurrentUser = () => useUserStore((state) => state.currentUser);
export const useLogin = () => useUserStore((state) => state.login);
export const useLogout = () => useUserStore((state) => state.logout);
