export type Team = {
  id: string;
  name: string;
  owner: string;
  imageUrl?: string;
  openRoles: string[];
  players: string[] | PlayerUi[]; // emails
};

export type Role = string;
type PlayerRoles = {
  [role in Role]?: {
    champions: string[];
    preference: number;
  };
};

export type Player = {
  name: string;
  roles: PlayerRoles;
};

export type PlayerChampion = {
  championKey: string;
  preference: number;
};

export type Champion = {
  version: string;
  id: string;
  key: string;
  name: string;
  title: string;
  blurb: string;
  info: { attack: number; defense: number; magic: number; difficulty: number };
  image: {
    full: string;
    sprite: string;
    group: string;
    x: number;
    y: number;
    w: number;
    h: number;
  };
  tags: string[];
  partype: string;
  stats: {
    hp: number;
    hpperlevel: number;
    mp: number;
    mpperlevel: number;
    movespeed: number;
    armor: number;
    armorperlevel: number;
    spellblock: number;
    spellblockperlevel: number;
    attackrange: number;
    hpregen: number;
    hpregenperlevel: number;
    mpregen: number;
    mpregenperlevel: number;
    crit: number;
    critperlevel: number;
    attackdamage: number;
    attackdamageperlevel: number;
    attackspeedperlevel: number;
    attackspeed: number;
  };
};

export type PlayerUi = {
  name: string;
  email: string;
  roles?: {
    [role in Role]?: {
      champions: string[];
      preference: number;
    };
  };
  preferredRole?: Role;
};

export type Tag = {
  id: string;
  metadata: Record<string, any>;
};
