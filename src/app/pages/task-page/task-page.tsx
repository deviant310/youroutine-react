import { memo } from "react";

import { useDocumentTitle } from "~/react";

import { usePathParams } from "~/infrastructure/router";
import { Area } from "~/infrastructure/ui";

import { Header } from "~/concern/chunks";
import { useTaskRetrieving } from "~/concern/common/third-party";
import { taskRoute } from "~/concern/general/routes";

import { TaskConsumer } from "./task-consumer";
import { TaskProvider } from "./task-context";

export const TaskPage = memo(() => {
  const { id } = usePathParams<typeof taskRoute>();
  const { task, retrievingTask, retrievingTaskError } = useTaskRetrieving(id);

  useDocumentTitle(`Task ${id}`);

  return (
    <>
      <Header />

      <Area marginHorizontal="auto" maxWidth="1200px">
        {/* TODO Blocking rendering */}
        {!task && retrievingTask && "Loading task..."}

        {retrievingTaskError instanceof Error && retrievingTaskError.message}

        {task && (
          <TaskProvider task={task}>
            <TaskConsumer />
          </TaskProvider>
        )}
      </Area>
    </>
  );
});
