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
    return <Layout header="">Is Loading...</Layout>;
  }

  if (isError || !team) {
    return <Layout header="Dashboard">Error</Layout>;
  }

  return (
    <Layout header="">
      <div>
        <div className="text-center">
          <h1>{team.name}</h1>
        </div>
        <div className="flex">
          <div className="flex-initial w-1/12 mr-8 border-r-2">
            {team.players.map((p) => (
              <PlayerView
                key={p.name}
                onClick={() => setSelectedPlayer(p)}
                selected={selectedPlayer?.name === p.name}
                player={p}
              />
            ))}
          </div>

          <div className="flex-1">
            {selectedPlayer && <PlayerChamps player={selectedPlayer} />}
          </div>
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
    "px-4 py-2 border-b hover:bg-slate-600 cursor-pointer",
    {
      "bg-slate-600": selected,
    }
  );
  return (
    <div className={className} onClick={onClick}>
      <div className="font-bold">{player.name}</div>
      <div>Role: {player.preferredRole}</div>
    </div>
  );
};

export default Dashboard;
