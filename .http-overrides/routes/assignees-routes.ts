import { Express } from "express";

import { assignees } from "../data";

export function assigneesRoutes(express: Express) {
  express.get("/api/assignees", (_, response) => {
    response.statusCode = 200;
    response.json(assignees);
  });
}
