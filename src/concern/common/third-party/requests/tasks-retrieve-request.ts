import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTasksRetrieveRequest = () =>
  buildRequest<TasksRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/tasks`, baseUrl),
  });

export type TasksRetrieveResponseData = Array<{
  id: number;
  title: string;
  description: string;
  projectId: number;
  status: string | null;
  priority: string;
}>;
