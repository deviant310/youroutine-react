import { Express } from "express";

import { projectsRoutes, tasksRoutes, userRoutes } from "./routes";
// TODO remove this redundant initialization, move to plugin
export default function (express: Express) {
  userRoutes(express);

  tasksRoutes(express);

  projectsRoutes(express);
}
