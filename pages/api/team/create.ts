import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";
import { ObjectId } from "mongodb";

type CreateTeamParams = {
  name: string;
  players: string[];
};

type ApiResponse =
  | {
      id: ObjectId;
    }
  | {
      error: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { name, players } = req.body as CreateTeamParams;
  console.log(req.body);
  try {
    const db = (await clientPromise).db("skirmish");
    const { insertedId: id } = await db
      .collection("teams")
      .insertOne({ name, players });
    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "could not create team" });
  }
}
