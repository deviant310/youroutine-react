import { useQueryAction } from "use-query-action";

import { retrieveCurrentUser } from "../actions";

export const useCurrentUserRetrieving = () => {
  const {
    data: currentUser,
    isLoading: retrievingCurrentUser,
    error: retrievingCurrentUserError,
  } = useQueryAction(retrieveCurrentUser, [], {
    keepFresh: true,
  });

  return { currentUser, retrievingCurrentUser, retrievingCurrentUserError };
};
