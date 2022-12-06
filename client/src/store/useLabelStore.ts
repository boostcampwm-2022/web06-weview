import create from "zustand";
import { devtools } from "zustand/middleware";

import { Label } from "@/types/search";

interface SearchStore {
  labels: Label[];
  setLabels: (labels: Label[]) => void;
}

const useLabelStore = create<SearchStore>()(
  devtools((set) => ({
    labels: [],
    setLabels: (labels) => {
      set({
        labels,
      });
    },
  }))
);

export default useLabelStore;
