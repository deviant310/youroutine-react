import { useQueryAction } from "use-query-action";

import { retrieveProjects as retrieveProjectsAction } from "../actions";

export const useProjectsRetrieving = () => {
  const {
    data: projects,
    isLoading: retrievingProjects,
    error: retrievingProjectsError,
  } = useQueryAction(retrieveProjectsAction, [], { refetchOnMount: false });

  return { projects, retrievingProjects, retrievingProjectsError };
};
