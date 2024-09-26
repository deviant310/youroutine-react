import { createRequest, performRequest } from "~/infrastructure/http";

import { Task } from "~/concern/entities";

import { baseUrl } from "../base-url";

export const getTasks = async (): Promise<Task[]> => {
  const tasksRetrieveRequest = createRequest<TasksRetrieveResponseBody>({
    method: "GET",
    url: new URL(`/api/tasks`, baseUrl),
  });

  const { data } = await performRequest(tasksRetrieveRequest);

  return data.map(
    ({ id, title, description, approved }) =>
      new Task({
        id,
        title,
        description,
        approved,
      }),
  );
};

type TasksRetrieveResponseBody = Array<{
  id: number;
  title: string;
  description: string;
  approved: boolean;
}>;
