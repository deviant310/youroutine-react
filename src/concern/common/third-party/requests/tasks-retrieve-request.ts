import { UUID } from "~/typescript";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTasksRetrieveRequest = () =>
  buildRequest<TasksRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/tasks`, baseUrl),
  });

export type TasksRetrieveResponseData = Array<{
  id: UUID;
  title: string;
  description: string;
  status: string | null;
  priority: string;
}>;
