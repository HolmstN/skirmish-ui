import classNames from "classnames";

const divisonalStandings = [
  {
    team: "Team Demacia",
    points: 6,
    wins: 3,
    losses: 2,
    isUserTeam: true,
  },
  {
    team: "Team Zaun",
    points: 4,
    wins: 2,
    losses: 2,
  },
  {
    team: "Team Freljord",
    points: 3,
    wins: 1,
    losses: 2,
  },
  {
    team: "Team Noxus",
    points: 2,
    wins: 0,
    losses: 5,
  },
];

export const Standings = () => {
  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse border border-indigo-500">
        <thead>
          <tr className="bg-indigo-700 font-medium text-indigo-100">
            <th className="border border-indigo-600 p-2 pl-4 pb-1 text-left">
              Team
            </th>
            <th className="border border-indigo-600 p-2 pl-4 pb-1 text-left">
              Points
            </th>
            <th className="border border-indigo-600 p-2 pl-4 pb-1 text-left">
              Record
            </th>
          </tr>
        </thead>
        <tbody>
          {divisonalStandings.map((s) => (
            <tr
              key={s.team}
              className={classNames("text-sm text-indigo-900", {
                "font-bold bg-indigo-200": !!s.isUserTeam,
                "bg-indigo-50": !s.isUserTeam,
              })}
            >
              <td className="border border-indigo-400 p-2 pl-4">{s.team}</td>
              <td className="border border-indigo-400 p-2 pl-4">{s.points}</td>
              <td className="border border-indigo-400 p-2 pl-4">
                {s.wins} - {s.losses}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
