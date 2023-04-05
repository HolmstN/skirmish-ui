import { useRouter } from "next/router";
import { useUserSession } from "./use-user-session";

export const useNavigation = () => {
  const user = useUserSession();
  const router = useRouter();

  const nav = [
    {
      name: "Dashboard",
      href: `/dashboard`,
      current: router.pathname.includes("dashboard"),
    },
  ];
  if (user.team) {
    nav.push({
      name: "Team Manager",
      href: `/team/${user.team}/team-manager`,
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
