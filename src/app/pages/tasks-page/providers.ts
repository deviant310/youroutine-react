import { usePathParams as useRoutePathParams } from "~/infrastructure/router";

import { tasksRoute } from "~/concern/general/routes";

export const usePathParams = () => useRoutePathParams<typeof tasksRoute>();
