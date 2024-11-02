import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SocialMediaState {
  isSignIn: boolean;
  idUser: string | null;
  toggleSignIn: () => void;
  setIdUser: (id: string | null) => void;
}

const initialState = {
  isSignIn: true,
  idUser: null,
};

const createActions: StateCreator<SocialMediaState, [], []> = (set) => ({
  ...initialState,
  toggleSignIn: () =>
    set((state) => {
      return { isSignIn: !state.isSignIn };
    }),
  setIdUser: (id: string | null) => () => ({ idUser: id }),
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
