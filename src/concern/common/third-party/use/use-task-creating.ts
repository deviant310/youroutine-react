import { useQueryAction } from "use-query-action";

import {
  createTask as createTaskAction,
  retrieveTasks as retrieveTasksAction,
} from "../actions";

export const useTaskCreating = () => {
  const { invalidate: invalidateTasks } = useQueryAction(retrieveTasksAction);

  const {
    data: task,
    perform: createTask,
    isLoading: creatingTask,
    error: creatingTaskError,
  } = useQueryAction(createTaskAction, {
    onSuccess() {
      invalidateTasks();
    },
  });

  return { task, createTask, creatingTask, creatingTaskError };
};
