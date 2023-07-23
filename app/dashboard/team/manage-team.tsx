import classNames from "classnames";
import { useMemo } from "react";
import Button from "../../components/client/button";

type Role = "top" | "jg" | "mid" | "sup" | "adc";
const players: { name: string; role: Role }[] = [
  { name: "lisilamw", role: "sup" },
  { name: "VamosUnited", role: "mid" },
  { name: "Xqt", role: "top" },
  { name: "Coldomamadaqua", role: "jg" },
  { name: "", role: "adc" },
];

export const ManageTeam: React.FC = () => {
  const playersByRole = useMemo(() => {
    let roles: {} = {};

    for (let i = 0; i < players.length; i++) {
      roles[players[i].role] = players[i].name;
    }

    return roles;
  }, [players]);

  return (
    <div className="flex flex-col items-center gap-2 w-full">
      <h3>Manage Team</h3>
      <div className="flex justify-center gap-4 w-full">
        <Player role="top" name={playersByRole.top} />
        <Player role="jg" name={playersByRole.jg} />
        <Player role="mid" name={playersByRole.mid} />
        <Player role="adc" name={playersByRole.adc} />
        <Player role="sup" name={playersByRole.sup} />
      </div>
    </div>
  );
};

type PlayerProps = {
  name: string;
  role: Role;
};
const Player: React.FC<PlayerProps> = ({ role, name }) => {
  const classes = classNames("flex flex-col items-center w-2/12 h-20", {
    "border border-2 border-indigo-800 bg-indigo-600 text-indigo-200": !!name,
    "border border-2 border-dashed border-indigo-700 text-indigo-800": !name,
  });

  if (name) {
    return (
      <div className={classes}>
        <div className="font-bold uppercase flex-1 pt-1">{role}</div>
        <div className="mb-3">{name}</div>
      </div>
    );
  }
  return (
    <div className={classes}>
      <div className="font-bold uppercase flex-1 pt-1">{role}</div>
      <div className="w-full bg-indigo-700 text-indigo-100 text-center mb-3">
        Find
      </div>
    </div>
  );
};
