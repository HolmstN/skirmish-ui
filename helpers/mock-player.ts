import { Player, PlayerUi, Role } from "../types/teams";

export const mockPlayer = (name: string): PlayerUi => {
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
        championKey: c,
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
