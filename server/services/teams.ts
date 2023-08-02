import pool from "../db/pool";
import { TournamentPlayers, Teams, Users, Tournaments } from "../db/schema";
import { Service } from "./service";

type TeamWithPlayers = Teams & {
  rosteredTournaments: string[];
  players: (Pick<TournamentPlayers, "gamedata"> &
    Pick<Users, "id" | "username">)[];
};
export const getAllTeams: Service<{}, TeamWithPlayers[]> = async (
  { limit, offset } = { limit: "20" }
) => {
  const query = `
    SELECT 
      t.id as team_id, 
      t.name as team_name,
      t.logo,
      tp.gamedata,
      u.id as player_id,
      u.username,
      tn.name as tournament_name
    FROM teams t
    LEFT OUTER JOIN tournament_players tp ON t.id = tp.team_id
    LEFT OUTER JOIN tournaments tn ON tn.id = tp.tournament_id
    LEFT OUTER JOIN users u ON tp.player_id = u.id
    LIMIT ${limit}
    ${offset ? `OFFSET ${offset}` : ""}
  `;

  try {
    const res = await pool.query(query);
    const teams_players = res.rows as {
      team_id: Teams["id"];
      team_name: Teams["name"];
      logo: Teams["logo"];
      gamedata: TournamentPlayers["gamedata"];
      player_id: Users["id"];
      username: Users["username"];
      tournament_name: Tournaments["name"];
    }[];

    const teamsObj = teams_players.reduce((acc, tp) => {
      if (!acc[tp.team_id]) {
        acc[tp.team_id] = {
          id: tp.team_id,
          name: tp.team_name,
          logo: tp.logo,
          rosteredTournaments: new Set(),
          players: [],
        };
      }

      if (tp.tournament_name) {
        acc[tp.team_id].rosteredTournaments.add(tp.tournament_name);
      }

      if (tp.player_id) {
        acc[tp.team_id].players.push({
          gamedata: tp.gamedata,
          id: tp.player_id,
          username: tp.username,
        });
      }

      return acc;
    }, {} as { [k: string]: Omit<TeamWithPlayers, "rosteredTournaments"> & { rosteredTournaments: Set<string> } });

    return Object.values(teamsObj).map((t) => ({
      ...t,
      rosteredTournaments: Array.from(t.rosteredTournaments),
    }));
  } catch (e) {
    console.error(e);
    return [];
  }
};
