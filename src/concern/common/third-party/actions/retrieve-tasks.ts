import { performRequest } from "~/infrastructure/http";

import { buildTasksRetrieveRequest } from "../requests";

export const retrieveTasks = async () => {
  const tasksRetrieveRequest = buildTasksRetrieveRequest();

  const { data } = await performRequest(tasksRetrieveRequest);

  return data;
};
