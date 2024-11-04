import { Route } from "~/infrastructure/router";

export const tasksRoute = new Route("/tasks");
export const taskRoute = new Route("/tasks/:id");

export const projectsRoute = new Route("/projects");
