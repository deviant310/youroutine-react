import { useQueryAction } from "use-query-action";

import { UUID } from "~/typescript";

import { retrieveTask } from "../actions";
import { taskRetrieveResponseDataToTask } from "../adapters";

export const useTaskRetrieving = (uuid: UUID | undefined) => {
  const {
    data: task,
    isLoading: retrievingTask,
    error: retrievingTaskError,
  } = useQueryAction(retrieveTask, [uuid], {
    select: taskRetrieveResponseDataToTask,
  });

  return { task, retrievingTask, retrievingTaskError };
};
