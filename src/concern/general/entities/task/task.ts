import { Entity } from "~/infrastructure/entity";

import { TaskPriority, TaskStatus } from "./properties";

export class Task<
  Attributes extends TaskAttributes = TaskAttributes,
> extends Entity<Attributes> {
  static getInstanceId(task: Task) {
    return task.$payload.id;
  }

  static getInstanceTitle(task: Task) {
    return task.$payload.title;
  }

  get id() {
    return this.$payload.id;
  }

  get title() {
    return this.$payload.title;
  }

  set title(value: TaskAttributes["title"]) {
    this.$payload.title = value;
  }

  get description() {
    return this.$payload.description;
  }

  set description(value: TaskAttributes["description"]) {
    this.$payload.title = value;
  }

  get status() {
    return this.$payload.status;
  }

  get priority() {
    return this.$payload.priority;
  }

  set priority(value: TaskAttributes["priority"]) {
    this.$payload.priority = value;
  }

  toString() {
    return this.$payload.title;
  }
}

export interface TaskAttributes {
  readonly id: string;
  title: string;
  description: string;
  readonly status: TaskStatus | null;
  priority: TaskPriority;
}
