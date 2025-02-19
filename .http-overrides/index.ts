import { Express } from "express";

import {
  buildProjectsRoutes,
  buildTasksRoutes,
  buildUserRoutes,
} from "./routes";
// TODO remove this redundant initialization, move to plugin
export default function (express: Express) {
  buildUserRoutes(express);

  buildTasksRoutes(express);

  buildProjectsRoutes(express);
}
