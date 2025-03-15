import { useQueryAction } from "use-query-action";

import { patchTask as patchTaskAction, retrieveTask } from "../actions";

export const useTaskPatching = () => {
  const { setData } = useQueryAction(retrieveTask);

  const {
    perform: patchTask,
    isLoading: patchingTask,
    error: patchingTaskError,
  } = useQueryAction(patchTaskAction, {
    onSuccess(patchedData, id) {
      setData(data => ({ ...data, ...patchedData }), id);
    },
  });

  return { patchTask, patchingTask, patchingTaskError };
};
