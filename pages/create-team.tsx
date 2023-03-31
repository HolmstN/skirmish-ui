import React from "react";

type Team = {
  name: string;
  players: string[];
};

export const CreateTeam = () => {
  const [team, setTeam] = React.useState<Team>({
    name: "",
    players: new Array(5).fill(""),
  });

  const [resTeam, setResTeam] = React.useState<Team>({
    name: "",
    players: new Array(5).fill(""),
  });

  const onSubmit = async () => {
    const res = await fetch("/api/team/create", {
      method: "POST",
      body: JSON.stringify(team),
      headers: {
        "Content-Type": "application/json",
      },
    });

    setResTeam((await res.json()) as Team);
  };

  const onPlayerChange = (index: number, name: string) => {
    setTeam((team) => {
      const players = [...team.players];
      players[index] = name;
      return {
        ...team,
        players,
      };
    });
  };
  return (
    <>
      <div>
        <label>
          Team Name
          <input
            className="dark:text-black"
            value={team.name}
            onChange={(e) =>
              setTeam((team) => ({ ...team, name: e.target.value }))
            }
          />
        </label>

        <div className="flex flex-col">
          <PlayerInput
            players={team.players}
            onPlayerChange={onPlayerChange}
            index={0}
          />
          <PlayerInput
            players={team.players}
            onPlayerChange={onPlayerChange}
            index={1}
          />
          <PlayerInput
            players={team.players}
            onPlayerChange={onPlayerChange}
            index={2}
          />
          <PlayerInput
            players={team.players}
            onPlayerChange={onPlayerChange}
            index={3}
          />
          <PlayerInput
            players={team.players}
            onPlayerChange={onPlayerChange}
            index={4}
          />
        </div>

        <button onClick={onSubmit}>Submit</button>
      </div>

      {resTeam.name && (
        <div>
          {resTeam.name} created with players:
          {resTeam.players.map((p) => (
            <div>{p}</div>
          ))}
        </div>
      )}
    </>
  );
};

type PlayerInputProps = {
  index: number;
  onPlayerChange: (index: number, name: string) => void;
  players: string[];
};

const PlayerInput: React.FC<PlayerInputProps> = ({
  index,
  onPlayerChange,
  players,
}) => {
  return (
    <div className="py-2">
      <label>
        Player {index}
        <input
          className="dark:text-black"
          name={`player-${index}`}
          value={players[index]}
          onChange={(e) => onPlayerChange(index, e.target.value)}
        />
      </label>
    </div>
  );
};

export default CreateTeam;
