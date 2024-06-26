export interface GameTypes {
  id?: string;
  name?: string;
  server_game_id?: string;
  external_game_id?: string;
  front_game_id?: string;
  ratio?: string;
  status?: string;
  provider?: string;
  show_as_provider?: string;
  provider_title?: string;
  icon_2?: string;
  background?: string;
  cats?: Array<{ id: string; title: string }>;
}
