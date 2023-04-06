import { Team } from "./teams";

export type User = {
  name: string;
  team?: Team;
  image: string;
  email: string;
};
