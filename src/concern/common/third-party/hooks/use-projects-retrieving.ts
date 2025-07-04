import { useMemo } from "react";

import { useQueryAction } from "use-query-action";

import { retrieveProjects as retrieveProjectsAction } from "../actions";

export const useProjectsRetrieving = (searchQuery?: string) => {
  const {
    data,
    isLoading: retrievingProjects,
    error: retrievingProjectsError,
  } = useQueryAction(retrieveProjectsAction, [], {
    keepFresh: true,
    enabled: typeof searchQuery !== "undefined",
  });

  const projects = useMemo(() => {
    if (typeof searchQuery === "undefined") return data;

    return data?.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  return {
    projects,
    retrievingProjects,
    retrievingProjectsError,
  };
};
