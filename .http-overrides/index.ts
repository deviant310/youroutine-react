import { randomUUID } from "node:crypto";

import { Express } from "express";

import {
  TaskCreateRequestData,
  TaskCreateResponseData,
} from "../src/concern/common/third-party/requests";

import {
  projectsRetrieveResponseData,
  tasksRetrieveResponseData,
} from "./responses";

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
    response.json(tasksRetrieveResponseData);
  });

  express.post("/api/tasks", (request, response) => {
    const task: TaskCreateResponseData = {
      ...(request.body as TaskCreateRequestData),
      id: randomUUID(),
      status: null,
    };

    tasksRetrieveResponseData.push(task);

    response.statusCode = 200;
    response.json(task);
  });

  /**
   * Projects overrides
   */
  express.get("/api/projects", (_, response) => {
    response.statusCode = 200;
    response.json(projectsRetrieveResponseData);
  });
}
