"use client";
import { useParams } from "next/navigation";
import { useShallow } from "zustand/react/shallow";
import {
  Avatar,
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";

import { Image } from "@/components";
import { useListStore } from "@/store";
import { GameTypes } from "./types";

export default function Game() {
  const params = useParams();
  const [getGameById] = useListStore(useShallow((s: any) => [s.getGameById]));
  const game: GameTypes = getGameById(params.id) || {};

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, my: 2 }}>
        <Typography variant="h4" sx={{ pb: 6 }}>
          {game.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              position: "relative",
            }}
          >
            <Avatar
              src={game.icon_2}
              variant="square"
              sx={{
                marginBottom: "2rem",
                width: "50%",
                aspectRatio: "4/3",
                height: "auto",
              }}
            />
            <Box
              sx={{ width: "100%", position: "relative", aspectRatio: "16/9" }}
            >
              <Image
                component="img"
                src={game.background}
                fill
                alt="Background"
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6">Game Information</Typography>
            <List>
              <ListItem>
                <ListItemText primary="ID" secondary={game.id} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Server Game ID"
                  secondary={game.server_game_id}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="External Game ID"
                  secondary={game.external_game_id}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Front Game ID"
                  secondary={game.front_game_id}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ratio" secondary={game.ratio} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Status" secondary={game.status} />
              </ListItem>
              <ListItem>
                <ListItemText primary="Provider" secondary={game.provider} />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Show As Provider"
                  secondary={game.show_as_provider}
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Provider Title"
                  secondary={game.provider_title}
                />
              </ListItem>
            </List>
            <Typography variant="h6">Categories</Typography>
            <List>
              {game.cats?.map((cat: any) => (
                <ListItem key={cat.id}>
                  <ListItemText primary={cat.title} />
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}
