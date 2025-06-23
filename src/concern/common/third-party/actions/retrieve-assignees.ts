import { performRequest } from "~/infrastructure/http";

import { Assignee } from "~/concern/general/entities";

import {
  buildAssigneesRetrieveRequest,
  AssigneesRetrieveResponseData,
} from "../requests";

export const retrieveAssignees = async (): Promise<Assignee[]> => {
  const assigneesRetrieveRequest = buildAssigneesRetrieveRequest();

  const { data } = await performRequest(assigneesRetrieveRequest);

  return mapAssigneesRetrieveResponseData(data);
};

export const mapAssigneesRetrieveResponseData = (
  data: AssigneesRetrieveResponseData,
) => data.map(({ id, name }) => new Assignee({ id, name }));
