import type { NextApiRequest, NextApiResponse } from "next";
import { Player } from "../../../types/teams";

type ApiResponse = {
  id: string | string[];
  name: string;
  players: Player[];
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
    players: new Array(5).fill(makePlayer()),
  });
}

// mock data for now
const makePlayer = (): Player => {
  return {
    name: (Math.random() + 1).toString(36).substring(7),
    roles: {
      top: {
        champions: [(Math.random() + 1).toString(36).substring(7)],
        preference: 1,
      },
    },
  };
};
