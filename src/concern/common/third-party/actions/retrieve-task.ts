import { UUID } from "~/typescript";

import { performRequest } from "~/infrastructure/http";

import { Task, TaskPriority, TaskStatus } from "~/concern/general/entities";

import {
  buildTaskRetrieveRequest,
  TaskRetrieveResponseData,
} from "../requests";

export const retrieveTask = async (uuid: UUID) => {
  const taskRetrieveRequest = buildTaskRetrieveRequest(uuid);

  const { data } = await performRequest(taskRetrieveRequest);

  return mapTaskRetrieveResponseData(data);
};

export const mapTaskRetrieveResponseData = ({
  id,
  title,
  description,
  status,
  priority,
}: TaskRetrieveResponseData) =>
  new Task({
    id,
    title,
    description,
    status: status ? new TaskStatus(status) : null,
    priority: new TaskPriority(priority),
  });
