import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTaskRetrieveRequest = (id: string) =>
  buildRequest<TaskRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/tasks/${id}`, baseUrl),
  });

export type TaskRetrieveResponseData = {
  id: string;
  title: string;
  description: string;
  status: "underway" | "completed" | "rejected" | null;
  priority: "low" | "medium" | "high";
};
