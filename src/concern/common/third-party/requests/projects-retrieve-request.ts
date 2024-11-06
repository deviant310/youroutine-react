import { UUID } from "node:crypto";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildProjectsRetrieveRequest = () =>
  buildRequest<ProjectsRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/projects`, baseUrl),
  });

export type ProjectsRetrieveResponseData = Array<{
  id: UUID;
  name: string;
  description: string;
}>;
