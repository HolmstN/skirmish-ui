const divisonalStandings = [
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

export const PendingGames = () => {
  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse border border-indigo-500">
        <thead>
          <tr className="bg-indigo-700 font-medium text-indigo-100">
            <th className="border border-indigo-600 p-2 pl-4 pb-1 text-left">
              Team
            </th>
            <th className="border border-indigo-600 p-2 pl-4 pb-1 text-left">
              Played
            </th>
            <th className="border border-indigo-600 p-2 pl-4 pb-1 text-left">
              Expected
            </th>
          </tr>
        </thead>
        <tbody>
          {divisonalStandings.map((s) => (
            <tr key={s.team} className="text-sm bg-indigo-50 text-indigo-900">
              <td className="border border-indigo-400 p-2 pl-4">{s.team}</td>
              <td className="border border-indigo-400 p-2 pl-4">0</td>
              <td className="border border-indigo-400 p-2 pl-4">2</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
