import { Express } from "express";

export function userRoutes(express: Express) {
  express.get("/api/user", (_, response) => {
    response.statusCode = 200;
    response.json({ hello: "world" });
  });
}
