import classNames from "classnames";
import { tournaments } from "../../mock-data/tournaments";
import { Section } from "../section";
import Button from "../../components/button";

export default function Page() {
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
  tournament: (typeof tournaments)[0];
};
const Tournament: React.FC<TournamentProps> = ({ tournament }) => {
  const dformat = new Intl.DateTimeFormat("en-US").format;
  const start = dformat(new Date(tournament.startDate));
  const end = dformat(new Date(tournament.endDate));
  return (
    <div className="h-full flex flex-col text-slate-900 dark:text-slate-200">
      <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
        {tournament.name}
      </h3>
      <div className="text-sm font-bold mb-2">
        {start} - {end}
      </div>
      <div className="flex-1">
        <p className="text-sm line-clamp-4">{tournament.description}</p>
      </div>
      <div className="pb-4">
        <Button>Join</Button>
      </div>
    </div>
  );
};
