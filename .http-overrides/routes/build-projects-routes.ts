import { Express } from "express";

import { projects } from "../data";

export function buildProjectsRoutes(express: Express) {
  express.get("/api/projects", (_, response) => {
    response.statusCode = 200;
    response.json(projects);
  });
}
