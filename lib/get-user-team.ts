import clientPromise from "./mongo";
import { Session } from "next-auth";

export const getUserTeam = async (session: Session) => {
  const db = (await clientPromise).db("skirmish");
  const teamsCollection = db.collection("teams");

  const userTeam = await teamsCollection.findOne({
    $or: [
      { owner: session.user?.email },
      { players: { email: session.user?.email } },
    ],
  });

  return { ...userTeam, _id: userTeam?._id.toString() };
};
