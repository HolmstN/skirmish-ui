import { DefaultAdapter } from "next-auth/adapters";
import { Pool } from "pg";
import chalk from "chalk";

export const PostgresAdapter = (client: Pool, options = {}): DefaultAdapter => {
  return {
    async createUser(user) {
      console.log(chalk.blue("adapter createUser"));
      try {
        const sql = `
          INSERT INTO users (name, email, email_verified, image) 
          VALUES ($1, $2, $3, $4) 
          RETURNING id, name, email, email_verified, image`;
        let result = await client.query(sql, [
          user.name,
          user.email,
          user.emailVerified,
          user.image,
        ]);

        return result.rows[0];
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async getUser(id) {
      console.log(chalk.blue("adapter getUser"));

      try {
        const sql = `select * from users where id = $1`;
        let result = await client.query(sql, [id]);
        return result.rows[0];
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async getUserByEmail(email) {
      console.log(chalk.blue("adapter getUserByEmail"));

      try {
        const sql = `select * from users where email = $1`;
        let result = await client.query(sql, [email]);
        return result.rows[0];
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async getUserByAccount({ providerAccountId, provider }) {
      try {
        const sql = `
            select u.* from users u join accounts a on u.id = a.user_id 
            where 
            a.provider = $1 
            and 
            a.provider_account_id = $2`;

        const result = await client.query(sql, [provider, providerAccountId]);
        return result.rows[0];
      } catch (err) {
        console.log(chalk.red(err));
      }
    },
    async updateUser(user) {
      console.log(chalk.blue("adapter updateUser"));

      try {
        const updates = [
          ["email", user.email],
          ["email_verified", user.emailVerified],
          ["image", user.image],
          ["name", user.name],
        ].filter(([_, v]) => !!v);

        if (!updates.length) {
          throw new Error("no user update sent");
        }

        const sets = updates.reduce((acc, [sqlKey, _], i) => {
          return acc + `${sqlKey} = $${i + 2}\n`;
        }, "");
        const sql = `
            UPDATE users u
            SET ${sets}
            WHERE u.id = $1
            RETURNING *
        `;

        const result = await client.query(sql, [
          user.id,
          user.email,
          user.emailVerified,
          user.image,
          user.name,
        ]);
        return result.rows[0];
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async linkAccount(account) {
      console.log(chalk.blue("adapter linkAccount"));

      try {
        const sql = `
          insert into accounts 
          (
            user_id, 
            type,
            provider,
            provider_account_id, 
            refresh_token,
            access_token,
            expires_at,
            token_type,
            scope, 
            id_token,
            session_state
          )
          values ($1, $2, $3, $4, $5, $6, to_timestamp($7), $8, $9, $10, $11)`;

        const params = [
          account.userId,
          account.type,
          account.provider,
          account.providerAccountId,
          account.refresh_token,
          account.access_token,
          account.expires_at,
          account.token_type,
          account.scope,
          account.id_token,
          account.session_state,
        ];

        await client.query(sql, params);
        return account;
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async createSession({ sessionToken, userId, expires }) {
      console.log(chalk.blue("adapter createSession"));

      try {
        const sql = `insert into sessions (user_id, expires, session_token) values ($1, $2, $3)`;
        await client.query(sql, [userId, expires, sessionToken]);
        return { sessionToken, userId, expires };
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async getSessionAndUser(sessionToken) {
      console.log(chalk.blue("adapter getSessionAndUser"));

      try {
        let result;
        result = await client.query(
          "select * from sessions where session_token = $1",
          [sessionToken]
        );

        let session = result.rows[0];

        result = await client.query("select * from users where id = $1", [
          session.user_id,
        ]);
        let user = result.rows[0];

        return {
          session,
          user,
        };
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },
    async updateSession({ sessionToken, userId, expires }) {
      console.log(chalk.blue("adapter updateSession"));

      const sql = `
        UPDATE sessions
        SET session_token = $1, expires = $2
        WHERE user_id = $3
        RETURNING *
      `;

      try {
        const result = await client.query(sql, [sessionToken, expires, userId]);
        return result.rows[0];
      } catch (e) {
        console.log(e);
        return;
      }
    },
    async deleteSession(sessionToken) {
      console.log(chalk.blue("adapter deleteSession"));

      try {
        const sql = `delete from sessions where session_token = $1`;
        await client.query(sql, [sessionToken]);
      } catch (err) {
        console.log(chalk.red(err));
        return;
      }
    },

    async createVerificationToken({ identifier, expires, token }) {
      console.log(chalk.blue("adapter createVerificationToken"));

      const sql = `
            INSERT INTO verification_tokens (identifier, token, expires)
            VALUES ($1, $2, $3)
            RETURNING *
        `;

      try {
        const result = await client.query(sql, [identifier, token, expires]);
        return result.rows;
      } catch (e) {
        console.log(e);
        return;
      }
    },
    async useVerificationToken({ identifier, token }) {
      console.log(chalk.blue("adapter useVerificationToken"));

      const sql = `
            DELETE FROM verification_tokens
            WHERE identifer = $1 AND token = $2
            RETURNING *
        `;
      try {
        const result = await client.query(sql, [identifier, token]);
        return result.rows[0];
      } catch (e) {
        console.log(e);
        return;
      }
    },
  };
};

export default PostgresAdapter;
