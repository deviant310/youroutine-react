import { memo } from "react";

import { RequestUnauthorizedError } from "~/infrastructure/http";
import { initHomeRoute, RouterProvider } from "~/infrastructure/router";

import { useUserRetrieving } from "~/concern/common/third-party";
import { projectsRoute, taskRoute, tasksRoute } from "~/concern/general/routes";

import { AuthPage, ProjectsPage, TaskPage, TasksPage } from "~/pages";

export const Router = memo(() => {
  const { retrievingUser, retrievingUserError } = useUserRetrieving();

  if (retrievingUser) return "loading...";

  if (retrievingUserError instanceof RequestUnauthorizedError)
    return <AuthPage />;

  if (retrievingUserError instanceof Error) return retrievingUserError.message;

  initHomeRoute(tasksRoute);

  return <RouterProvider routesEntries={routesEntries} />;
});

const routesEntries = [
  [tasksRoute, TasksPage] as const,
  [taskRoute, TaskPage] as const,
  [projectsRoute, ProjectsPage] as const,
];
