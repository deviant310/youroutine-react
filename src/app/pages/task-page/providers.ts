import { contextFactory } from "~/infrastructure/context";
// TODO необходимо реализовать возможность указывать разрешенные named imports в tsconfig
import { usePathParams } from "~/infrastructure/router";

import { Task } from "~/concern/general/entities";
import { taskRoute } from "~/concern/general/routes";

export const usePagePathParams = () => usePathParams<typeof taskRoute>();

export const { Provider: TaskProvider, useValue: useTask } =
  contextFactory<Task>();
