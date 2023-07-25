import { GetServerSideProps } from "next";
import Layout, { LayoutHeader, LayoutMain } from "../../components/layout";
import { Champion, Role, Team } from "../../types/teams";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { useUserSession } from "../../helpers/use-user-session";
import { NoTeam } from "../../components/no-team";
import clientPromise from "../../lib/mongo";
import { ROLE } from "../../helpers/constants";
import { ImageWithBackup } from "../../components/image-with-backup";
import { getUserTeam } from "../../lib/get-user-team";

type Props = {
  teams: Team[];
  userTeam: Team;
};
export const Dashboard: React.FC<Props> = ({ teams, userTeam }) => {
  const user = useUserSession();

  if (!userTeam) {
    return (
      <Layout team={userTeam} user={user}>
        <LayoutMain>
          <NoTeam teams={teams} />
        </LayoutMain>
      </Layout>
    );
  }

  return (
    <Layout team={userTeam} user={user}>
      <LayoutHeader>
        <div className="flex items-center gap-4">
          <ImageWithBackup
            src={userTeam.imageUrl}
            className="w-10 h-10 rounded-full"
            alt="team image"
          />
          <h1>{userTeam.name}</h1>
        </div>
      </LayoutHeader>
      <LayoutMain></LayoutMain>
    </Layout>
  );
};

export default Dashboard;

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

  const userTeam = await getUserTeam(session);

  const db = (await clientPromise).db("skirmish");
  const teamsCollection = db.collection("teams");

  const teamCursor = teamsCollection.find().sort({ _id: 1 }).limit(10);
  const teams = (await teamCursor.toArray()).map((t) => ({
    ...t,
    _id: t._id.toString(),
  })) as unknown as Team[];

  // teams.forEach((t) => {
  //   const occupiedRoles = new Set<Role>(
  //     t.players.map((p) => p.preferredRole || "")
  //   );

  //   t.openRoles = Object.values(ROLE).reduce<Role[]>((acc, r) => {
  //     if (!Array.from(occupiedRoles).includes(r) && !acc.includes(r)) {
  //       acc.push(r);
  //     }

  //     return acc;
  //   }, []);
  // });

  return {
    props: {
      session,
      teams,
      userTeam,
    },
  };
};
