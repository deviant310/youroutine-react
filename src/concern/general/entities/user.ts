import { OmitMethods } from "~/typescript";

export class User {
  id: number;
  name: string;

  static getInstanceId(user: User) {
    return user.id;
  }

  static getInstanceName(user: User) {
    return user.name;
  }

  constructor(attributes: OmitMethods<User>) {
    this.id = attributes.id;
    this.name = attributes.name;
  }
}
