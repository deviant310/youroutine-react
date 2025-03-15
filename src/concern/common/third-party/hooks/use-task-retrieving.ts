import { useQueryAction } from "use-query-action";

import { UUID } from "~/typescript";

import { retrieveTask } from "../actions";
import { taskRetrieveResponseDataToTask } from "../adapters";

export const useTaskRetrieving = (id: UUID | undefined) => {
  const {
    data: task,
    isLoading: retrievingTask,
    error: retrievingTaskError,
  } = useQueryAction(retrieveTask, [id], {
    select: taskRetrieveResponseDataToTask,
  });

  return { task, retrievingTask, retrievingTaskError };
};
