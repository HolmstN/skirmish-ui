import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

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
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({ error: "You must be logged in." });
    return;
  }

  const { name, players } = req.body;
  try {
    const db = (await clientPromise).db("skirmish");
    const { insertedId: id } = await db
      .collection("teams")
      .insertOne({ name, players, owner: session.user?.email });
    return res.status(200).json({ id });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "could not create team" });
  }
}
