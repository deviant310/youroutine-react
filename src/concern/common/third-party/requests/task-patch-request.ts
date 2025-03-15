import { UUID } from "~/typescript";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildTaskPatchRequest = (id: UUID, data: TaskPatchRequestData) =>
  buildRequest<TaskPatchResponseData>({
    method: "PATCH",
    url: new URL(`/api/tasks/${id}`, baseUrl),
    data,
  });

export interface TaskPatchRequestData {
  title?: string;
  description?: string;
  projectId?: UUID;
  priority?: string;
}

export interface TaskPatchResponseData {
  id?: UUID;
  title?: string;
  description?: string;
  projectId?: UUID;
  status?: string | null;
  priority?: string;
}
