import { useRouter } from "next/router";
import Layout from "../../../components/layout";
import { useTeam } from "../../../helpers/use-team";

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
        <div>{p}</div>
      ))}
    </Layout>
  );
};

export default Dashboard;
