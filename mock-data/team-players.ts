import { players } from "./players";

const teamPlayers = [
  { teamId: 1, playerUserId: 2, role: 2 },
  { teamId: 1, playerUserId: 3, role: 3 },
  { teamId: 1, playerUserId: 4, role: 4 },
  { teamId: 1, playerUserId: 5, role: 5 },
  { teamId: 2, playerUserId: 6, role: 1 },
  { teamId: 2, playerUserId: 7, role: 2 },
  { teamId: 2, playerUserId: 8, role: 3 },
  { teamId: 2, playerUserId: 9, role: 4 },
];

export const teamPlayersByTeam = teamPlayers.reduce((acc, tp) => {
  if (!acc[tp.teamId]) {
    acc[tp.teamId] = [];
  }

  const player = players.find((p) => p.id === tp.playerUserId);
  acc[tp.teamId].push({ ...tp, ...player });
  return acc;
}, {});
