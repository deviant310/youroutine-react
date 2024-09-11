import { memo } from "react";

import { RequestUnauthorizedError } from "~/infrastructure/http";
import { RouterProvider } from "~/infrastructure/router";

import { taskRoute, tasksRoute } from "~/concern/common/routes";
import { useCurrentUser } from "~/concern/common/third-party";

import { AuthPage, TaskPage, TasksPage } from "~/pages";

export const Router = memo(() => {
  const { loadingCurrentUser, loadingCurrentUserError } = useCurrentUser();

  if (loadingCurrentUser) return "loading...";

  if (loadingCurrentUserError instanceof RequestUnauthorizedError)
    return <AuthPage />;

  if (loadingCurrentUserError instanceof Error)
    return loadingCurrentUserError.message;

  return <RouterProvider routesEntries={routesEntries} />;
});

const routesEntries = [
  [tasksRoute, TasksPage] as const,
  [taskRoute, TaskPage] as const,
];
