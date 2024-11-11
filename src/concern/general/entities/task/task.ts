import { OmitMethods, UUID } from "~/typescript";

import { TaskPriority, TaskStatus } from "./properties";

export class Task {
  readonly id: UUID;
  title: string;
  description: string;
  projectId: UUID;
  readonly status: TaskStatus | null;
  priority: TaskPriority;

  static getInstanceId(task: Task) {
    return task.id;
  }

  static getInstanceTitle(task: Task) {
    return task.title;
  }

  constructor(attributes: OmitMethods<Task>) {
    this.id = attributes.id;
    this.title = attributes.title;
    this.description = attributes.description;
    this.projectId = attributes.projectId;
    this.status = attributes.status;
    this.priority = attributes.priority;
  }
}

export type TaskCreateAttributes = Pick<
  Task,
  "title" | "description" | "projectId" | "priority"
>;
