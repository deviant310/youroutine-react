import { UUID } from "~/typescript";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTaskRetrieveRequest = (id: UUID) =>
  buildRequest<TaskRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/tasks/${id}`, baseUrl),
  });

export type TaskRetrieveResponseData = {
  id: UUID;
  title: string;
  description: string;
  status: string | null;
  priority: string;
};
