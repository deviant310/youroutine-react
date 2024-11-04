import { useQueryAction } from "use-query-action";

import { createTask as createTaskAction } from "../actions";

export const useTaskCreating = () => {
  const {
    data: task,
    perform: createTask,
    isLoading: creatingTask,
    error: creatingTaskError,
  } = useQueryAction(createTaskAction);

  return { task, createTask, creatingTask, creatingTaskError };
};
