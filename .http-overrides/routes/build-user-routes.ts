import { Express } from "express";

export function buildUserRoutes(express: Express) {
  express.get("/api/user", (_, response) => {
    response.statusCode = 200;
    response.json({ hello: "world" });
  });
}
