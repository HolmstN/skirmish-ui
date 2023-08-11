import pool from "../db/pool";
import { UserGamedata, Users } from "../db/schema";
import { Service } from "./service";

type Response = UserGamedata & Users;
export const getAllPlayerGamedata: Service<{}, Response[]> = async (
  { limit, offset } = { limit: "20" }
) => {
  const query = `
    SELECT *
    FROM users u
    LEFT OUTER JOIN user_gamedata ud ON u.id = ud.user_id
    LIMIT ${limit}
    ${offset ? `OFFSET ${offset}` : ""}
  `;

  try {
    const res = await pool.query(query);
    return res.rows as Response[];
  } catch (e) {
    console.error(e);
    return [];
  }
};
