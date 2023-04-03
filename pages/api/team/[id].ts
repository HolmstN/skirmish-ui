import type { NextApiRequest, NextApiResponse } from "next";
import { Player, PlayerUi, Role } from "../../../types/teams";
import { mockPlayer } from "../../../helpers/mock-player";

type ApiResponse = {
  id?: string | string[];
  name: string;
  players: PlayerUi[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;
  // fetch from mongo by Id
  return res.status(200).json({
    id,
    name: "A Team Name",
    players: new Array(5).fill({}).map((_, i) => mockPlayer(`test-${i}`)),
  });
}

// mock data for now
