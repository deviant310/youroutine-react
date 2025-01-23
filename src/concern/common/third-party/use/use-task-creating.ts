import { useQueryAction } from "use-query-action";

import {
  createTask as createTaskAction,
  retrieveTasks as retrieveTasksAction,
} from "../actions";

export const useTaskCreating = () => {
  const { invalidate: invalidateTasks } = useQueryAction(retrieveTasksAction);

  const {
    perform: createTask,
    isLoading: creatingTask,
    error: creatingTaskError,
    isSuccess: taskCreated,
  } = useQueryAction(createTaskAction, {
    onSuccess() {
      invalidateTasks();
    },
  });

  return { createTask, creatingTask, creatingTaskError, taskCreated };
};
