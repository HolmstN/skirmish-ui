import classNames from "classnames";
import { useRouter } from "next/router";
import { useState } from "react";
import { PlayerChamps } from "../../../components/team/player-champs";
import { useTeam } from "../../../helpers/use-team";
import { PlayerUi } from "../../../types/teams";

export const Dashboard = () => {
  const router = useRouter();
  const { team, isLoading, isError } = useTeam(router.query.id);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerUi>();

  if (isLoading) {
    return <div>Is Loading...</div>;
  }

  if (isError || !team) {
    return <div>Error</div>;
  }

  return (
    <>
      <div>
        <div className="text-center">
          <h1>{team.name}</h1>
        </div>
        <div className="flex flex-col md:flex-row justify-center pt-12">
          {team.players.map((p) => (
            <PlayerButton
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
    </>
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
  const className = classNames(
    "w-1/12 border rounded-lg hover:bg-slate-600 cursor-pointer mx-8",
    {
      "bg-slate-600": selected,
    }
  );
  return (
    <div className={className} onClick={onClick}>
      <div className="mt-2 ml-2 font-bold">{player.name}</div>
      <div className="flex justify-center">
        <img
          src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5597.jpg?image=q_auto,f_webp,w_auto&v=1680060873716"
          className="rounded-full object-contain h-16 w-16 mt-4"
        />
      </div>
      <div className="flex mt-2 ml-1 items-center">
        <img
          src={`/ranked-positions/${player.preferredRole}.png`}
          className="saturate-50 brightness-150 contrast-150 mr-1 w-8 h-8"
        />
        <div>{player.preferredRole}</div>
      </div>
    </div>
  );
};

export default Dashboard;
