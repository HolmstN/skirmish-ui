import classNames from "classnames";
import { tournaments } from "../../mock-data/tournaments";
import { Section } from "../section";
import Button from "../../components/button";
import riotLogo from "../../public/riot_logo.png";
import Image from "next/image";
import Tag from "../components/client/tag";
import { roles } from "../../mock-data/roles";
import { useMemo } from "react";
import { teams } from "../../mock-data/teams";
import { teamPlayersByTeam } from "../../mock-data/team-players";
import { getAllTeams } from "../../server/services/teams";
import { TournamentPlayers, Users } from "../../server/db/schema";

export async function getData() {
  return await getAllTeams();
}

export default async function Page() {
  const teams = await getData();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="pt-4">
        <h2 className="text-sky-800 dark:text-slate-300">Teams</h2>
        <main>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-4 flex flex-wrap gap-4">
              {teams.map((t) => (
                <Section key={t.id}>
                  <Team
                    id={t.id}
                    name={t.name}
                    players={t.players}
                    rosteredTournaments={t.rosteredTournaments}
                  />
                </Section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

type TeamProps = {
  id: string;
  name: string;
  players: (Pick<TournamentPlayers, "gamedata"> &
    Pick<Users, "id" | "username">)[];
  rosteredTournaments: string[];
};
const Team: React.FC<TeamProps> = ({
  id,
  name,
  players,
  rosteredTournaments,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
          {name}
        </h3>
        <div className="pl-2">
          <Image
            className="h-6 w-6 flex-none rounded-full bg-gray-50"
            src={riotLogo}
            alt="team logo"
            placeholder="blur"
          />
        </div>
      </div>
      <div className="flex flex-col">
        <div className="pb-2">
          <RosteredTournaments rosteredTournaments={rosteredTournaments} />
        </div>

        <div className="flex gap-2 mt-1 pb-2">
          {roles.map((r) => (
            <div key={r.id}>
              <Tag className="text-xs" color="gray">
                No {r.id.toUpperCase()}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

type RTParams = {
  rosteredTournaments: string[];
};
const RosteredTournaments: React.FC<RTParams> = ({ rosteredTournaments }) => {
  if (!rosteredTournaments.length) {
    return (
      <>
        <h4 className="font-semibold">Rostered Tournaments</h4>
        <div className="text-sm">None</div>
      </>
    );
  }

  return (
    <>
      <h4 className="font-semibold">Rostered Tournaments</h4>
      <ul className="text-sm">
        {rosteredTournaments.map((rt) => (
          <li key={rt}>{rt}</li>
        ))}
      </ul>
    </>
  );
};
