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
  projectId: number;
  priority: string;
};

export type TaskCreateResponseData = {
  id: number;
  title: string;
  description: string;
  projectId: number;
  status: string;
  priority: string;
};
