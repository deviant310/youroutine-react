import { createRoute } from "~/infrastructure/router";

export const tasksRoute = createRoute("/tasks");
export const taskRoute = createRoute("/tasks/:id");
