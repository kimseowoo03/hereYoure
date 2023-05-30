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
  historyRegisterModalOpen: boolean;
  setHistoryRegisterModalOpen: () => void;
  historyInfoFixModalOpen: boolean;
  historyId: number;
  setHistoryInfoFixModalOpen: () => void;
  setHistoryId: (id:number) => void;
  wokerDeleteModalOpen: boolean;
  setWokerDeleteModalOpen: () => void;
  historyAllChecked: boolean;
  setHistoryAllChecked: () => void;
  historyCheckedArray: number[];
  addToCheckedArray: (id: number) => void;
  filterToCheckedArray: (id: number) => void;
  historyDeleteModalOpen: boolean;
  setHistoryDeleteModalOpen: () => void;
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
  historyRegisterModalOpen: false,
  setHistoryRegisterModalOpen: () => set((state) => ({ historyRegisterModalOpen: !state.historyRegisterModalOpen })),
  historyInfoFixModalOpen: false,
  historyId: 0,
  setHistoryInfoFixModalOpen: () => set((state) => ({ historyInfoFixModalOpen: !state.historyInfoFixModalOpen })),
  setHistoryId: (id) => set(() => ({ historyId: id })),
  wokerDeleteModalOpen: false,
  setWokerDeleteModalOpen: () => set((state) => ({ wokerDeleteModalOpen: !state.wokerDeleteModalOpen })),
  historyAllChecked: false,
  setHistoryAllChecked: () => set((state) => ({ historyAllChecked: !state.historyAllChecked })),
  historyCheckedArray: [],
  addToCheckedArray: (id: number) => set((state) => ({ historyCheckedArray: [...state.historyCheckedArray, id] })),
  filterToCheckedArray: (id: number) => set((state) => ({
  historyCheckedArray: state.historyCheckedArray.filter((item) => item !== id),
  })),
  historyDeleteModalOpen: false,
  setHistoryDeleteModalOpen: () => set((state) => ({ historyDeleteModalOpen: !state.historyDeleteModalOpen })),
}));

export default useUIState;
