import { Task, TaskPriority, TaskStatus } from "~/concern/general/entities";

import { TaskRetrieveResponseData } from "../requests";

export function taskRetrieveResponseDataToTask({
  id,
  title,
  description,
  status,
  priority,
}: TaskRetrieveResponseData) {
  return new Task({
    id,
    title,
    description,
    status: status ? new TaskStatus(status) : null,
    priority: new TaskPriority(priority),
  });
}
