import { useQueryAction } from "use-query-action";

import { retrieveUser } from "../actions";

export const useUserRetrieving = () => {
  const {
    data: user,
    isLoading: retrievingUser,
    error: retrievingUserError,
  } = useQueryAction(retrieveUser, [], {
    keepData: "always",
    refetchOnMount: false,
  });

  return { user, retrievingUser, retrievingUserError };
};
