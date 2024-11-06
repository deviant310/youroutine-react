import { performRequest } from "~/infrastructure/http";

import { Task, TaskPriority, TaskStatus } from "~/concern/general/entities";

import {
  buildTasksRetrieveRequest,
  TasksRetrieveResponseData,
} from "../requests";

export const retrieveTasks = async (): Promise<Task[]> => {
  const tasksRetrieveRequest = buildTasksRetrieveRequest();

  const { data } = await performRequest(tasksRetrieveRequest);

  return mapTasksRetrieveResponseData(data);
};

export const mapTasksRetrieveResponseData = (data: TasksRetrieveResponseData) =>
  data.map(
    ({ id, title, description, projectId, status, priority }) =>
      new Task({
        id,
        title,
        description,
        projectId,
        status: status ? new TaskStatus(status) : null,
        priority: new TaskPriority(priority),
      }),
  );
