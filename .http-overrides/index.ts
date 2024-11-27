import { randomUUID } from "node:crypto";

import { Express } from "express";

import { projects, tasks } from "./responses";

export default function (express: Express) {
  /**
   * User overrides
   */
  express.get("/api/user", (_, response) => {
    response.statusCode = 200;
    response.json({ hello: "world" });
  });

  /**
   * Tasks overrides
   */
  express.get("/api/tasks", (_, response) => {
    response.statusCode = 200;
    response.json(tasks);
  });

  express.get("/api/tasks/:id", (request, response) => {
    const task = tasks.find(({ id }) => id === request.params.id);

    if (!task) {
      response.statusCode = 400;
      response.statusMessage = "Task not found";
      response.end();

      return;
    }

    response.statusCode = 200;
    response.json(task);
  });

  express.post("/api/tasks", (request, response) => {
    const project = projects.find(({ id }) => id === request.body.projectId);

    if (!project) {
      response.statusCode = 500;
      response.end("Project not found");

      return;
    }

    const task = {
      id: randomUUID(),
      title: request.body.title,
      description: request.body.description,
      project,
      priority: request.body.priority,
      status: null,
    };

    tasks.push(task);

    response.statusCode = 200;
    response.json(task);
  });

  /**
   * Projects overrides
   */
  express.get("/api/projects", (_, response) => {
    response.statusCode = 200;
    response.json(projects);
  });
}
