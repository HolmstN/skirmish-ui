import { getServerSession } from "next-auth/next";
import { getPlayerTournaments } from "../server/services/player-tournaments";
import { NavLinks } from "./components/client/nav-links";
import { authOptions } from "./api/auth/[...nextauth]/route";

export async function getData() {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    return [];
  }

  const { value, error } = await getPlayerTournaments({ id: session?.user.id });

  if (error || !value) {
    return [];
  }

  return value;
}

export const Sidebar = async () => {
  const tournaments = await getData();

  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto bg-sky-800 dark:bg-slate-900 px-6 pb-4 dark:border-r dark:border-slate-800">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
          alt="Your Company"
        />
      </div>
      <NavLinks tournaments={tournaments} />
    </div>
  );
};
