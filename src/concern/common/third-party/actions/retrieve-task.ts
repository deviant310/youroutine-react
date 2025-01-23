import { UUID } from "~/typescript";

import { performRequest } from "~/infrastructure/http";

import { buildTaskRetrieveRequest } from "../requests";

export const retrieveTask = async (uuid: UUID) => {
  const taskRetrieveRequest = buildTaskRetrieveRequest(uuid);

  const { data } = await performRequest(taskRetrieveRequest);

  return data;
};
