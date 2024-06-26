"use client";
import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";

import { useListStore } from "@/store";
import { InitialData, Options, UseListReturn } from "./types";

export const useList = (
  initialData: InitialData | null = [],
  options: Options = {}
): UseListReturn => {
  const [data, setData] = useListStore(
    useShallow((s: any) => [s.data, s.setData])
  );

  useEffect(() => {
    if (initialData?.length) {
      setData(initialData);
    }
  }, [initialData]);

  return {
    data,
  };
};
