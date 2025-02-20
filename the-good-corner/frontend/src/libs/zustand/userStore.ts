import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type User = {
  mail: string;
  name: string;
};

type UserState = {
  user: User | null;
  login: (user: User) => void;
};

export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        login: (user: User) => set(() => ({ user: user })),
      }),
      {
        name: "user-store",
      }
    )
  )
);
