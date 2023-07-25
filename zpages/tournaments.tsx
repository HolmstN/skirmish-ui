import { Champion, PlayerUi, Team } from "../types/teams";
import Layout, { LayoutMain, LayoutHeader } from "../components/layout";
import { GetServerSideProps } from "next";
import { ChampionContext } from "../components/context/champion-context";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";
import { useUserSession } from "../helpers/use-user-session";
import { getUserTeam } from "../lib/get-user-team";
import { ImageWithBackup } from "../components/image-with-backup";
import useSWR, { SWRConfig } from "swr";
import { fetcher } from "../helpers/fetcher";
import { TournamentWithTeam } from "../components/tournaments/tournament-with-team";
import { Tournament } from "../types/tournament";

type Props = {
  champions: { [k: string]: Champion };
  fallback: {
    "/api/team/[id]": Omit<Team, "players"> & { players: PlayerUi[] };
  };
};

const now = new Date(1688659932302);
const TOURNAMENTS: Tournament[] = [
  {
    title: "Skirmish Monthly",
    when: {
      start: new Date(now.setDate(now.getDate() + 5)),
      end: new Date(now.setDate(now.getDate() + 25)),
    },
    divisions: [
      {
        tier: 1,
        standings: {
          adadwad: { wins: [], losses: [] },
        },
      },
    ],
  },
];

const Header: React.FC = () => {
  const { data: team } = useSWR(`/api/team`, fetcher);

  return (
    <div className="flex items-center gap-4">
      <ImageWithBackup
        src={team.imageUrl}
        className="w-10 h-10 rounded-full"
        alt="team image"
      />
      <h1>{team.name}</h1>
    </div>
  );
};

const Main: React.FC = () => {
  const { data: team } = useSWR(`/api/team`, fetcher);

  if (team) {
    return <TournamentWithTeam team={team} tournaments={TOURNAMENTS} />;
  }

  return <div>TBD</div>;
};

export const Tournaments: React.FC<Props> = ({ champions, fallback }) => {
  const user = useUserSession();

  return (
    <SWRConfig value={{ fallback }}>
      <ChampionContext.Provider value={champions}>
        <Layout user={user}>
          <LayoutHeader>
            <Header />
          </LayoutHeader>

          <LayoutMain>
            <Main />
          </LayoutMain>
        </Layout>
      </ChampionContext.Provider>
    </SWRConfig>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: true,
      },
    };
  }

  const team = await getUserTeam(session, { resolvePlayers: true });

  const championsRes = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json"
  );
  const championsJson = (await championsRes.json()) as {
    data: { [k: string]: Champion };
  };

  const champions = championsJson.data;

  return {
    props: {
      session,
      champions,
      fallback: {
        "/api/team": team,
      },
    },
  };
};

export default Tournaments;
