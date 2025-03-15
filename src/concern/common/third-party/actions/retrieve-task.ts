import { UUID } from "~/typescript";

import { performRequest } from "~/infrastructure/http";

import { buildTaskRetrieveRequest } from "../requests";

export const retrieveTask = async (id: UUID) => {
  const taskRetrieveRequest = buildTaskRetrieveRequest(id);

  const { data } = await performRequest(taskRetrieveRequest);

  return data;
};
