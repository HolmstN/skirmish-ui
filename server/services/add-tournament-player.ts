import pool from "../db/pool";
import { Tournaments } from "../db/schema";
import { Service } from "./service";

type Params = {
  playerId: string;
  tournamentId: number;
  gamedata: { role?: string };
};
export const addTournamentPlayer: Service<Params, Tournaments> = async ({
  playerId,
  tournamentId,
  gamedata,
}) => {
  const query = `
    INSERT INTO tournament_players (player_id, tournament_id, gamedata)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  try {
    const res = await pool.query(query, [playerId, tournamentId, gamedata]);
    return { value: res.rows[0], error: null };
  } catch (e) {
    console.error(e);
    return {
      value: null,
      error: "Could not create player/coach for tournament",
    };
  }
};
