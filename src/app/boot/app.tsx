import { memo } from "react";

import { RequestUnauthorizedError } from "~/infrastructure/http";
import { initHomeRoute, Router } from "~/infrastructure/router";

import { useCurrentUserRetrieving } from "~/concern/common/third-party";
import { projectsRoute, taskRoute, tasksRoute } from "~/concern/general/routes";

import { AuthPage, ProjectsPage, TaskPage, TasksPage } from "~/pages";

export const App = memo(() => {
  /* const { retrievingCurrentUser, retrievingCurrentUserError } =
    useCurrentUserRetrieving();

  if (retrievingCurrentUser) return "loading...";

  if (retrievingCurrentUserError instanceof RequestUnauthorizedError)
    return <AuthPage />;

  if (retrievingCurrentUserError instanceof Error)
    return retrievingCurrentUserError.message; */

  // TODO не интуитивно, нужно как-то засунуть это в provider
  initHomeRoute(tasksRoute);

  return <Router routes={routes} />;
});

const routes = [
  [tasksRoute, TasksPage] as const,
  [taskRoute, TaskPage] as const,
  [projectsRoute, ProjectsPage] as const,
];
