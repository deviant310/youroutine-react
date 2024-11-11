import { UUID } from "~/typescript";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTaskCreateRequest = (data: TaskCreateRequestData) =>
  buildRequest<TaskCreateResponseData>({
    method: "POST",
    url: new URL(`/api/tasks`, baseUrl),
    data,
  });

export type TaskCreateRequestData = {
  title: string;
  description: string;
  projectId: UUID;
  priority: "low" | "medium" | "high";
};

export type TaskCreateResponseData = {
  id: UUID;
  title: string;
  description: string;
  projectId: UUID;
  status: "underway" | "completed" | "rejected" | null;
  priority: "low" | "medium" | "high";
};
