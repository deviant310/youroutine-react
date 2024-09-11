import { useQueryAction } from "use-query-action";

import { getUser } from "../actions";

export const useCurrentUser = () => {
  const {
    data: currentUser,
    isLoading: loadingCurrentUser,
    error: loadingCurrentUserError,
  } = useQueryAction(getUser, [], {
    keepData: true,
    refetchOnMount: false,
  });

  return { currentUser, loadingCurrentUser, loadingCurrentUserError };
};
