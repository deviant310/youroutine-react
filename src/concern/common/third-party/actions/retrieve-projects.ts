import { performRequest } from "~/infrastructure/http";

import { Project } from "~/concern/general/entities";

import {
  buildProjectsRetrieveRequest,
  ProjectsRetrieveResponseData,
} from "../requests";

export const retrieveProjects = async (): Promise<Project[]> => {
  const projectsRetrieveRequest = buildProjectsRetrieveRequest();

  const { data } = await performRequest(projectsRetrieveRequest);

  return mapProjectsRetrieveResponseData(data);
};

export const mapProjectsRetrieveResponseData = (
  data: ProjectsRetrieveResponseData,
) =>
  data.map(
    ({ id, name, description }) =>
      new Project({
        id,
        name,
        description,
      }),
  );
