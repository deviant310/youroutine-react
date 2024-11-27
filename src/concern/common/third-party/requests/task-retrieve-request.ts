import { UUID } from "~/typescript";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTaskRetrieveRequest = (uuid: UUID) =>
  buildRequest<TaskRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/tasks/${uuid}`, baseUrl),
  });

export type TaskRetrieveResponseData = {
  id: UUID;
  title: string;
  description: string;
  status: "underway" | "completed" | "rejected" | null;
  priority: "low" | "medium" | "high";
};
