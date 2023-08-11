import pool from "../db/pool";
import { Tournaments } from "../db/schema";
import { Service } from "./service";

export const getTournamentById: Service<{ id: string }, Tournaments> = async ({
  id,
  limit,
  offset,
}) => {
  const query = `
    SELECT *
    FROM tournaments
    WHERE id = $1
    LIMIT ${limit || 20}
    ${offset ? `OFFSET ${offset}` : ""}
  `;

  try {
    const res = await pool.query(query, [id]);
    return { value: res.rows[0], error: null };
  } catch (e) {
    console.error(e);
    return { value: null, error: "Could not get tournament" };
  }
};
