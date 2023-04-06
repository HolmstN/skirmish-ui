import { useState } from "react";
import { PlayerUi } from "../../types/teams";
import { Transition } from "@headlessui/react";
import { PlayerChamps } from "../team/player-champs";
import classnames from "classnames";

type Props = {
  players: PlayerUi[];
};
export const TeamPlayers: React.FC<Props> = ({ players }) => {
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerUi>();

  return (
    <>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        {players.map((p) => (
          <PlayerButton
            key={p.name}
            onClick={() => setSelectedPlayer(p)}
            selected={selectedPlayer?.name === p.name}
            player={p}
          />
        ))}
      </div>
      {players.map((p) => (
        <Transition
          key={p.name}
          show={selectedPlayer?.name === p.name}
          enter="ease-in transition-all duration-300"
          enterFrom="-translate-x-44 opacity-0"
          enterTo="translate-x-0 opacity-100"
          leave="opacity-0"
        >
          <PlayerChamps player={p} />
        </Transition>
      ))}
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
  const className = classnames(
    "relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400",
    { grayscale: selected }
  );

  return (
    <div key={player.name} onClick={onClick} className={className}>
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src="https://opgg-static.akamaized.net/meta/images/profile_icons/profileIcon5597.jpg?image=q_auto,f_webp,w_auto&v=1680060873716"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{player.name}</p>

          <p className="truncate text-sm text-gray-500">
            {player.preferredRole}
          </p>
        </a>
      </div>
    </div>
  );
};
