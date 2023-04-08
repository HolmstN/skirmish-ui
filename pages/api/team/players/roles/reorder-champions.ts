import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../../lib/mongo";

type ApiResponse = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { email, role, champions } = req.body;

  if (!email) {
    return res
      .status(400)
      .send({ message: "email not provided but is required" });
  }

  if (!role) {
    return res
      .status(400)
      .send({ message: "role not provided but is required" });
  }

  if (!champions || typeof champions !== "object" || !champions.length) {
    return res.status(400).send({
      message: "champions must be provided as an array with order guaranteed",
    });
  }

  const db = (await clientPromise).db("skirmish");
  const teams = db.collection("teams");

  teams.updateOne(
    { "players.email": email },
    {
      $set: { [`players.$.roles.${role}.champions`]: champions },
    }
  );

  return res.status(200).send({ message: "success", champions });
}
