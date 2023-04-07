export type Mutator = { key: string; value: any };

export type Mutate<K extends { [k: string]: string }> = K & {
  mutators: Mutator[];
};
