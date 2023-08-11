import { createContext } from "react";
import { Champion } from "../../types/teams";

export const ChampionContext = createContext<{ [k: string]: Champion }>({});
