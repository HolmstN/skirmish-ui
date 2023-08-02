import classNames from "classnames";
import { tournaments } from "../../mock-data/tournaments";
import { Section } from "../section";
import { playerGameDataLeague } from "../../mock-data/player-gamedata-league";
import lolIcon from "../../public/LoL_icon.svg";
import Image from "next/image";
import { getAllPlayerGamedata } from "../../server/services/player-gamedata";

async function getData() {
  const res = await getAllPlayerGamedata();
  return res;
}

export default async function Page() {
  const initialData = await getData();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="pt-4">
        <h2 className="text-sky-800 dark:text-slate-300">Players</h2>
        <main>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-4">
              <ul
                role="list"
                className="divide-y divide-slate-200 dark:divide-slate-700"
              >
                {initialData.map((p) => (
                  <Player
                    id={p.user_id}
                    username={p.username}
                    gamedata={p.gamedata}
                  />
                ))}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

type PlayerProps = {
  id: string;
  username: string;
  gamedata: any;
};
const Player: React.FC<PlayerProps> = ({ id, username, gamedata }) => {
  const topRole = gamedata?.preferredRoles
    ? gamedata?.preferredRoles[0]
    : undefined;

  return (
    <li key={id} className="flex justify-between gap-x-6 py-5">
      <div className="flex gap-x-4">
        <Image alt="summoner icon" src={lolIcon} className="w-6 h-6" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-300">
            {username}
          </p>
          <p className="mt-1 truncate text-xs leading-5 text-slate-500 dark:text-slate-600">
            {/* {person.email} */}
          </p>
        </div>
      </div>
      <div className="hidden sm:flex sm:flex-col sm:items-end">
        <p className="text-sm leading-6 text-slate-900 dark:text-slate-300">
          {topRole}
        </p>
      </div>
    </li>
  );
};
