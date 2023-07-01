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
        <div className="font-extrabold text-xl pb-4">Your Schedule</div>

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
    <div>
      <div>{tournament.title}</div>
      <div>{dates(when.start, when.end)}</div>
      <div>
        <div>Your Team: {team.name}</div>
        <div>
          Wins: {standings.wins.length} / Losses: {standings.losses.length}
        </div>
      </div>
    </div>
  );
};
