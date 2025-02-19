import { useQueryAction } from "use-query-action";

import { retrieveTasks } from "../actions";
import { tasksRetrieveResponseDataToTasks } from "../adapters";

export const useTasksRetrieving = () => {
  const {
    data: tasks,
    isLoading: retrievingTasks,
    error: retrievingTasksError,
  } = useQueryAction(retrieveTasks, [], {
    select: tasksRetrieveResponseDataToTasks,
  });

  return { tasks, retrievingTasks, retrievingTasksError };
};
