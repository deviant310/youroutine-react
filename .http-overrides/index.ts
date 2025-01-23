import { Express } from "express";

import {
  buildProjectsRoutes,
  buildTasksRoutes,
  buildUserRoutes,
} from "./routes";

export default function (express: Express) {
  buildUserRoutes(express);

  buildTasksRoutes(express);

  buildProjectsRoutes(express);
}
