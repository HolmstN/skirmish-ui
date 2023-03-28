export type Role = "top" | "jg" | "mid" | "adc" | "sup";
type PlayerRoles = {
  [role in Role]: {
    champions: string[];
    preference: number;
  };
};

export type Player = {
  name: string;
  roles: Partial<PlayerRoles>;
};
