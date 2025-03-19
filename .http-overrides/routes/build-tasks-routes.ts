import { randomUUID, UUID } from "node:crypto";

import { Express } from "express";

import { projects, tasks } from "../data";

export function buildTasksRoutes(express: Express) {
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
    const projectExists = projects.some(
      ({ id }) => id === request.body.projectId,
    );

    if (!projectExists) {
      response.statusCode = 500;
      response.end("Project not found");

      return;
    }

    const task = {
      id: randomUUID(),
      title: request.body.title,
      description: request.body.description,
      projectId: request.body.projectId,
      priority: request.body.priority,
      status: null,
    };

    tasks.push(task);

    response.statusCode = 200;
    response.json(task);
  });

  express.patch<{ id: UUID }>("/api/tasks/:id", async (request, response) => {
    const task = tasks.find(({ id }) => id === request.params.id);

    if (!task) {
      response.statusCode = 400;
      response.statusMessage = "Task not found";
      response.end();

      return;
    }

    const updatedAttributes: Partial<(typeof tasks)[number]> = {};

    if ("title" in request.body) updatedAttributes.title = request.body.title;

    if ("description" in request.body)
      updatedAttributes.description = request.body.description;

    if ("priority" in request.body)
      updatedAttributes.priority = request.body.priority;

    Object.assign(task, updatedAttributes);

    response.statusCode = 200;
    response.json(updatedAttributes);
  });
}
