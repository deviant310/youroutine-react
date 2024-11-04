import { performRequest } from "~/infrastructure/http";

import {
  Task,
  TaskCreateAttributes,
  TaskPriority,
  TaskStatus,
} from "~/concern/general/entities";

import { buildTaskCreateRequest, TaskCreateResponseData } from "../requests";

export const createTask = async (
  attributes: TaskCreateAttributes,
): Promise<Task> => {
  const taskCreateRequest = buildTaskCreateRequest({
    title: attributes.title,
    description: attributes.description,
    projectId: attributes.projectId,
    priority: attributes.priority.toString(),
  });

  const { data } = await performRequest(taskCreateRequest);

  return mapTaskCreateResponseData(data);
};

export const mapTaskCreateResponseData = (data: TaskCreateResponseData) =>
  new Task({
    id: data.id,
    title: data.title,
    description: data.description,
    projectId: data.projectId,
    status: new TaskStatus(data.status as TaskStatus["key"]),
    priority: new TaskPriority(data.priority as TaskPriority["key"]),
  });
