import { memo } from "react";

//import { RequestUnauthorizedError } from "~/infrastructure/http";
import { Router } from "~/infrastructure/router";

//import { useCurrentUserRetrieving } from "~/concern/common/third-party";
import { projectsRoute, taskRoute, tasksRoute } from "~/concern/general/routes";

import { ProjectsPage, TaskPage, TasksPage } from "~/pages";

export const App = memo(() => (
  /* const { retrievingCurrentUser, retrievingCurrentUserError } =
    useCurrentUserRetrieving();

  if (retrievingCurrentUser) return "loading...";

  if (retrievingCurrentUserError instanceof RequestUnauthorizedError)
    return <AuthPage />;

  if (retrievingCurrentUserError instanceof Error)
    return retrievingCurrentUserError.message; */

  // TODO не интуитивно, нужно как-то засунуть это в provider
  //initHomeRoute(tasksRoute);

  <Router routes={routes} homeRoute={tasksRoute()} />
));

const routes = [
  [tasksRoute, TasksPage] as const,
  [taskRoute, TaskPage] as const,
  [projectsRoute, ProjectsPage] as const,
];
