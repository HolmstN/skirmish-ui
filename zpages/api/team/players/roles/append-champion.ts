import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../../../lib/mongo";

type ApiResponse = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { email, role, champion } = req.body;

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

  if (!champion || typeof champion !== "string") {
    return res.status(400).send({
      message:
        "champion not provided but is required, or champion was not a string representing champion name",
    });
  }

  const db = (await clientPromise).db("skirmish");
  const teams = db.collection("teams");

  teams.updateOne(
    { "players.email": email },
    {
      $addToSet: { [`players.$.roles.${role}.champions`]: champion },
    }
  );

  return res.status(200).send({ message: "success" });
}
