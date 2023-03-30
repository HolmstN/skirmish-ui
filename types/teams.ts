export type Role = "top" | "jg" | "mid" | "adc" | "sup";
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

export type Champion = { name: string; preference: number };

export type PlayerUi = {
  name: string;
  roles: {
    [role in Role]?: {
      champions: Champion[];
      preference: number;
    };
  };
  preferredRole: Role;
};
