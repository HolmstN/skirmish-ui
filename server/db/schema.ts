/* tslint:disable */
/* eslint-disable */


/**
 * AUTO-GENERATED FILE - DO NOT EDIT!
 *
 * This file was automatically generated by pg-to-ts v.4.1.0
 * $ pg-to-ts generate -c postgresql://username:password@localhost:5432/skirmish -t accounts -t games -t schema_migrations -t sessions -t team_gamedata -t teams -t tournament_methods -t tournament_players -t tournament_teams -t tournaments -t user_gamedata -t users -t verification_tokens -s public
 *
 */


export type Json = unknown;

// Table accounts
export interface Accounts {
  id: number;
  user_id: string | null;
  type: string | null;
  provider: string | null;
  provider_account_id: string | null;
  refresh_token: string | null;
  access_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  scope: string | null;
  id_token: string | null;
  session_state: string | null;
}
export interface AccountsInput {
  id?: number;
  user_id?: string | null;
  type?: string | null;
  provider?: string | null;
  provider_account_id?: string | null;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
}
const accounts = {
  tableName: 'accounts',
  columns: ['id', 'user_id', 'type', 'provider', 'provider_account_id', 'refresh_token', 'access_token', 'expires_at', 'token_type', 'scope', 'id_token', 'session_state'],
  requiredForInsert: [],
  primaryKey: 'id',
  foreignKeys: { user_id: { table: 'users', column: 'id', $type: null as unknown as Users }, },
  $type: null as unknown as Accounts,
  $input: null as unknown as AccountsInput
} as const;

// Table games
export interface Games {
  id: number;
  name: string;
  short_name: string | null;
  data: Json | null;
}
export interface GamesInput {
  id?: number;
  name: string;
  short_name?: string | null;
  data?: Json | null;
}
const games = {
  tableName: 'games',
  columns: ['id', 'name', 'short_name', 'data'],
  requiredForInsert: ['name'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Games,
  $input: null as unknown as GamesInput
} as const;

// Table schema_migrations
export interface SchemaMigrations {
  version: number;
  dirty: boolean;
}
export interface SchemaMigrationsInput {
  version: number;
  dirty: boolean;
}
const schema_migrations = {
  tableName: 'schema_migrations',
  columns: ['version', 'dirty'],
  requiredForInsert: ['version', 'dirty'],
  primaryKey: 'version',
  foreignKeys: {},
  $type: null as unknown as SchemaMigrations,
  $input: null as unknown as SchemaMigrationsInput
} as const;

// Table sessions
export interface Sessions {
  id: number;
  expires: Date | null;
  session_token: string | null;
  user_id: string | null;
}
export interface SessionsInput {
  id?: number;
  expires?: Date | null;
  session_token?: string | null;
  user_id?: string | null;
}
const sessions = {
  tableName: 'sessions',
  columns: ['id', 'expires', 'session_token', 'user_id'],
  requiredForInsert: [],
  primaryKey: 'id',
  foreignKeys: { user_id: { table: 'users', column: 'id', $type: null as unknown as Users }, },
  $type: null as unknown as Sessions,
  $input: null as unknown as SessionsInput
} as const;

// Table team_gamedata
export interface TeamGamedata {
  team_id: string;
  game_id: number;
  gamedata: Json | null;
}
export interface TeamGamedataInput {
  team_id: string;
  game_id: number;
  gamedata?: Json | null;
}
const team_gamedata = {
  tableName: 'team_gamedata',
  columns: ['team_id', 'game_id', 'gamedata'],
  requiredForInsert: ['team_id', 'game_id'],
  primaryKey: null,
  foreignKeys: {
    team_id: { table: 'teams', column: 'id', $type: null as unknown as Teams },
    game_id: { table: 'games', column: 'id', $type: null as unknown as Games },
  },
  $type: null as unknown as TeamGamedata,
  $input: null as unknown as TeamGamedataInput
} as const;

// Table teams
export interface Teams {
  id: string;
  name: string;
  logo: string | null;
}
export interface TeamsInput {
  id?: string;
  name: string;
  logo?: string | null;
}
const teams = {
  tableName: 'teams',
  columns: ['id', 'name', 'logo'],
  requiredForInsert: ['name'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Teams,
  $input: null as unknown as TeamsInput
} as const;

// Table tournament_methods
export interface TournamentMethods {
  id: number;
  name: string | null;
  description: string | null;
}
export interface TournamentMethodsInput {
  id?: number;
  name?: string | null;
  description?: string | null;
}
const tournament_methods = {
  tableName: 'tournament_methods',
  columns: ['id', 'name', 'description'],
  requiredForInsert: [],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as TournamentMethods,
  $input: null as unknown as TournamentMethodsInput
} as const;

// Table tournament_players
export interface TournamentPlayers {
  player_id: string;
  tournament_id: number;
  team_id: string | null;
  gamedata: Json | null;
}
export interface TournamentPlayersInput {
  player_id: string;
  tournament_id: number;
  team_id?: string | null;
  gamedata?: Json | null;
}
const tournament_players = {
  tableName: 'tournament_players',
  columns: ['player_id', 'tournament_id', 'team_id', 'gamedata'],
  requiredForInsert: ['player_id', 'tournament_id'],
  primaryKey: null,
  foreignKeys: {
    player_id: { table: 'users', column: 'id', $type: null as unknown as Users },
    tournament_id: { table: 'tournaments', column: 'id', $type: null as unknown as Tournaments },
    team_id: { table: 'teams', column: 'id', $type: null as unknown as Teams },
  },
  $type: null as unknown as TournamentPlayers,
  $input: null as unknown as TournamentPlayersInput
} as const;

// Table tournament_teams
export interface TournamentTeams {
  team_id: string;
  tournament_id: number;
  is_ready: boolean;
  tier: number | null;
}
export interface TournamentTeamsInput {
  team_id: string;
  tournament_id: number;
  is_ready: boolean;
  tier?: number | null;
}
const tournament_teams = {
  tableName: 'tournament_teams',
  columns: ['team_id', 'tournament_id', 'is_ready', 'tier'],
  requiredForInsert: ['team_id', 'tournament_id', 'is_ready'],
  primaryKey: null,
  foreignKeys: {
    team_id: { table: 'teams', column: 'id', $type: null as unknown as Teams },
    tournament_id: { table: 'tournaments', column: 'id', $type: null as unknown as Tournaments },
  },
  $type: null as unknown as TournamentTeams,
  $input: null as unknown as TournamentTeamsInput
} as const;

// Table tournaments
export interface Tournaments {
  id: number;
  name: string | null;
  initial_name: string | null;
  description: string | null;
  start_date: Date | null;
  end_date: Date | null;
  method_id: number | null;
}
export interface TournamentsInput {
  id?: number;
  name?: string | null;
  initial_name?: string | null;
  description?: string | null;
  start_date?: Date | null;
  end_date?: Date | null;
  method_id?: number | null;
}
const tournaments = {
  tableName: 'tournaments',
  columns: ['id', 'name', 'initial_name', 'description', 'start_date', 'end_date', 'method_id'],
  requiredForInsert: [],
  primaryKey: 'id',
  foreignKeys: { method_id: { table: 'tournament_methods', column: 'id', $type: null as unknown as TournamentMethods }, },
  $type: null as unknown as Tournaments,
  $input: null as unknown as TournamentsInput
} as const;

// Table user_gamedata
export interface UserGamedata {
  user_id: string;
  gamedata: Json | null;
}
export interface UserGamedataInput {
  user_id: string;
  gamedata?: Json | null;
}
const user_gamedata = {
  tableName: 'user_gamedata',
  columns: ['user_id', 'gamedata'],
  requiredForInsert: ['user_id'],
  primaryKey: 'user_id',
  foreignKeys: { user_id: { table: 'users', column: 'id', $type: null as unknown as Users }, },
  $type: null as unknown as UserGamedata,
  $input: null as unknown as UserGamedataInput
} as const;

// Table users
export interface Users {
  id: string;
  name: string;
  email: string;
  email_verified: Date | null;
  image: string | null;
}
export interface UsersInput {
  id?: string;
  name: string;
  email: string;
  email_verified?: Date | null;
  image?: string | null;
}
const users = {
  tableName: 'users',
  columns: ['id', 'name', 'email', 'email_verified', 'image'],
  requiredForInsert: ['name', 'email'],
  primaryKey: 'id',
  foreignKeys: {},
  $type: null as unknown as Users,
  $input: null as unknown as UsersInput
} as const;

// Table verification_tokens
export interface VerificationTokens {
  identifier: string | null;
  token: string | null;
  expires: Date | null;
}
export interface VerificationTokensInput {
  identifier?: string | null;
  token?: string | null;
  expires?: Date | null;
}
const verification_tokens = {
  tableName: 'verification_tokens',
  columns: ['identifier', 'token', 'expires'],
  requiredForInsert: [],
  primaryKey: null,
  foreignKeys: {},
  $type: null as unknown as VerificationTokens,
  $input: null as unknown as VerificationTokensInput
} as const;


export interface TableTypes {
  accounts: {
    select: Accounts;
    input: AccountsInput;
  };
  games: {
    select: Games;
    input: GamesInput;
  };
  schema_migrations: {
    select: SchemaMigrations;
    input: SchemaMigrationsInput;
  };
  sessions: {
    select: Sessions;
    input: SessionsInput;
  };
  team_gamedata: {
    select: TeamGamedata;
    input: TeamGamedataInput;
  };
  teams: {
    select: Teams;
    input: TeamsInput;
  };
  tournament_methods: {
    select: TournamentMethods;
    input: TournamentMethodsInput;
  };
  tournament_players: {
    select: TournamentPlayers;
    input: TournamentPlayersInput;
  };
  tournament_teams: {
    select: TournamentTeams;
    input: TournamentTeamsInput;
  };
  tournaments: {
    select: Tournaments;
    input: TournamentsInput;
  };
  user_gamedata: {
    select: UserGamedata;
    input: UserGamedataInput;
  };
  users: {
    select: Users;
    input: UsersInput;
  };
  verification_tokens: {
    select: VerificationTokens;
    input: VerificationTokensInput;
  };
}

export const tables = {
  accounts,
  games,
  schema_migrations,
  sessions,
  team_gamedata,
  teams,
  tournament_methods,
  tournament_players,
  tournament_teams,
  tournaments,
  user_gamedata,
  users,
  verification_tokens,
}