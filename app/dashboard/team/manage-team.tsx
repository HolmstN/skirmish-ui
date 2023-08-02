"use client";

import classNames from "classnames";
import { useCallback, useMemo, useState } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Section } from "../../section";

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
    <div className="flex flex-col gap-4 pb-2">
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
    "hover:bg-gradient-to-r hover:from-indigo-500 hover:dark:from-indigo-800 hover:to-sky-500 dark:hover:to-sky-800 rounded-md group flex items-center gap-2 cursor-pointer"
  );

  const onClick = useCallback(() => onSelect({ role, name }), [role, name]);

  if (name) {
    return (
      <div className={classes} onClick={onClick}>
        <div className="text-sky-100 dark:text-slate-300 bg-gradient-to-r from-indigo-500 dark:from-indigo-800 to-sky-500 dark:to-sky-800 group-hover:from-transparent group-hover:to-transparent rounded-full text-center py-2 font-bold uppercase w-2/12">
          {role}
        </div>
        <div className="group-hover:text-sky-100 group-hover:text-slate-200 group-hover:font-medium">
          {name}
        </div>
      </div>
    );
  }
  return (
    <div
      className={classNames(
        classes,
        "border border-dashed border-2 border-sky-400 dark:border-sky-800 hover:border-solid hover:border-fuchsia-400 dark:hover:border-fuchsia-800"
      )}
      onClick={onClick}
    >
      <div className="text-sky-600 bg-transparent rounded-full text-center py-2 font-bold uppercase w-2/12 group-hover:border-0 group-hover:bg-transparent group-hover:text-sky-100">
        {role}
      </div>
      <div className="text-sky-600 group-hover:text-sky-100">
        <QuestionMarkCircleIcon className="h-6 w-6" />
      </div>
    </div>
  );
};
