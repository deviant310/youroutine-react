import { useCallback } from "react";

import { useQueryAction } from "use-query-action";

import { retrieveProjects as retrieveProjectsAction } from "../actions";

export const useProjectsRetrieving = () => {
  const {
    data: projects,
    isLoading: retrievingProjects,
    error: retrievingProjectsError,
  } = useQueryAction(retrieveProjectsAction, [], {
    keepFresh: true,
  });

  const getProjectsFilteredByNameEntry = useCallback(
    (nameEntry: string) =>
      projects?.filter(project =>
        project.name.toLowerCase().includes(nameEntry.toLowerCase()),
      ) ?? [],
    [projects],
  );

  return {
    projects,
    getProjectsFilteredByNameEntry,
    retrievingProjects,
    retrievingProjectsError,
  };
};
