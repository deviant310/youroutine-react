import { performRequest } from "~/infrastructure/http";

import { Project, TaskAttributes } from "~/concern/general/entities";

import { buildTaskCreateRequest } from "../requests";

export async function createTask(attributes: TaskCreateAttributes) {
  const taskCreateRequest = buildTaskCreateRequest({
    title: attributes.title,
    description: attributes.description,
    projectId: attributes.projectId,
    priority: attributes.priority,
  });

  const { data } = await performRequest(taskCreateRequest);

  return data;
}

export interface TaskCreateAttributes {
  title: TaskAttributes["title"];
  description: TaskAttributes["description"];
  priority: TaskAttributes["priority"];
  projectId: Project["id"];
}
