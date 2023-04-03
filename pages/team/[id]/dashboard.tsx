import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { PlayerChamps } from "../../../components/team/player-champs";
import { useTeam } from "../../../helpers/use-team";
import { PlayerUi } from "../../../types/teams";
import Layout, { LayoutMain, LayoutHeader } from "../../../components/layout";
import classnames from "classnames";

export const Dashboard = () => {
  const router = useRouter();
  const { team, isLoading, isError } = useTeam(router.query.id);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerUi>();

  if (isLoading) {
    return (
      <Layout>
        <LayoutHeader>
          <h1>Dashboard</h1>
        </LayoutHeader>
      </Layout>
    );
  }

  if (isError || !team) {
    return <div>Error</div>;
  }

  return (
    <Layout>
      <LayoutHeader>
        <h1>Dashboard - {team.name}</h1>
      </LayoutHeader>

      <LayoutMain>
        <div className="flex flex-col md:flex-row gap-4 justify-center pt-12">
          {team.players.map((p) => (
            <PlayerButton
              key={p.name}
              onClick={() => setSelectedPlayer(p)}
              selected={selectedPlayer?.name === p.name}
              player={p}
            />
          ))}
        </div>
        {selectedPlayer && <PlayerChamps player={selectedPlayer} />}
      </LayoutMain>
    </Layout>
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

/*
return (
    <div className={className} onClick={onClick}>
      <div className="mt-2 ml-2 font-bold">{player.name}</div>
      <div className="flex justify-center">
        <img src="" className="rounded-full object-contain h-16 w-16 mt-4" />
      </div>
      <div className="flex mt-2 ml-1 items-center">
        <div>{player.preferredRole}</div>
      </div>
    </div>
  );
  */

export default Dashboard;
