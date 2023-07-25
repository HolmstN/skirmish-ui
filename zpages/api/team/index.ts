import type { NextApiRequest, NextApiResponse } from "next";
import { Player, PlayerUi, Role } from "../../../types/teams";
import { mockPlayer } from "../../../helpers/mock-player";
import { getUserTeam } from "../../../lib/get-user-team";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Tournament } from "../../../types/tournament";

type ApiResponse =
  | {
      id?: string | string[];
      name: string;
      players: PlayerUi[];
    }
  | {
      message: string;
    };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse>
) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).send({ message: "use must be authenticated" });
    return;
  }

  const team = await getUserTeam(session, { resolvePlayers: true });

  // @ts-expect-error todo: better type handlings
  res.status(200).send({ ...team });
}
