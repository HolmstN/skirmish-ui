import type { NextApiRequest, NextApiResponse } from "next";
import { Tag } from "../../../../types/teams";

type ApiResponse = {
  teamName: string;
  tags: Tag[];
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;
  // fetch from mongo by Id
  return res.status(200).json({
    teamName: "My Team Name",
    tags: new Array(5).fill({}).map((_, i) => makeTag(`test-${i}`, i)),
  });
}

// mock data for now
const makeTag = (id: string, i: number): Tag => {
  return {
    id,
    metadata: {
      color: colorMap[i],
    },
  };
};

const colorMap = [
  "bg-green-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-teal-500",
  "bg-violet-500",
];
