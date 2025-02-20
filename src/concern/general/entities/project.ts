import { UUID } from "~/typescript";

import { Entity } from "~/infrastructure/data";

export class Project extends Entity<ProjectAttributes> {
  static getInstanceId(project: Project) {
    return project.$payload.id;
  }

  static getInstanceName(project: Project) {
    return project.$payload.name;
  }

  get id() {
    return this.$payload.id;
  }

  get name() {
    return this.$payload.name;
  }

  set name(value: ProjectAttributes["name"]) {
    this.$payload.name = value;
  }

  get description() {
    return this.$payload.description;
  }

  set description(value: ProjectAttributes["description"]) {
    this.$payload.description = value;
  }

  toString() {
    return this.$payload.name;
  }
}

export interface ProjectAttributes {
  readonly id: UUID;
  name: string;
  description: string;
}

// TODO move to create action
export type ProjectCreateAttributes = Pick<
  ProjectAttributes,
  "name" | "description"
>;
