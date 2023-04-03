import type { NextApiRequest, NextApiResponse } from "next";

type ApiResponse = {
  id?: string | string[];
  name: string;
  team: number;
  imageUrl: string;
  teamName: string;
  email: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const { id } = req.query;
  return res.status(200).json({
    id,
    name: "Luke Skywalker",
    team: 1,
    teamName: "The Jedi",
    email: "luke@jedi.com",
    imageUrl:
      "https://lumiere-a.akamaihd.net/v1/images/Lightsaber_853fb596.jpeg",
  });
}
