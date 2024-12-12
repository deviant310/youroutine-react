import { memo } from "react";

import { RequestUnauthorizedError } from "~/infrastructure/http";
import { initHomeRoute, Router } from "~/infrastructure/router";

import { useUserRetrieving } from "~/concern/common/third-party";
import { projectsRoute, taskRoute, tasksRoute } from "~/concern/general/routes";

import { AuthPage, ProjectsPage, TaskPage, TasksPage } from "~/pages";

export const App = memo(() => {
  const { retrievingUser, retrievingUserError } = useUserRetrieving();

  if (retrievingUser) return "loading...";

  if (retrievingUserError instanceof RequestUnauthorizedError)
    return <AuthPage />;

  if (retrievingUserError instanceof Error) return retrievingUserError.message;

  // TODO не интуитивно, нужно как-то засунуть это в provider
  initHomeRoute(tasksRoute);

  return <Router routes={routes} />;
});

const routes = [
  [tasksRoute, TasksPage] as const,
  [taskRoute, TaskPage] as const,
  [projectsRoute, ProjectsPage] as const,
];
