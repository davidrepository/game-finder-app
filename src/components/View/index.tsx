"use client";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/react/shallow";
import { Box, CircularProgress } from "@mui/material";

import { useAlignmentStore, useList } from "@/hooks";
import { ListView, TableView } from "@/components";
import { AlignmentType } from "@/types";

const Loading = () => {
  return (
    <Box sx={{ pt: 3, display: "flex", justifyContent: "center" }}>
      <CircularProgress />
    </Box>
  );
};

export const View = ({ initialData }: any) => {
  useList(initialData);
  const [alignment] = useAlignmentStore(useShallow((s: any) => [s.alignment]));
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const switchComponent = (alignment: AlignmentType) => {
    const comps = {
      list: <ListView />,
      table: <TableView />,
    };

    return comps[alignment] || null;
  };

  return <div>{isHydrated ? switchComponent(alignment) : <Loading />}</div>;
};
