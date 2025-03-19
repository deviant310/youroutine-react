import { useRef } from "react";

import { useQueryAction } from "use-query-action";

import { patchTask as patchTaskAction, retrieveTask } from "../actions";

export const useTaskPatching = () => {
  const lastStartedAt = useRef<number>(null);

  const { setData } = useQueryAction(retrieveTask);

  const {
    perform: patchTask,
    isLoading: patchingTask,
    error: patchingTaskError,
  } = useQueryAction(patchTaskAction, {
    onMutate() {
      const startedAt = Date.now();
      lastStartedAt.current = startedAt;
      return startedAt;
    },
    onSuccess(patchedData, [id], startedAt) {
      if (lastStartedAt.current === startedAt) {
        console.log(patchedData);
        setData(data => ({ ...data, ...patchedData }), id);
      }
    },
  });

  return { patchTask, patchingTask, patchingTaskError };
};
