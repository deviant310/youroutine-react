import { Express } from "express";

import {
  assigneesRoutes,
  projectsRoutes,
  tasksRoutes,
  userRoutes,
} from "./routes";
// TODO remove this redundant initialization, move to plugin
export default function (express: Express) {
  userRoutes(express);

  tasksRoutes(express);

  projectsRoutes(express);

  assigneesRoutes(express);
}
