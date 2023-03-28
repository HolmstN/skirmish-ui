import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useTeam } from "../../../helpers/use-team";
import { Player } from "../../../types/teams";

export const Dashboard = () => {
  const router = useRouter();
  const { team, isLoading, isError } = useTeam(router.query.id);

  if (isLoading) {
    return <Layout header="My Team">Is Loading...</Layout>;
  }

  if (isError || !team) {
    return <Layout header="My Team">Error</Layout>;
  }

  return (
    <Layout header="My Team">
      <div>Team Number #{router.query.id}</div>
      <div>{team.name}</div>

      {team.players.map((p) => (
        <PlayerView player={p} />
      ))}
    </Layout>
  );
};

const PlayerView: React.FC<{ player: Player }> = ({ player }) => {
  const orderedRoles = Object.entries(player.roles).sort(
    (pra, prb) => pra[1].preference - prb[1].preference
  );

  return (
    <div className="py-1">
      <div>Player: {player.name}</div>
      <div>Role: {orderedRoles[0][0]}</div>
    </div>
  );
};

export default Dashboard;
