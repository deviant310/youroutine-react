import { Task } from "~/concern/general/entities";

import { TasksRetrieveResponseData } from "../requests";

export function tasksRetrieveResponseDataToTasks(
  data: TasksRetrieveResponseData,
) {
  return data.map(
    ({ id, title, description, status, priority }) =>
      new Task({
        id,
        title,
        description,
        status,
        priority,
      }),
  );
}
