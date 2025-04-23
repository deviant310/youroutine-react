import { useMemo } from "react";

import { useQueryAction } from "use-query-action";

import { retrieveProjects as retrieveProjectsAction } from "../actions";

export const useProjectsRetrieving = (searchValue?: string) => {
  const {
    data,
    isLoading: retrievingProjects,
    error: retrievingProjectsError,
  } = useQueryAction(retrieveProjectsAction, [], {
    keepFresh: true,
  });

  const projects = useMemo(() => {
    if (typeof searchValue === "undefined") return [];

    return data?.filter(project =>
      project.name.toLowerCase().includes(searchValue.toLowerCase()),
    );
  }, [data, searchValue]);

  return {
    projects,
    retrievingProjects,
    retrievingProjectsError,
  };
};
