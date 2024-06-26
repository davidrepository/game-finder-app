import { create } from "zustand";
import { AlignmentType } from "@/types";
import { AlignmentStoreTypes } from "./types";

const getAlignment = () => {
  if (typeof window !== "undefined") {
    const alignment = localStorage.getItem("alignment") || "list";
    return alignment;
  }
};

export const useAlignmentStore = create<AlignmentStoreTypes>(
  (set: any, get: any) => ({
    alignment: getAlignment(),
    setAlignment: (v: AlignmentType) => {
      set(() => {
        if (typeof window !== "undefined") {
          localStorage.setItem("alignment", v);
          return {
            alignment: v,
          };
        }
      });
    },
  })
);
