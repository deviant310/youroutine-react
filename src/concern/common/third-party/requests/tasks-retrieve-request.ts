import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTasksRetrieveRequest = () =>
  buildRequest<TasksRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/tasks`, baseUrl),
  });

export type TasksRetrieveResponseData = Array<{
  id: string;
  title: string;
  description: string;
  status: "underway" | "completed" | "rejected" | null;
  priority: "low" | "medium" | "high";
}>;
