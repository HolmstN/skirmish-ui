import {
  Cog6ToothIcon,
  GlobeAltIcon,
  HomeIcon,
  RocketLaunchIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import classNames from "classnames";

const navigation = [
  { name: "Home", href: "#", icon: HomeIcon, current: true },
  { name: "Tournaments", href: "#", icon: GlobeAltIcon, current: false },
  { name: "Teams", href: "#", icon: RocketLaunchIcon, current: false },
  { name: "Players", href: "#", icon: UsersIcon, current: false },
];
const tournaments = [
  {
    id: 1,
    name: "Skirmish Tournament",
    team: "TSM",
    href: "#",
    initial: "ST",
    current: false,
  },
  {
    id: 2,
    name: "Summoner School Tournament",
    team: "TSM",
    href: "#",
    initial: "SS",
    current: false,
  },
  {
    id: 3,
    name: "Clash",
    team: "CLG",
    href: "#",
    initial: "C",
    current: false,
  },
];

export const Sidebar = () => {
  return (
    <div className="h-full flex grow flex-col gap-y-5 overflow-y-auto bg-sky-800 px-6 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <img
          className="h-8 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=white"
          alt="Your Company"
        />
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-sky-700 text-white"
                        : "text-sky-200 hover:text-white hover:bg-sky-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        item.current
                          ? "text-white"
                          : "text-sky-200 group-hover:text-white",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li>
            <div className="text-xs font-semibold leading-6 text-sky-200">
              Your Tournaments
            </div>
            <ul role="list" className="-mx-2 mt-2 space-y-1">
              {tournaments.map((tournament) => (
                <li key={tournament.name}>
                  <a
                    href={tournament.href}
                    className={classNames(
                      tournament.current
                        ? "bg-sky-700 text-white"
                        : "text-sky-200 hover:text-white hover:bg-sky-700",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-sky-400 bg-sky-700 text-[0.625rem] font-medium text-white">
                      {tournament.initial}
                    </span>
                    <span className="truncate">{tournament.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </li>
          <li className="flex-1 flex flex-col justify-end">
            <div>
              <a
                href="#"
                className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-sky-200 hover:bg-sky-700 hover:text-white"
              >
                <Cog6ToothIcon
                  className="h-6 w-6 shrink-0 text-sky-200 group-hover:text-white"
                  aria-hidden="true"
                />
                Settings
              </a>
            </div>
          </li>
        </ul>
      </nav>
    </div>
  );
};
