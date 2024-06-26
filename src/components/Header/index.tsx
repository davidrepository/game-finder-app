"use client";
import Link from "next/link";
import { useShallow } from "zustand/react/shallow";
import { useParams } from "next/navigation";
import { Box, Button, ButtonGroup, TextField } from "@mui/material";

import { AlignmentType } from "@/types";
import { useListStore } from "@/store";
import { useAlignmentStore, useHasHydrated } from "@/hooks";
import styles from "@/modules/page.module.css";

export const Header = () => {
  const params = useParams();
  const [searchByName, searchValue, clearSearch, setPageSize] = useListStore(
    useShallow((s: any) => [
      s.searchByName,
      s.searchValue,
      s.clearSearch,
      s.setPageSize,
    ])
  );
  const [alignment, setAlignment] = useAlignmentStore(
    useShallow((s: any) => [s.alignment, s.setAlignment])
  );
  const hasHydrated = useHasHydrated();

  const handleChangeAlignment: any = (newAlignment: AlignmentType) => {
    setAlignment(newAlignment);
    clearSearch();
    setPageSize(10);
  };

  return (
    <Box
      component="header"
      className={styles.header}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        py: 3,
      }}
    >
      {params.id ? (
        <Button component={Link} variant="outlined" href="/">
          Go back
        </Button>
      ) : (
        <>
          <TextField
            type="text"
            variant="outlined"
            placeholder="What game you looking for?"
            value={searchValue}
            onChange={(e) => searchByName(e.target.value)}
            sx={{ width: "100%" }}
          />

          {hasHydrated && (
            <ButtonGroup variant="outlined" aria-label="Basic button group">
              <Button
                variant={alignment === "list" ? "contained" : "outlined"}
                onClick={() => handleChangeAlignment("list")}
              >
                List
              </Button>
              <Button
                variant={alignment === "table" ? "contained" : "outlined"}
                onClick={() => handleChangeAlignment("table")}
              >
                Table
              </Button>
            </ButtonGroup>
          )}
        </>
      )}
    </Box>
  );
};
