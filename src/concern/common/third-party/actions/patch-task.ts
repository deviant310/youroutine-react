import { UUID } from "~/typescript";

import { performRequest } from "~/infrastructure/http";

import { Project, TaskAttributes } from "~/concern/general/entities";

import { buildTaskPatchRequest } from "../requests";

export async function patchTask(id: UUID, attributes: TaskPatchAttributes) {
  const taskCreateRequest = buildTaskPatchRequest(id, {
    title: attributes.title,
    description: attributes.description,
    projectId: attributes.projectId,
    priority: attributes.priority,
  });

  const { data } = await performRequest(taskCreateRequest);

  return data;
}

export interface TaskPatchAttributes
  extends Partial<Pick<TaskAttributes, "title" | "description" | "priority">> {
  projectId?: Project["id"];
}
