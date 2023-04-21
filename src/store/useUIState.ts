import { create } from "zustand";

type UIState = {
  editModalOpen: boolean;
  registerModalOpen: boolean;
  setEditModalOpen: () => void;
  setRegisterModalOpen: () => void;
};

const useUIState = create<UIState>((set) => ({
  editModalOpen: false,
  registerModalOpen: false,
  setEditModalOpen: () => set((state) => ({ editModalOpen: !state.editModalOpen })),
  setRegisterModalOpen: () => set((state) => ({registerModalOpen: !state.registerModalOpen}))
}));

export default useUIState;
