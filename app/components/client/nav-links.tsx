"use client";

import {
  Cog6ToothIcon,
  GlobeAltIcon,
  HomeIcon,
  RocketLaunchIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";
import { tournaments as mockTournaments } from "../../../mock-data/tournaments";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  {
    name: "Tournaments",
    href: "/tournaments",
    icon: GlobeAltIcon,
  },
  { name: "Teams", href: "/teams", icon: RocketLaunchIcon },
  { name: "Players", href: "/players", icon: UsersIcon },
];

const tournaments = mockTournaments;

export const NavLinks = () => {
  return (
    <nav className="flex flex-1 flex-col">
      <ul role="list" className="flex flex-1 flex-col gap-y-7">
        <li>
          <ul role="list" className="-mx-2 space-y-1">
            {navigation.map((item) => (
              <TopLevelNavLink
                name={item.name}
                href={item.href}
                Icon={item.icon}
              />
            ))}
          </ul>
        </li>
        <li>
          <div className="text-xs font-semibold leading-6 text-sky-200 dark:text-slate-300">
            Your Tournaments
          </div>
          <ul role="list" className="-mx-2 mt-2 space-y-1">
            {tournaments.map((tournament) => (
              <TournamentNavLink
                name={tournament.name}
                href={`/dashboard/tournament/${tournament.id}`}
                initial={tournament.initial}
              />
            ))}
          </ul>
        </li>
        <li className="flex-1 flex flex-col justify-end">
          <div>
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-sky-200 dark:text-slate-300 hover:bg-sky-700 hover:dark:bg-slate-800 hover:text-white"
            >
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-sky-200 dark:text-slate-300 group-hover:text-white"
                aria-hidden="true"
              />
              Settings
            </a>
          </div>
        </li>
      </ul>
    </nav>
  );
};

type TopLevelNavLinkProps = {
  name: string;
  href: string;
  Icon: typeof Cog6ToothIcon;
};

const TopLevelNavLink: React.FC<TopLevelNavLinkProps> = ({
  name,
  href,
  Icon,
}) => {
  const pathname = usePathname();
  const isActive = href.includes("dashboard")
    ? pathname === "/dashboard"
    : pathname.startsWith(href);

  return (
    <li key={name}>
      <a
        href={href}
        className={classNames(
          isActive
            ? "bg-sky-700 dark:bg-slate-800 text-white"
            : "text-sky-200 dark:text-slate-300 hover:text-white hover:bg-sky-700 hover:dark:bg-slate-800",
          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
        )}
      >
        <Icon
          className={classNames(
            isActive
              ? "text-white dark:text-slate-200"
              : "text-sky-200 dark:text-slate-300 group-hover:text-white",
            "h-6 w-6 shrink-0"
          )}
          aria-hidden="true"
        />
        {name}
      </a>
    </li>
  );
};

type TournamentNavLinkProps = {
  name: string;
  href: string;
  initial: string;
};
const TournamentNavLink: React.FC<TournamentNavLinkProps> = ({
  name,
  href,
  initial,
}) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  return (
    <li key={name}>
      <a
        href={href}
        className={classNames(
          isActive
            ? "bg-sky-700 dark:bg-slate-800 text-white dark:text-slate-200"
            : "text-sky-200 dark:text-slate-300 hover:text-white hover:bg-sky-700 hover:dark:bg-slate-800",
          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
        )}
      >
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-sky-400 dark:border-slate-400 bg-sky-700 dark:bg-slate-800 text-[0.625rem] font-medium text-white">
          {initial}
        </span>
        <span className="truncate">{name}</span>
      </a>
    </li>
  );
};
