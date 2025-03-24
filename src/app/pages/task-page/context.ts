import { contextFactory } from "~/infrastructure/context";
// TODO необходимо реализовать возможность указывать разрешенные named imports в tsconfig
import { usePathParams as useRoutePathParams } from "~/infrastructure/router/route-hooks";

import { Task } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

// Page route hooks
export const usePathParams = () => useRoutePathParams<typeof taskRoute>();

// Page contexts
export const { Provider: TaskProvider, useValue: useTask } =
  contextFactory<Task>();
