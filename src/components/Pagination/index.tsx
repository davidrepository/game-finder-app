"use client";
import { useShallow } from "zustand/react/shallow";
import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

import { PAGE_SIZE } from "@/constants";
import { useViewportWidth } from "@/hooks";
import { useListStore } from "@/store";
import styles from "@/modules/page.module.css";
import { useEffect, useLayoutEffect } from "react";

export const Pagination = () => {
  const [currentPage, totalPages, totalItems, pageSize, setPage, setPageSize] =
    useListStore(
      useShallow((s: any) => [
        s.currentPage,
        s.totalPages,
        s.totalItems,
        s.pageSize,
        s.setPage,
        s.setPageSize,
      ])
    );
  const isViewportWide = useViewportWidth();

  return (
    <Paper
      className={styles.pagination}
      sx={{
        mb: 2,
        p: 2,
        gap: 2,
        display: "flex",
        flexDirection: "column",
        userSelect: "none",
      }}
    >
      <Box
        sx={
          isViewportWide
            ? {
                display: "flex",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)",
              }
            : {
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }
        }
      >
        <IconButton
          color="primary"
          aria-label="first-page"
          onClick={() => setPage(1)}
          disabled={currentPage === 1}
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="previous-page"
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <KeyboardArrowLeftIcon />
        </IconButton>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "3rem",
          }}
        >
          <span>{currentPage}</span>
        </Box>
        <IconButton
          color="primary"
          aria-label="next-page"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <KeyboardArrowRightIcon />
        </IconButton>
        <IconButton
          color="primary"
          aria-label="last-page"
          onClick={() => setPage(totalPages)}
          disabled={currentPage === totalPages}
        >
          <LastPageIcon />
        </IconButton>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: isViewportWide ? "space-between" : "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        {isViewportWide && (
          <Typography variant="overline" display="block">
            {currentPage}/{totalPages} page • {totalItems} items
          </Typography>
        )}

        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="overline" display="block">
            Page size
          </Typography>
          <Select
            className="select"
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
          >
            {PAGE_SIZE.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
    </Paper>
  );
};
