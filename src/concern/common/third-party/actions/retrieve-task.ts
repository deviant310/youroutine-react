import { performRequest } from "~/infrastructure/http";

import { buildTaskRetrieveRequest } from "../requests";

export const retrieveTask = async (id: string) => {
  const taskRetrieveRequest = buildTaskRetrieveRequest(id);

  const { data } = await performRequest(taskRetrieveRequest);

  return data;
};
