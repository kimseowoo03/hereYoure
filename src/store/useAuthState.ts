import { create } from "zustand";

type authState = {
  emailAuth: boolean;
  setEmailAuth: () => void;
};

const useAuthState = create<authState>((set) => ({
  emailAuth: false,
  setEmailAuth: () => set((state) => ({ emailAuth: !state.emailAuth })),
}));

export default useAuthState;
