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

export default function Page() {
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
                    teamPlayers={`${teamPlayersByTeam[t.id]}`}
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
  id: number;
  name: string;
  teamPlayers: {
    playerUserId: number;
    name: string;
    role: number;
  }[];
};
const Team: React.FC<TeamProps> = ({ id, name, teamPlayers }) => {
  const playersByRole = useMemo(() => {
    let roles: {} = {};

    for (let i = 0; i < teamPlayers.length; i++) {
      // @ts-expect-error
      roles[teamPlayers[i].role] = teamPlayers[i].name;
    }

    return roles;
  }, [teamPlayers]);

  return (
    <div className="flex flex-col">
      <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
        {name}
      </h3>
      <div className="flex flex-col">
        <Image
          className="h-12 w-12 flex-none rounded-full bg-gray-50"
          src={riotLogo}
          alt="team logo"
          placeholder="blur"
        />

        <div className="flex gap-2 mt-1">
          {roles.map((r) => (
            <div key={r.id}>
              <Tag className="text-xs" color="gray">
                {playersByRole[r] || `No ${r.name}`}
              </Tag>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
