import { createRequest, performRequest } from "~/infrastructure/http";

import { User } from "~/concern/entities";

import { baseUrl } from "../base-url";

/**
 * @throws RequestError
 */
export const getUser = async () => {
  const authorizeRequest = createRequest<GetUserResponseBody>({
    method: "GET",
    url: new URL(`/api/user`, baseUrl),
  });

  const { data } = await performRequest(authorizeRequest);

  return new User({
    id: data.userId,
    name: data.userName,
  });
};

type GetUserResponseBody = {
  userId: number;
  userName: string;
};
