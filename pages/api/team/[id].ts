import type { NextApiRequest, NextApiResponse } from "next";

type CreateTeamParams = {
  name: string;
  players: string[];
};

type ApiResponse = {
  id: string | string[];
  name: string;
  players: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;
  // fetch from mongo by Id
  return res
    .status(200)
    .json({ id, name: "something", players: ["1", "2", "3", "4", "5"] });
}
