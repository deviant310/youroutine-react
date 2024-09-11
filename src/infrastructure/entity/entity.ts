export type EntityAttribute = string | number | boolean | null;

export type EntityAttributes = Record<string, EntityAttribute>;

export interface EntityConstructor {
  new <Attributes extends EntityAttributes>(): Entity<Attributes>;
}

export abstract class Entity<Attributes extends EntityAttributes> {
  constructor(protected attributes: Attributes) {}
}
