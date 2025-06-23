import { UUID } from "~/typescript";

import { Entity } from "~/infrastructure/data";

export class Assignee extends Entity<AssigneeAttributes> {
  static getInstanceId(assignee: Assignee) {
    return assignee.$payload.id;
  }

  static getInstanceName(assignee: Assignee) {
    return assignee.$payload.name;
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

export interface AssigneeAttributes {
  readonly id: UUID;
  name: string;
}
