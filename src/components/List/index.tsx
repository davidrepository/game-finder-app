import { Box } from "@mui/material";
import { GameCard, NoData } from "@/components";
import { ListTypes } from "./types";

export const List = ({ visibleData }: ListTypes) => {
  return (
    <Box
      component="ul"
      sx={{ display: "flex", flexDirection: "column", gap: 1 }}
    >
      {visibleData?.length ? (
        visibleData?.map((item: any, index: number) => {
          return <GameCard key={item.id} data={item} />;
        })
      ) : (
        <NoData />
      )}
    </Box>
  );
};
