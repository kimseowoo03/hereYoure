import { create } from "zustand";

type UIState = {
  isOpen: boolean;
  setIsOpen: () => void;
};

const useUIState = create<UIState>((set) => ({
  isOpen: false,
  setIsOpen: () => set((state) => ({ isOpen: !state.isOpen })),
}));

export default useUIState;
