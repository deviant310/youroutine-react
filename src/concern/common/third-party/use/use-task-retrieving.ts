import { useQueryAction } from "use-query-action";

import { UUID } from "~/typescript";

import { retrieveTask } from "../actions";

export const useTaskRetrieving = (uuid: UUID | undefined) => {
  const {
    data: task,
    isLoading: retrievingTask,
    error: retrievingTaskError,
  } = useQueryAction(retrieveTask, [uuid]);

  return { task, retrievingTask, retrievingTaskError };
};
