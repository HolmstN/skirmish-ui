import { useRouter } from "next/navigation";
import { PendingGames } from "./games";
import { Section } from "../section";
import { Standings } from "./standings";
import { ManageTeam } from "./team/manage-team";
import { NoTeam } from "./team/no-team";
import { UnlinkedAccount } from "./team/unlinked-account";

const Teams = () => {
  // return <UnlinkedAccount />;

  return (
    <div>
      <h3>Choose Tournament</h3>
      <h3>Your Past Tournaments</h3>
    </div>
  );
};

export default Teams;
