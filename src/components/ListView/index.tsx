import { useShallow } from "zustand/react/shallow";
import { Box, Button } from "@mui/material";

import { useListStore } from "@/store";
import { List } from "@/components";

export const ListView: any = () => {
  const [visibleData, loadMore, totalPages, totalItems] = useListStore(
    useShallow((s: any) => [
      s.visibleData,
      s.loadMore,
      s.totalPages,
      s.totalItems,
    ])
  );

  return (
    <Box sx={{ py: 3 }}>
      <List visibleData={visibleData} />

      {visibleData?.length &&
      totalPages !== 1 &&
      visibleData?.length !== totalItems ? (
        <Button
          variant="outlined"
          onClick={loadMore}
          sx={{ width: "100%", mt: 1 }}
        >
          Load More
        </Button>
      ) : null}
    </Box>
  );
};
