import { UUID } from "~/typescript";

import { Route } from "~/infrastructure/router";

export const tasksRoute = Route("/tasks");
export const taskRoute = Route<{ taskId: UUID }>("/tasks/:taskId");

export const projectsRoute = Route("/projects");
