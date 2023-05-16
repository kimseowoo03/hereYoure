import { create } from "zustand";

type UIState = {
  editModalOpen: boolean;
  registerModalOpen: boolean;
  setEditModalOpen: () => void;
  setRegisterModalOpen: () => void;
  workroomEditModalOpen: boolean;
  workerRegisterModalOpen: boolean;
  setWorkroomEditModalOpen: () => void;
  setWorkerRegisterModalOpen: () => void;
};

const useUIState = create<UIState>((set) => ({
  editModalOpen: false,
  registerModalOpen: false,
  setEditModalOpen: () => set((state) => ({ editModalOpen: !state.editModalOpen })),
  setRegisterModalOpen: () => set((state) => ({registerModalOpen: !state.registerModalOpen})),
  workroomEditModalOpen: false,
  workerRegisterModalOpen: false,
  setWorkroomEditModalOpen: () => set((state) => ({ workroomEditModalOpen: !state.workroomEditModalOpen })),
  setWorkerRegisterModalOpen: () => set((state) => ({workerRegisterModalOpen: !state.workerRegisterModalOpen}))
}));

export default useUIState;
