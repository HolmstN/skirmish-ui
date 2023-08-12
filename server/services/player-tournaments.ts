import chalk from "chalk";
import pool from "../db/pool";
import { TournamentPlayers, Tournaments } from "../db/schema";
import { Service } from "./service";

type PlayerTournament = TournamentPlayers["gamedata"] & Tournaments;
export const getPlayerTournaments: Service<
  { id: string },
  PlayerTournament[]
> = async (params) => {
  const { id } = params;
  const query = `
    SELECT tp.gamedata as player_gamedata, t.*
    FROM tournament_players tp
    INNER JOIN tournaments t ON tp.tournament_id = t.id
    WHERE player_id = $1
    LIMIT 20
  `;

  try {
    const res = await pool.query(query, [id]);
    return { value: res.rows as PlayerTournament[], error: null };
  } catch (e) {
    console.error(e);
    console.log(chalk.red(e));
    return { value: null, error: "Could not fetch Player Tournaments" };
  }
};
