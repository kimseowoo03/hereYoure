import { create } from "zustand";

type AccessTokenState = {
  accessToken: string | null;
  setAccessToken: (accessToken: string) => void;
};

export const useAccessToken = create<AccessTokenState>((set) => ({
  accessToken: null,
  setAccessToken: (accessToken: string) => set({ accessToken }),
}));