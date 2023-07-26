import { useRouter } from "next/navigation";
import { PendingGames } from "../../games";
import { Section } from "../../../section";
import { Standings } from "../../standings";
import { ManageTeam } from "../../team/manage-team";
import { NoTeam } from "../../team/no-team";
import { UnlinkedAccount } from "../../team/unlinked-account";

const Tournament = () => {
  // return <NoTeam />;

  return (
    <div>
      <div className="pb-2 text-sky-800 dark:text-slate-300 flex">
        <h2 className="flex-1">Team Demacia</h2>
        <div className="flex flex-col items-end font-medium">
          <div>Tournament: Skirmish Monthly</div>
          <div>Jan 1 to Feb 1</div>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-4 gap-4">
        <Section header="Manage Team" className="row-span-1 col-span-1">
          <ManageTeam />
        </Section>

        <Section header="Pending Games" className="row-span-1 col-span-2">
          <PendingGames />
        </Section>

        <Section header="Standings" className="row-span-1 col-span-3">
          <Standings />
        </Section>
      </div>
    </div>
  );
};

export default Tournament;
