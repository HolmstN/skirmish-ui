import { Champion } from "../types/teams";

export const champImageUri = (champion: Champion) => {
  return `http://ddragon.leagueoflegends.com/cdn/13.6.1/img/champion/${champion.image.full}`;
};
