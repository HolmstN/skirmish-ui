import { useState } from "react";
import { PlayerChamps } from "../../../components/team/player-champs";
import { Champion, PlayerUi, Team } from "../../../types/teams";
import Layout, { LayoutMain, LayoutHeader } from "../../../components/layout";
import classnames from "classnames";
import { GetServerSideProps } from "next";
import { mockPlayer } from "../../../helpers/mock-player";
import { Transition } from "@headlessui/react";
import { ChampionContext } from "../../../components/context/champion-context";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../api/auth/[...nextauth]";
import { useUserSession } from "../../../helpers/use-user-session";
import { useRouter } from "next/router";

type Props = {
  team: Team;
  champions: { [k: string]: Champion };
};
export const TeamManager: React.FC<Props> = ({ team, champions }) => {
  const user = useUserSession();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerUi>();

  return (
    <ChampionContext.Provider value={champions}>
      <Layout user={user}>
        <LayoutHeader>
          <h1>Team Manager - {team.name}</h1>
        </LayoutHeader>

        <LayoutMain>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            {team.players.map((p) => (
              <PlayerButton
                key={p.name}
                onClick={() => setSelectedPlayer(p)}
                selected={selectedPlayer?.name === p.name}
                player={p}
              />
            ))}
          </div>
          {team.players.map((p, i) => (
            <Transition
              key={p.name}
              show={selectedPlayer?.name === p.name}
              enter="ease-in transition-all duration-300"
              enterFrom="-translate-x-44 opacity-0"
              enterTo="translate-x-0 opacity-100"
              leave="opacity-0"
            >
              <PlayerChamps player={p} />
            </Transition>
          ))}
        </LayoutMain>
      </Layout>
    </ChampionContext.Provider>
  );
};

type PlayerButtonProps = {
  player: PlayerUi;
  onClick: () => void;
  selected: boolean;
};
const PlayerButton: React.FC<PlayerButtonProps> = ({
  player,
  selected,
  onClick,
}) => {
  const className = classnames(
    "relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400",
    { grayscale: selected }
  );

  return (
    <div key={player.name} onClick={onClick} className={className}>
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5597.jpg?image=q_auto,f_webp,w_auto&v=1680060873716"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{player.name}</p>

          <p className="truncate text-sm text-gray-500">
            {player.preferredRole}
          </p>
        </a>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const team: Team = {
    id: "1",
    name: "Team ABC",
    players: new Array(5).fill({}).map((_, i) => mockPlayer(`test-${i}`)),
  };

  const championsRes = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json"
  );
  const championsJson = (await championsRes.json()) as {
    data: { [k: string]: Champion };
  };

  const champions = championsJson.data;
  const session = await getServerSession(req, res, authOptions);

  // @ts-expect-error
  if (session?.user?.team !== team.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {
      session,
      team,
      champions,
    },
  };
};

export default TeamManager;
