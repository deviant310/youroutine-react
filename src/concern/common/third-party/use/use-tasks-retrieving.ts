import { useQueryAction } from "use-query-action";

import { retrieveTasks } from "../actions";

export const useTasksRetrieving = () => {
  const {
    data: tasks,
    isLoading: retrievingTasks,
    error: retrievingTasksError,
  } = useQueryAction(retrieveTasks, []);

  return { tasks, retrievingTasks, retrievingTasksError };
};
