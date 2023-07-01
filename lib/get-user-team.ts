import clientPromise from "./mongo";
import { Session } from "next-auth";

type GetUserTeamOptions = {
  resolvePlayers?: boolean;
};
export const getUserTeam = async (
  session: Session,
  options: GetUserTeamOptions = {}
) => {
  const db = (await clientPromise).db("skirmish");
  const teamsCollection = db.collection("teams");

  const userTeam = await teamsCollection.findOne({
    $or: [
      { owner: session.user?.email },
      { players: { email: session.user?.email } },
    ],
  });

  const now = new Date();

  const teamTournament = {
    title: "Skirmish Monthly",
    when: {
      start: now.setDate(now.getDate() + 5),
      end: now.setDate(now.getDate() + 25),
    },
    division: {
      tier: 1,
      standings: {
        adadwad: { wins: [], losses: [] },
      },
    },
  };

  let players: any[] = userTeam?.players;

  if (options.resolvePlayers) {
    const users = db.collection("users");
    const ps = await Promise.all(
      userTeam?.players.map(
        async ({ email }: { email: string }) => await users.findOne({ email })
      )
    );

    players = players.map((p, i) => ({
      ...p,
      ...ps[i],
      _id: ps[i]._id.toString(),
    }));
  }

  return {
    ...userTeam,
    _id: userTeam?._id.toString(),
    players,
    tournament: teamTournament,
  };
};
