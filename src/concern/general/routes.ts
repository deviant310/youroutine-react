import { UUID } from "~/typescript";

import { Route } from "~/infrastructure/router";

export const tasksRoute = new Route("/tasks");
export const taskRoute = new Route<{ taskId: UUID }>("/tasks/:taskId");

export const projectsRoute = new Route("/projects");
