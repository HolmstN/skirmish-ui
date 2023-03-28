import type { NextApiRequest, NextApiResponse } from "next";

type CreateTeamParams = {
  name: string;
  players: string[];
};

type ApiResponse = {
  name: string;
  players: string[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { name, players } = req.body as CreateTeamParams;
  return res.status(200).json({ name, players });
}
