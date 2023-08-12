import { Section } from "../../section";
import { getAllTournaments } from "../../../server/services/tournaments";
import { Tournaments } from "../../../server/db/schema";
import { LinkButton } from "../../components/link-button";
import { getPlayerTournaments } from "../../../server/services/player-tournaments";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

type Tournament = Omit<Tournaments, "start_date" | "end_date"> & {
  start_date?: number;
  end_date?: number;
};

export async function getData() {
  try {
    const session = await getServerSession(authOptions);
    const [tournaments, myTournaments] = await Promise.all([
      getAllTournaments({}),
      getPlayerTournaments({ id: session?.user.id || "" }),
    ]);

    if (tournaments.error) {
      throw new Error("Error fetching tournaments");
    }

    if (myTournaments.error) {
      throw new Error("Error fetching tournaments");
    }

    const userTournamentIds = new Set<number>();
    myTournaments.value?.forEach((t) => userTournamentIds.add(t.id));

    // @ts-expect-error lies
    return tournaments.value.map((t) => ({
      ...t,
      start_date: t.start_date?.getTime(),
      end_date: t.end_date?.getTime(),
      userInTournament: userTournamentIds.has(t.id),
    }));
  } catch (e) {
    return [];
  }
}

export default async function Page() {
  const tournaments = await getData();

  return (
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
  );
}

type TournamentProps = {
  tournament: Tournament & { userInTournament: boolean };
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
    <div className="flex flex-col h-full">
      <h3 className="text-sky-800 dark:text-indigo-500 font-bold mb-2 uppercase">
        {tournament.name}
      </h3>
      <div className="text-sm font-bold mb-2">{dateDisplay}</div>
      <div className="flex-1">
        <p className="text-sm line-clamp-4">{tournament.description}</p>
      </div>
      <div className="pb-4">
        {!tournament.userInTournament && (
          <LinkButton
            className="w-1/3"
            href={`/dashboard/tournaments/${tournament.id}/join`}
          >
            Join
          </LinkButton>
        )}
        {tournament.userInTournament && <p>Already joined</p>}
      </div>
    </div>
  );
};
