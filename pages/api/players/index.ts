import type { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../../lib/mongo";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const search = req.body.search;

  const db = (await clientPromise).db("skirmish");
  const users = db.collection("users");

  const userList = await users
    .aggregate([
      {
        $search: {
          autocomplete: {
            query: search,
            path: "name",
            fuzzy: {
              maxEdits: 2,
              prefixLength: 3,
            },
          },
        },
      },
      { $limit: 20 },
    ])
    .toArray();

  return res.status(200).json(userList);
}
