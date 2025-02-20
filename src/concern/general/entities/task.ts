import { Entity } from "~/infrastructure/data";

//import { TaskPriority, TaskStatus } from "./properties";

export class Task extends Entity<TaskAttributes> {
  static getInstanceId(task: Task) {
    return task.id;
  }

  static getInstanceTitle(task: Task) {
    return task.title;
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

export type TaskStatus = "underway" | "completed" | "rejected";

export type TaskPriority = "low" | "medium" | "high";
