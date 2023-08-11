import classNames from "classnames";
import { Section } from "../../section";
import Button from "../../components/client/button";
import { getAllTournaments } from "../../../server/services/tournaments";
import { Tournaments } from "../../../server/db/schema";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LinkButton } from "../../components/link-button";

type Tournament = Omit<Tournaments, "start_date" | "end_date"> & {
  start_date?: number;
  end_date?: number;
};

export async function getData() {
  const tournaments = await getAllTournaments();

  return tournaments.map((t) => ({
    ...t,
    start_date: t.start_date?.getTime(),
    end_date: t.end_date?.getTime(),
  }));
}

export default async function Page() {
  const tournaments = await getData();
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="pt-4">
        <h2 className="text-sky-800 dark:text-slate-300">Tournaments</h2>
        <main>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="pt-4 flex flex-wrap gap-4">
              {tournaments.map((t) => (
                <Section className="w-1/3 h-60">
                  <Tournament tournament={t} />
                </Section>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

type TournamentProps = {
  tournament: Tournament;
};
const Tournament: React.FC<TournamentProps> = ({ tournament }) => {
  const dformat = new Intl.DateTimeFormat("en-US").format;
  const start =
    tournament.start_date && dformat(new Date(tournament.start_date));
  const end = tournament.end_date && dformat(new Date(tournament.end_date));

  let dateDisplay;
  if (start && end) {
    dateDisplay = `${start} - ${end}`;
  } else if (start) {
    dateDisplay = `Starting ${start}`;
  } else if (end) {
    dateDisplay = `Ending ${end}`;
  }

  return (
    <>
      <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
        {tournament.name}
      </h3>
      <div className="text-sm font-bold mb-2">{dateDisplay}</div>
      <div className="flex-1">
        <p className="text-sm line-clamp-4">{tournament.description}</p>
      </div>
      <div className="pb-4">
        <LinkButton href={`/dashboard/tournaments/${tournament.id}/join`}>
          Join
        </LinkButton>
      </div>
    </>
  );
};
