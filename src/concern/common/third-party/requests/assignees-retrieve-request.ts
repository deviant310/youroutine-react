import { UUID } from "~/typescript";

import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildAssigneesRetrieveRequest = () =>
  buildRequest<AssigneesRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/assignees`, baseUrl),
  });

export type AssigneesRetrieveResponseData = Array<{
  id: UUID;
  name: string;
}>;
