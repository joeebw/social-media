import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User } from "./userStore.type";

interface SocialMediaState {
  isSignIn: boolean;
  user: User | null;
  idUser: string | null;
  toggleSignIn: () => void;
  setUser: (user: User | null) => void;
  setIdUser: (id: string | null) => void;
  resetAppStore: () => void;
}

const initialState = {
  user: null,
  isSignIn: true,
  idUser: null,
};

const createActions: StateCreator<SocialMediaState, [], []> = (set) => ({
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
  resetAppStore: () => set(() => initialState),
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
