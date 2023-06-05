import { create } from "zustand";

type authState = {
  emailAuth: boolean;
  userEmail: string;
  setUserEmail: (email: string) => void;
  setEmailAuth: () => void;
};

const useAuthState = create<authState>((set) => ({
  emailAuth: false,
  userEmail: "",
  setUserEmail: (email) => set(() => ({ userEmail: email })),
  setEmailAuth: () => set((state) => ({ emailAuth: !state.emailAuth })),
}));

export default useAuthState;
