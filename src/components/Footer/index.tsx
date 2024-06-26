"use client";
import { useParams } from "next/navigation";
import { Box, Container } from "@mui/material";
import { useShallow } from "zustand/react/shallow";

import { useAlignmentStore, useHasHydrated } from "@/hooks";
import { Pagination } from "@/components";
import styles from "@/modules/page.module.css";

export const Footer = () => {
  const params = useParams();
  const [alignment] = useAlignmentStore(useShallow((s: any) => [s.alignment]));
  const hasHydrated = useHasHydrated();

  return hasHydrated && alignment === "table" && !params.id ? (
    <Box className={styles.footer}>
      <Container>
        <Pagination />
      </Container>
    </Box>
  ) : null;
};
