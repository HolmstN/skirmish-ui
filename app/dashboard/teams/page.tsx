import classNames from "classnames";
import { tournaments } from "../../../mock-data/tournaments";
import { Section } from "../../section";
import Button from "../../../components/button";
import riotLogo from "../../public/riot_logo.png";
import Image from "next/image";
import Tag from "../../components/client/tag";
import { roles } from "../../../mock-data/roles";
import { useMemo } from "react";
import { teams } from "../../../mock-data/teams";
import { teamPlayersByTeam } from "../../../mock-data/team-players";
import { getAllTeams } from "../../../server/services/teams";
import { TournamentPlayers, Users } from "../../../server/db/schema";

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
                <Section className="w-1/4" key={t.id}>
                  <Team
                    name={t.name}
                    logo={t.logo}
                    teamGamedata={t.teamGamedata}
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
  name: string;
  logo: string | null;
  teamGamedata: { looking_for: { roles: string[] } };
  rosteredTournaments: string[];
};
const Team: React.FC<TeamProps> = ({
  name,
  logo,
  teamGamedata,
  rosteredTournaments,
}) => {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
          {name}
        </h3>
        <div className="pl-2">
          {logo && (
            <Image
              className="w-6 h-6 flex-none rounded-full bg-gray-50"
              src={logo}
              width={300}
              height={300}
              alt="team logo"
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <RosteredTournaments rosteredTournaments={rosteredTournaments} />

        <div className="flex gap-2 mt-1 pb-2">
          {teamGamedata?.looking_for?.roles?.map((r) => (
            <div key={r}>
              <Tag className="text-xs" color="gray">
                LF-{r.toUpperCase()}
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
      <div className="pb-2 text-slate-900 dark:text-slate-300">
        <h4 className="font-semibold">Rostered Tournaments</h4>
        <div className="text-sm">None</div>
      </div>
    );
  }

  return (
    <div className="pb-2 text-slate-900 dark:text-slate-300">
      <h4 className="font-semibold">Rostered Tournaments</h4>
      <ul className="text-sm">
        {rosteredTournaments.map((rt) => (
          <li key={rt}>{rt}</li>
        ))}
      </ul>
    </div>
  );
};
