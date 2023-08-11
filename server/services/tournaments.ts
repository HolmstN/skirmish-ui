import pool from "../db/pool";
import { Tournaments } from "../db/schema";
import { Service } from "./service";

export const getAllTournaments: Service<{}, Tournaments[]> = async ({
  limit,
  offset,
}) => {
  const query = `
    SELECT *
    FROM tournaments
    LIMIT ${limit || 20}
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