import classNames from "classnames";

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
  const classes = {
    th: "border border-sky-600 dark:border-slate-600 p-2 pl-4 pb-1 text-left",
    td: "border border-sky-400 dark:border-slate-500 p-2 pl-4",
  };

  return (
    <div className="w-full">
      <table className="w-full table-auto border-collapse border border-sky-500 dark:border-slate-500">
        <thead>
          <tr className="bg-sky-700 dark:bg-gradient-to-r dark:from-indigo-900 dark:to-sky-900 font-medium text-sky-100 dark:text-slate-200">
            <th className={classes.th}>Team</th>
            <th className={classes.th}>Played</th>
            <th className={classes.th}>Expected</th>
          </tr>
        </thead>
        <tbody>
          {divisonalStandings.map((s) => (
            <tr
              key={s.team}
              className={classNames("text-sm text-sky-900 dark:text-slate-200")}
            >
              <td className={classes.td}>{s.team}</td>
              <td className={classes.td}>0</td>
              <td className={classes.td}>2</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
