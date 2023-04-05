import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import clientPromise from "../../../lib/mongo";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  adapter: MongoDBAdapter(clientPromise, {
    databaseName: "skirmish",
  }),
  // Configure one or more authentication providers
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID as string,
      clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, user, token }) {
      if (token.team) {
        // @ts-expect-error
        session.user.team = token.team;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const db = (await clientPromise).db("skirmish");
        const teams = db.collection("teams");
        const query = { players: user.name };
        const team = await teams.findOne(query);
        if (team) {
          console.log("adding team to jwt");
          token.team = team._id;
        }
      }

      return token;
    },
  },
};
export default NextAuth(authOptions);
