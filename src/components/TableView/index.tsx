import { useShallow } from "zustand/react/shallow";
import { Box } from "@mui/material";

import { useListStore } from "@/store";
import { useViewportWidth } from "@/hooks";
import { List } from "@/components";

export const TableView: any = (): any => {
  const [visibleData] = useListStore(useShallow((s: any) => [s.visibleData]));
  const isWide = useViewportWidth();

  return (
    <Box sx={{ pt: 3, pb: isWide ? 15 : 21 }}>
      <List visibleData={visibleData} />
    </Box>
  );
};
