import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "./userStore.type";

interface SocialMediaState {
  isSignIn: boolean;
  user: User | null;
  idUser: string | null;
  isDarkMode: boolean;
  toggleSignIn: () => void;
  setUser: (user: User | null) => void;
  setIdUser: (id: string | null) => void;
  setIsDarkMode: (bool: boolean) => void;
  resetAppStore: () => void;
}

const initialState = {
  user: null,
  isSignIn: true,
  idUser: null,
  isDarkMode: localStorage.getItem("theme") === "dark",
};

const createActions: StateCreator<SocialMediaState, [], []> = (set, get) => ({
  ...initialState,
  toggleSignIn: () =>
    set((state) => {
      return { isSignIn: !state.isSignIn };
    }),
  setUser: (user) => {
    set(() => ({ user }));
  },
  setIdUser: (id: string | null) => {
    set(() => ({ idUser: id }));
  },
  setIsDarkMode: (bool: boolean) => set(() => ({ isDarkMode: bool })),
  resetAppStore: () =>
    set(() => {
      const resetState = { ...initialState, isDarkMode: get().isDarkMode };
      return resetState;
    }),
});

const useAppStore = create<SocialMediaState>()(
  persist(
    (...a) => ({
      ...createActions(...a),
    }),
    {
      name: "social-media-state",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

export default useAppStore;
