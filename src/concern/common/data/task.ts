import { DTO } from "~/infrastructure/data";

import { TaskPriority, TaskStatus } from "~/concern/general/entities";

export const taskStatuses = new DTO<TaskStatus, string>({
  underway: "In progress",
  completed: "Completed",
  rejected: "Rejected",
});

export const taskPriorities = new DTO<TaskPriority, string>({
  low: "Low",
  medium: "Medium",
  high: "High",
});
