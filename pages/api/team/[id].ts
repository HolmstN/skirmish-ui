import type { NextApiRequest, NextApiResponse } from "next";
import { Player, PlayerUi, Role } from "../../../types/teams";

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
    players: new Array(5).fill({}).map((_, i) => makePlayer(`test-${i}`)),
  });
}

// mock data for now
const makePlayer = (name: string): PlayerUi => {
  const p: Player = {
    name,
    roles: {
      top: {
        champions: ["Teemo", "Darius", "Blitzcrank", "Ornn"],
        preference: 1,
      },
      jg: {
        champions: ["Shaco"],
        preference: 2,
      },
      mid: {
        champions: ["Aurelion Sol"],
        preference: 3,
      },
      adc: {
        champions: ["Nilah"],
        preference: 4,
      },
      sup: {
        champions: ["Nautilus"],
        preference: 5,
      },
    },
  };

  const orderedRoles = Object.entries(p.roles).sort(
    (pra, prb) => pra[1].preference - prb[1].preference
  );

  const roles = Object.fromEntries(
    orderedRoles.map((or) => {
      const champDetails = or[1].champions.map((c, i) => ({
        name: c,
        preference: i,
      }));

      return [or[0], { champions: champDetails, preference: or[1].preference }];
    })
  );

  return {
    ...p,
    roles,
    preferredRole: orderedRoles[0][0] as Role,
  };
};
