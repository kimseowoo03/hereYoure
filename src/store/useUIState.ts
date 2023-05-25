import { create } from "zustand";

type UIState = {
  editModalOpen: boolean;
  registerModalOpen: boolean;
  setEditModalOpen: () => void;
  setRegisterModalOpen: () => void;
  workroomEditModalOpen: boolean;
  workroomDeleteModalOpen: boolean;
  workerRegisterModalOpen: boolean;
  workerInfoFixModalOpen: boolean;
  setWorkroomEditModalOpen: () => void;
  setWorkerRegisterModalOpen: () => void;
  setWorkroomDeleteModalOpen: () => void;
  setWorkerInfoFixModalOpen: () => void;
};

const useUIState = create<UIState>((set) => ({
  editModalOpen: false,
  registerModalOpen: false,
  setEditModalOpen: () => set((state) => ({ editModalOpen: !state.editModalOpen })),
  setRegisterModalOpen: () => set((state) => ({registerModalOpen: !state.registerModalOpen})),
  workroomEditModalOpen: false,
  workroomDeleteModalOpen: false,
  workerRegisterModalOpen: false,
  workerInfoFixModalOpen: false,
  setWorkroomEditModalOpen: () => set((state) => ({ workroomEditModalOpen: !state.workroomEditModalOpen })),
  setWorkerRegisterModalOpen: () => set((state) => ({workerRegisterModalOpen: !state.workerRegisterModalOpen})),
  setWorkroomDeleteModalOpen:  () => set((state) => ({workroomDeleteModalOpen: !state.workroomDeleteModalOpen})),
  setWorkerInfoFixModalOpen: () => set((state) => ({workerInfoFixModalOpen: !state.workerInfoFixModalOpen})),
}));

export default useUIState;
