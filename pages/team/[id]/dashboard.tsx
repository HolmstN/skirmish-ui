import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/layout";
import { PlayerChamps } from "../../../components/team/player-champs";
import { useTeam } from "../../../helpers/use-team";
import { PlayerUi } from "../../../types/teams";

export const Dashboard = () => {
  const router = useRouter();
  const { team, isLoading, isError } = useTeam(router.query.id);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerUi>();

  if (isLoading) {
    return <Layout>Is Loading...</Layout>;
  }

  if (isError || !team) {
    return <Layout header="Dashboard">Error</Layout>;
  }

  return (
    <Layout>
      <div>
        <div className="text-center">
          <h1>{team.name}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center pt-12">
          {team.players.map((p) => (
            <PlayerView
              key={p.name}
              onClick={() => setSelectedPlayer(p)}
              selected={selectedPlayer?.name === p.name}
              player={p}
            />
          ))}
        </div>

        <div className="border-t border-slate-700 mt-4 pt-2">
          {selectedPlayer && <PlayerChamps player={selectedPlayer} />}
        </div>
      </div>
    </Layout>
  );
};

type PlayerViewProps = {
  player: PlayerUi;
  onClick: () => void;
  selected: boolean;
};
const PlayerView: React.FC<PlayerViewProps> = ({
  player,
  selected,
  onClick,
}) => {
  const className = classNames(
    "border rounded-lg hover:bg-slate-600 cursor-pointer px-12 mx-8",
    {
      "bg-slate-600": selected,
    }
  );
  return (
    <div className={className} onClick={onClick}>
      <img
        src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5597.jpg?image=q_auto,f_webp,w_auto&v=1680060873716"
        className="rounded-full object-contain h-16 w-16 mt-4"
      />
      <div className="mt-4 font-bold">{player.name}</div>
      <div className="mb-4">Role: {player.preferredRole}</div>
    </div>
  );
};

export default Dashboard;
