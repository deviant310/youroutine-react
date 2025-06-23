import { buildRequest } from "~/infrastructure/http";

import { baseUrl } from "../base-url";

export const buildUserRetrieveRequest = () =>
  buildRequest<UserRetrieveResponseData>({
    method: "GET",
    url: new URL(`/api/user`, baseUrl),
  });

export type UserRetrieveResponseData = {
  userId: string;
  userName: string;
};
