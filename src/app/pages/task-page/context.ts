import { createContext } from "~/infrastructure/context";
import { usePathParams as useRoutePathParams } from "~/infrastructure/router/route-hooks";

import { Task } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

// Page route hooks
export const usePathParams = () => useRoutePathParams<typeof taskRoute>();

// Page contexts
export const { TaskProvider, useTask } = createContext<Task, "task">("task");
