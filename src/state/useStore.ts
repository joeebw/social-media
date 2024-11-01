import { create, StateCreator } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface SocialMediaState {
  isSignIn: boolean;
  toggleSignIn: () => void;
}

const initialState = {
  isSignIn: true,
};

const createActions: StateCreator<SocialMediaState, [], []> = (set) => ({
  ...initialState,
  toggleSignIn: () =>
    set((state) => {
      return { isSignIn: !state.isSignIn };
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
