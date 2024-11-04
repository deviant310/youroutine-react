import { OmitMethods } from "~/typescript";

export class Project {
  id: number;
  name: string;
  description: string;

  static getInstanceId(project: Project) {
    return project.id;
  }

  static getInstanceName(project: Project) {
    return project.name;
  }

  constructor(attributes: OmitMethods<Project>) {
    this.id = attributes.id;
    this.name = attributes.name;
    this.description = attributes.description;
  }
}
