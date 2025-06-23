import { useMemo } from "react";

import { useQueryAction } from "use-query-action";

import { retrieveAssignees } from "../actions";

export const useAssigneesRetrieving = (searchQuery?: string) => {
  const {
    data,
    isLoading: retrievingAssignees,
    error: retrievingAssigneesError,
  } = useQueryAction(retrieveAssignees, [], {
    keepFresh: true,
    enabled: typeof searchQuery !== "undefined",
  });

  const assignees = useMemo(() => {
    if (typeof searchQuery === "undefined") return data;

    return data?.filter(project =>
      project.name.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [data, searchQuery]);

  return {
    assignees,
    retrievingAssignees,
    retrievingAssigneesError,
  };
};
