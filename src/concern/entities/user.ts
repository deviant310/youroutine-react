import { Entity } from "infrastructure/entity";

export class User extends Entity<UserAttributes> {
  static getInstanceId(user: User) {
    return user.id;
  }

  static getInstanceName(user: User) {
    return user.name;
  }

  get id() {
    return this.attributes.id;
  }

  get name() {
    return this.attributes.name;
  }
}

export type UserAttributes = {
  id: number;
  name: string;
};
