import { useQueryAction } from "use-query-action";

import { getTasks } from "../actions";

export const useTasks = () => {
  const {
    data: tasks,
    isLoading: loadingTasks,
    error: loadingTasksError,
  } = useQueryAction(getTasks, []);

  return { tasks, loadingTasks, loadingTasksError };
};
