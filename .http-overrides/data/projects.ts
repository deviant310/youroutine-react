import { randomUUID } from "crypto";

export const projects = [
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
  {
    id: randomUUID(),
    name: "React inputs",
    description: "Headless inputs for react projects",
  },
];
