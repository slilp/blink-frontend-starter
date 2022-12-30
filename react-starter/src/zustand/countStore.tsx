import create from "zustand";

export type State = {
  count: number;
  count2: number;
};

type Actions = {
  inc: () => void;
  inc2: () => void;
};

const countStore = create<State & Actions>((set) => ({
  count: 1,
  count2: 0,
  inc: () => set((state) => ({ count: state.count + 1 })),
  inc2: async () => {
    // we can fetching data here
    set({ count2: 500 });
  },
}));

export default countStore;
