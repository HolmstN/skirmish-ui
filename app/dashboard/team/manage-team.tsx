"use client";

import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Section } from "../section";

type Role = "top" | "jg" | "mid" | "sup" | "adc";
const players: { name: string; role: Role }[] = [
  { name: "lisilamw", role: "sup" },
  { name: "VamosUnited", role: "mid" },
  { name: "Xqt", role: "top" },
  { name: "Coldomamadaqua", role: "jg" },
  { name: "", role: "adc" },
];

type Player = {
  name: string;
  role: Role;
};

export const ManageTeam: React.FC = () => {
  const [focusedPlayer, setFocusedPlayer] = useState<Player>();

  const playersByRole = useMemo(() => {
    let roles: {} = {};

    for (let i = 0; i < players.length; i++) {
      // @ts-expect-error
      roles[players[i].role] = players[i].name;
    }

    return roles;
  }, [players]);

  return (
    <div className="flex flex-col gap-4">
      <Player onSelect={setFocusedPlayer} role="top" name={playersByRole.top} />
      <Player onSelect={setFocusedPlayer} role="jg" name={playersByRole.jg} />
      <Player onSelect={setFocusedPlayer} role="mid" name={playersByRole.mid} />
      <Player onSelect={setFocusedPlayer} role="adc" name={playersByRole.adc} />
      <Player onSelect={setFocusedPlayer} role="sup" name={playersByRole.sup} />
    </div>
  );
};

type PlayerProps = {
  name: string;
  role: Role;
  onSelect: (player: Player) => void;
};

const Player: React.FC<PlayerProps> = ({ role, name, onSelect }) => {
  const classes = classNames(
    "flex items-center gap-2 cursor-pointer rounded-full py-2 px-2",
    {
      "border border-2 border-indigo-800 hover:border-indigo-500 bg-indigo-600 hover:bg-indigo-400 text-indigo-200":
        !!name,
      "border border-2 border-dashed hover:bg-indigo-200 border-indigo-700 hover:border-indigo-600 text-indigo-600":
        !name,
    }
  );

  const onClick = useCallback(() => onSelect({ role, name }), [role, name]);

  if (name) {
    return (
      <div className={classes} onClick={onClick}>
        <div className="font-bold uppercase w-2/12">{role}</div>
        <div className="">{name}</div>
      </div>
    );
  }
  return (
    <div className={classes} onClick={onClick}>
      <div className="font-bold uppercase w-2/12">{role}</div>
      <div className="">
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </div>
    </div>
  );
};

type FocusedPlayerProps = {
  name: string;
  role: Role;
};

const FocusedPlayer: React.FC<FocusedPlayerProps> = ({ role, name }) => {
  if (!name) {
    return (
      <div className="flex-auto ml-4">
        <h3 className="text-indigo-900">Find player: {role}</h3>
      </div>
    );
  }

  return (
    <div className="flex-auto ml-4">
      <h3 className="text-indigo-900">
        {name}: {role}
      </h3>
      <div className="h-full border rounded border-indigo-800 bg-indigo-100">
        <h4>Player Champs</h4>
        <div>Some Champs</div>
      </div>
    </div>
  );
};
