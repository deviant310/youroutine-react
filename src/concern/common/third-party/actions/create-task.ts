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

export const mapTaskCreateResponseData = ({
  id,
  title,
  description,
  projectId,
  status,
  priority,
}: TaskCreateResponseData) =>
  new Task({
    id,
    title,
    description,
    projectId,
    status: status ? new TaskStatus(status) : null,
    priority: new TaskPriority(priority),
  });
