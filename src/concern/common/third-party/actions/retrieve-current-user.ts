import { UUID } from "~/typescript";

import { performRequest } from "~/infrastructure/http";

import { User } from "~/concern/general/entities";

import {
  buildUserRetrieveRequest,
  UserRetrieveResponseData,
} from "../requests";

export const retrieveCurrentUser = async (): Promise<User> => {
  const userRetrieveRequest = buildUserRetrieveRequest();

  const { data } = await performRequest(userRetrieveRequest);

  return mapUserRetrieveResponseData(data);
};

export const mapUserRetrieveResponseData = ({
  userId,
  userName,
}: UserRetrieveResponseData) =>
  new User({
    id: userId as UUID,
    name: userName,
  });
