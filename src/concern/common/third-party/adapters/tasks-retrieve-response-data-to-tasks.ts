import { Task, TaskPriority, TaskStatus } from "~/concern/general/entities";

import { TasksRetrieveResponseData } from "../requests";

export function tasksRetrieveResponseDataToTasks(
  data: TasksRetrieveResponseData,
) {
  // TODO подумать как маппить без "as"
  return data.map(
    ({ id, title, description, status, priority }) =>
      new Task({
        id,
        title,
        description,
        status: status as TaskStatus | null,
        priority: priority as TaskPriority,
      }),
  );
}
