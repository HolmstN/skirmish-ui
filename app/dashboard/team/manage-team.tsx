import { useMemo } from "react";

type Role = "top" | "jg" | "mid" | "sup" | "adc";
const players: { name: string; role: Role }[] = [
  { name: "lisilamw", role: "sup" },
  { name: "VamosUnited", role: "mid" },
  { name: "Xqt", role: "top" },
  { name: "Coldomamadaqua", role: "jg" },
  { name: "HolmstN", role: "adc" },
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
    <div>
      <h3>Manage Team</h3>
      <Player role="top" name={playersByRole.top} />
      <Player role="jg" name={playersByRole.jg} />
      <Player role="mid" name={playersByRole.mid} />
      <Player role="adc" name={playersByRole.adc} />
      <Player role="sup" name={playersByRole.sup} />
    </div>
  );
};

type PlayerProps = {
  name: string;
  role: Role;
};
const Player: React.FC<PlayerProps> = ({ role, name }) => {
  return (
    <div className="flex gap-2">
      <div className="font-bold">{role}:</div>
      <div>{name}</div>
    </div>
  );
};
