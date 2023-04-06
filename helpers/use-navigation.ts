import { useRouter } from "next/router";
import { Team } from "../types/teams";

type Params = {
  team?: Team;
};
export const useNavigation = ({ team }: Params) => {
  const router = useRouter();

  const nav = [
    {
      name: "Dashboard",
      href: `/dashboard`,
      current: router.pathname.includes("dashboard"),
    },
  ];

  if (team?.name) {
    nav.push({
      name: "Team Manager",
      href: `/team/${encodeURIComponent(team.name)}/team-manager`,
      current: router.pathname.includes("team-manager"),
    });
  }

  return nav;
};

/*
{
      name: "Tags",
      href: `/team/${user.team}/tags`,
      current: router.pathname.includes("tags"),
    },
*/
