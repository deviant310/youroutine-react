import { randomUUID } from "node:crypto";

import { TasksRetrieveResponseData } from "../../src/concern/common/third-party/requests";

import { projectsRetrieveResponseData } from "./projects";

export const tasksRetrieveResponseData: TasksRetrieveResponseData = [
  {
    id: randomUUID(),
    title: "First task",
    description: "Very simple task",
    projectId: projectsRetrieveResponseData[0].id,
    status: null,
    priority: "medium",
  },
  {
    id: randomUUID(),
    title: "Second task",
    description: "Another simple task",
    projectId: projectsRetrieveResponseData[1].id,
    status: "underway",
    priority: "high",
  },
];
