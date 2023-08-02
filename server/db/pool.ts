import { Pool } from "pg";

const pool = new Pool({});

pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  client.release();
});

export default pool;
