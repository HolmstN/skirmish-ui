import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../../components/layout";
import { PlayerChamps } from "../../../components/team/player-champs";
import { useTeam } from "../../../helpers/use-team";
import { PlayerUi } from "../../../types/teams";

export const Dashboard = () => {
  const router = useRouter();
  const { team, isLoading, isError } = useTeam(router.query.id);
  const [selectedPlayerIndex, setSelectedPlayerIndex] = useState<number>(0);

  if (isLoading) {
    return <Layout header="My Team">Is Loading...</Layout>;
  }

  if (isError || !team) {
    return <Layout header="My Team">Error</Layout>;
  }

  return (
    <Layout header="My Team">
      <div className="flex">
        <div className="pr-8 mr-8 border-r-2">
          <div>Team Number #{router.query.id}</div>
          <div>{team.name}</div>

          {team.players.map((p, i) => (
            <PlayerView
              key={p.name}
              onClick={() => setSelectedPlayerIndex(i)}
              player={p}
            />
          ))}
        </div>

        <div className="w-full">
          {selectedPlayerIndex > 0 && (
            <PlayerChamps player={team.players[selectedPlayerIndex]} />
          )}
        </div>
      </div>
    </Layout>
  );
};

type PlayerViewProps = {
  player: PlayerUi;
  onClick: () => void;
};
const PlayerView: React.FC<PlayerViewProps> = ({ player, onClick }) => {
  return (
    <div className="py-1" onClick={onClick}>
      <div>Player: {player.name}</div>
      <div>Role: {player.preferredRole}</div>
    </div>
  );
};

export default Dashboard;
