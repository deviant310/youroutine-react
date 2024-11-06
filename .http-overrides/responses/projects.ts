import { randomUUID } from "node:crypto";

import { ProjectsRetrieveResponseData } from "../../src/concern/common/third-party/requests";

export const projectsRetrieveResponseData: ProjectsRetrieveResponseData = [
  {
    id: randomUUID(),
    name: "YouRoutine",
    description: "Current project tasks",
  },
  {
    id: randomUUID(),
    name: "Home",
    description: "Home routine, daily tasks",
  },
];
