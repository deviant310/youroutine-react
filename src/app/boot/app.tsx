import { memo, useEffect, useState } from "react";

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

  <Router routes={routes} homeRoute={tasksRoute()} />
));

const routes = [
  [tasksRoute, TasksPage] as const,
  [taskRoute, TaskPage] as const,
  [projectsRoute, ProjectsPage] as const,
];

export default function App1() {
  const state = useState<string>();

  useEffect(() => {
    setTimeout(() => state[1]("Anton"), 0);
  }, [state]);

  return (
    <div className="App">
      <h1>Hello {state[0]}</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
