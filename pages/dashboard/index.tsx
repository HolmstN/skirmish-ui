import { GetServerSideProps } from "next";
import Layout, { LayoutMain } from "../../components/layout";
import { Champion } from "../../types/teams";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useUserSession } from "../../helpers/use-user-session";
import { NoTeam } from "../../components/no-team";

export const Dashboard: React.FC = () => {
  const user = useUserSession();
  return (
    <Layout user={user}>
      <LayoutMain>
        <NoTeam />
      </LayoutMain>
    </Layout>
  );
};

export default Dashboard;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const championsRes = await fetch(
    "http://ddragon.leagueoflegends.com/cdn/13.6.1/data/en_US/champion.json"
  );
  const championsJson = (await championsRes.json()) as {
    data: { [k: string]: Champion };
  };

  const champions = championsJson.data;
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/api/auth/signin",
        permanent: true,
      },
    };
  }

  return {
    props: {
      session,
      team: {},
      champions,
    },
  };
};
