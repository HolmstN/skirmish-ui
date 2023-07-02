import React from "react";
import { useFormatters } from "../../helpers/use-formatters";
import { Team } from "../../types/teams";
import Button from "../button";
import { TournamentList } from "./tournament-list";
import { TeamTournament, Tournament } from "../../types/tournament";

type Props = {
  team: Team;
  tournaments: Tournament[];
};
export const TournamentWithTeam: React.FC<Props> = ({ team, tournaments }) => {
  if (!team.tournament) {
    return (
      <div>
        <div className="pb-4">
          <div className="font-extrabold text-xl pb-4">Your Schedule</div>
          <div>You're not signed up yet - find a tournament below.</div>
        </div>
        <div>
          <div className="font-extrabold text-xl pb-4">
            Upcoming Tournaments
          </div>
          <TournamentList tournaments={tournaments} />
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="pb-4">
        {/* @ts-expect-error typescript doesnt understand that we're checking team.tournament above */}
        <YourSchedule team={team} />
      </div>
      <div>
        <div className="font-extrabold text-xl pb-4">Upcoming Tournaments</div>
        <TournamentList tournaments={tournaments} />
      </div>
    </div>
  );
};

type YourScheduleProps = {
  team: Team & { tournament: TeamTournament };
};

const YourSchedule: React.FC<YourScheduleProps> = ({ team }) => {
  const { dformat } = useFormatters();
  const dates = (start: Date, end: Date) =>
    `${dformat(new Date(start))} - ${dformat(new Date(end))}`;

  const { tournament } = team;

  const { when, division } = tournament;
  const standings = division.standings[team.name];
  return (
    <div className="flex items-center flex-col">
      <div className="text-sm">Current Tournament</div>
      <div className="text-2xl font-bold">{tournament.title}</div>
      <div className="py-2">{dates(when.start, when.end)}</div>
      <div className="drop-shadow">
        <div className="flex">
          <div className="bg-green-900 border-r border-amber-600 flex flex-col items-center py-2 px-4">
            <div className="text-3xl font-medium text-amber-100">
              {standings.wins.length}
            </div>
            <div className="text-xs font-medium text-amber-300">WON</div>
          </div>
          <div className="bg-red-900 border-l border-amber-600 flex flex-col items-center py-2 px-4">
            <div className="text-3xl font-medium text-amber-100">
              {standings.losses.length}
            </div>
            <div className="text-xs font-medium text-amber-300">LOST</div>
          </div>
        </div>
      </div>

      <div>Remaining Opponents</div>
      <div>
        {team.tournament.division.remainingOpponents.map((o) => (
          <div key={o}>{o}</div>
        ))}
      </div>
    </div>
  );
};
