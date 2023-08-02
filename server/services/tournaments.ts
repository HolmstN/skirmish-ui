import pool from "../db/pool";
import { Tournaments } from "../db/schema";
import { Service } from "./service";

export const getAllTournaments: Service<{}, Tournaments[]> = async (
  { limit, offset } = { limit: "20" }
) => {
  const query = `
    SELECT *
    FROM tournaments
    LIMIT ${limit}
    ${offset ? `OFFSET ${offset}` : ""}
  `;

  try {
    const res = await pool.query(query);
    return res.rows;
  } catch (e) {
    console.error(e);
    return [];
  }
};
