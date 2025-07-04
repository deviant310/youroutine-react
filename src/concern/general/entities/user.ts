import { UUID } from "~/typescript";

import { Entity } from "~/infrastructure/data";

export class User extends Entity<UserAttributes> {
  static getInstanceId(user: User) {
    return user.$payload.id;
  }

  static getInstanceName(user: User) {
    return user.$payload.name;
  }

  get id() {
    return this.$payload.id;
  }

  get name() {
    return this.$payload.name;
  }

  toString() {
    return this.$payload.name;
  }
}

export interface UserAttributes {
  readonly id: UUID;
  name: string;
}
