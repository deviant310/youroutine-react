import { contextFactory } from "~/infrastructure/context";
// TODO необходимо реализовать возможность указывать разрешенные named imports в tsconfig
import { usePathParams as useRoutePathParams } from "~/infrastructure/router";

import { Task } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

export const usePathParams = () => useRoutePathParams<typeof taskRoute>();

export const { Provider: TaskProvider, useValue: useTask } =
  contextFactory<Task>();
