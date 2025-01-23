import { randomUUID } from "crypto";

export const tasks = [
  {
    id: randomUUID(),
    title: "First task",
    description: "Very simple task",
    //projectId: projectsRetrieveResponseData[0].id,
    status: null,
    priority: "medium",
  },
  {
    id: randomUUID(),
    title: "Task with long description",
    description:
      "<p>Task with very long description. We wrote here as much text as we can. Also this description contains some specific points. There are below:</p><ol><li><p>This text is about first point.</p></li><li><p>This text is about second point. And some more text about second point.</p></li><li><p>This text is about third point.</p></li></ol><p>Final text. Task description end.</p>",
    //projectId: projectsRetrieveResponseData[1].id,
    status: "underway",
    priority: "high",
  },
];
