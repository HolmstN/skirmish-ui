import React from "react";
import { useFormatters } from "../../helpers/use-formatters";
import { Team } from "../../types/teams";
import Button from "../button";
import { Tournament } from "../../types/tournament";

type Props = {
  tournaments: Tournament[];
};
export const TournamentList: React.FC<Props> = ({ tournaments }) => {
  const { dformat } = useFormatters();
  const dates = (start: Date, end: Date) =>
    `${dformat(start)} - ${dformat(end)}`;
  return (
    <div>
      {tournaments.map((t) => (
        <div key={t.title} className="border p-2 w-1/4 bg-white">
          <div className="font-medium">{t.title}</div>
          <div>{dates(t.when.start, t.when.end)}</div>
          <div className="text-center">
            <Button className="w-1/2 mt-4">Join</Button>
          </div>
        </div>
      ))}
    </div>
  );
};
