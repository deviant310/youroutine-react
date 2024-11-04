import { performRequest } from "~/infrastructure/http";

import { User } from "~/concern/general/entities";

import {
  buildUserRetrieveRequest,
  UserRetrieveResponseData,
} from "../requests";

export const retrieveUser = async (): Promise<User> => {
  const userRetrieveRequest = buildUserRetrieveRequest();

  const { data } = await performRequest(userRetrieveRequest);

  return mapUserRetrieveResponseData(data);
};

export const mapUserRetrieveResponseData = (data: UserRetrieveResponseData) =>
  new User({
    id: data.userId,
    name: data.userName,
  });
