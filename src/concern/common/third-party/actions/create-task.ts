import { performRequest } from "~/infrastructure/http";

import {
  Project,
  Task,
  TaskCreateAttributes,
  TaskPriority,
  TaskStatus,
} from "~/concern/general/entities";

import { buildTaskCreateRequest, TaskCreateResponseData } from "../requests";

export const createTask = async (attributes: CreateAttributes) => {
  const taskCreateRequest = buildTaskCreateRequest({
    title: attributes.title,
    description: attributes.description,
    projectId: attributes.projectId,
    priority: attributes.priority.$payload,
  });

  const { data } = await performRequest(taskCreateRequest);

  return mapTaskCreateResponseData(data);
};

export const mapTaskCreateResponseData = ({
  id,
  title,
  description,
  project: projectAttributes,
  status,
  priority,
}: TaskCreateResponseData) =>
  new Task({
    id,
    title,
    description,
    status: status ? new TaskStatus(status as TaskStatus["$payload"]) : null,
    priority: new TaskPriority(priority as TaskPriority["$payload"]),
    project: new Project(projectAttributes),
  });

interface TaskCreateRelatedEntitiesAttributes {
  projectId: Project["id"];
}

type CreateAttributes = TaskCreateAttributes &
  TaskCreateRelatedEntitiesAttributes;
