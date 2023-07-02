export type Tournament = {
  title: string;
  when: { start: Date; end: Date };
  divisions: Bracket[];
};

export type Bracket = {
  tier: number;
  standings: {
    [team: string]: {
      wins: string[]; //teams won against
      losses: string[]; //teams lost against
    };
  };
};

export type TeamTournament = {
  title: string;
  when: { start: Date; end: Date };
  division: Bracket & {
    remainingOpponents: string[];
  };
};
