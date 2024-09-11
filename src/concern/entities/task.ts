import { Entity } from "infrastructure/entity";

export class Task extends Entity<TaskAttributes> {
  static getInstanceId(task: Task) {
    return task.id;
  }

  static getInstanceTitle(task: Task) {
    return task.title;
  }

  get id() {
    return this.attributes.id;
  }

  get title() {
    return this.attributes.title;
  }

  get description() {
    return this.attributes.description;
  }

  get approved() {
    return this.attributes.approved;
  }
}

export type TaskAttributes = {
  id: number;
  title: string;
  description: string;
  approved: boolean;
};
