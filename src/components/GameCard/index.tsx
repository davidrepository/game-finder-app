import Link from "next/link";
import { Box, Paper, Typography } from "@mui/material";

import { Image } from "@/components";
import { GameCardTypes } from "./types";

export const GameCard = ({ data, ...rest }: GameCardTypes) => {
  return (
    <Link href={`/game/${data.id}`} {...rest}>
      <Paper
        component="li"
        className="game-card"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 3,
          p: 1.2,
        }}
        elevation={0}
      >
        <Box
          sx={{
            position: "relative",
            width: "12rem",
            aspectRatio: "4/3",
            overflow: "auto",
          }}
        >
          {data.icon_2.length && <Image src={data.icon_2} alt={`X`} fill />}
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="overline" display="block">
            {data.id}
          </Typography>
          <Typography variant="h5">{data.name}</Typography>
        </Box>
      </Paper>
    </Link>
  );
};
